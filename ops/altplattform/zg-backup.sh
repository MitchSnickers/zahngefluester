#!/bin/sh
# ---------------------------------------------------------------------------
# Zahngefluester - taegliche Datenbanksicherung beider WordPress-Installationen
#
# Laeuft AUF dem Strato-Webspace, per Cron.
# POSIX sh, keine Bashismen - die Shell auf Strato ist nicht garantiert bash.
#
# Grundsatz: Diese Sicherung soll sich selbst beweisen. Ein Dump, der zu klein
# ist, abgeschnitten wurde oder nicht entpackbar ist, ist schlimmer als kein
# Dump - er sieht wie Abdeckung aus. Deshalb prueft das Skript jede Sicherung
# und legt ein Manifest mit Zeilenzahlen daneben, gegen das die Restore-Probe
# spaeter vergleichen kann.
#
# Es wird NICHTS geloescht ausser eigenen, aelteren Sicherungen dieses Skripts.
# Es wird NICHTS in die Datenbanken geschrieben.
# ---------------------------------------------------------------------------

set -eu

# --- Konfiguration ---------------------------------------------------------

# Basisverzeichnis fuer Sicherungen. MUSS ausserhalb von htdocs liegen.
# Wird in Stufe 0 des Runbooks nachgewiesen, nicht angenommen.
BACKUP_BASE="${HOME}/backups"

# WordPress-Installationen: Kuerzel|Pfad|Tabellenpraefix
INSTALLS="
wp01|${HOME}/htdocs/STRATO-apps/wordpress_01/app|i0qf_
wp02|${HOME}/htdocs/STRATO-apps/wordpress_02/app|vemy_
"

# Wie viele Staende auf dem Webspace bleiben. Der Webspace ist die Zwischen-
# ablage, nicht das Archiv - die lange Vorhaltung passiert off-site.
KEEP_LOCAL=3

# Absolute Untergrenze je Dump in Bytes. Ein Dump unter dieser Groesse gilt als
# fehlgeschlagen. Nach dem ersten erfolgreichen Lauf auf ca. 50 % der realen
# Groesse setzen - siehe Runbook Stufe 1.
MIN_BYTES=200000

# Off-Site-Ziel. Leer lassen, solange Stufe 2 nicht eingerichtet ist.
# Beispiel: OFFSITE_TARGET="u586184-zg@u586184.your-storagebox.de:/zahngefluester"
OFFSITE_TARGET=""
OFFSITE_PORT="23"
OFFSITE_KEY="${HOME}/.ssh/zg_offsite_ed25519"

# Uptime-Kuma-Push-URL. Wird NUR bei vollstaendigem Erfolg aufgerufen.
# Bleibt der Ping aus, schlaegt Kuma nach Ablauf des Intervalls Alarm - das ist
# der eigentliche Zweck. Ein Backup, das niemand beobachtet, faellt genauso
# lautlos aus wie das UpdraftPlus-Backup seit September 2025.
KUMA_PUSH_URL=""

# Pfad zu WP-CLI. Auf diesem Account systemweit vorhanden.
WP_BIN="/bin/wp"

# --- Ab hier nichts mehr konfigurieren -------------------------------------

STAMP="$(date +%Y-%m-%d_%H%M)"
LOG="${BACKUP_BASE}/backup.log"
TMPDIR="${BACKUP_BASE}/.tmp"
FAILED=0

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $*" >> "$LOG"
    echo "$*"
}

die() {
    log "ABBRUCH: $*"
    exit 1
}

mkdir -p "$BACKUP_BASE" "$TMPDIR"
chmod 700 "$BACKUP_BASE"

log "=== Lauf ${STAMP} gestartet ==="

[ -x "$WP_BIN" ] || die "WP-CLI nicht gefunden unter ${WP_BIN}"

# --- Sicherheitsnetz: liegt das Backupverzeichnis wirklich ausserhalb? ------
# Ein Dump von wordpress_02 enthaelt Bestellungen, Anschriften und Passwort-
# Hashes. Landet er im ausgelieferten Bereich, ist das kein Backup, sondern eine
# Datenpanne.
#
# KORREKTUR 01.09.2026: Die erste Fassung brach ab, sobald der Pfad "htdocs"
# enthielt. Auf diesem Account ist das SSH-Startverzeichnis SELBST htdocs -
# damit haette die Pruefung jeden zulaessigen Pfad abgelehnt und das Skript
# waere nie gelaufen. Ausgeliefert wird nicht htdocs, sondern der App-Ordner
# der jeweiligen Installation. Genau darauf wird jetzt geprueft.
#
# Diese Pruefung ersetzt NICHT den Browsertest aus Stufe 0 des Runbooks. Sie
# kennt nur die Pfade, die sie kennt; erreichbar ist, was der Webserver
# ausliefert. Der Beweis bleibt der Abruf ueber HTTP.
for _docroot in $(echo "$INSTALLS" | while IFS='|' read -r _ p _; do [ -n "$p" ] && echo "$p"; done); do
    case "$BACKUP_BASE/" in
        "$_docroot"/*) die "BACKUP_BASE liegt im ausgelieferten Bereich ($_docroot). Abbruch." ;;
    esac
done

# --- Je Installation sichern -----------------------------------------------

echo "$INSTALLS" | while IFS='|' read -r NAME WPPATH PREFIX; do
    [ -n "${NAME:-}" ] || continue

    log "--- ${NAME} ---"
    [ -d "$WPPATH" ] || { log "FEHLER ${NAME}: Pfad fehlt: ${WPPATH}"; echo x > "${TMPDIR}/failed"; continue; }

    DEST_DIR="${BACKUP_BASE}/${NAME}"
    mkdir -p "$DEST_DIR"
    chmod 700 "$DEST_DIR"

    RAW="${TMPDIR}/${NAME}-${STAMP}.sql"
    GZ="${TMPDIR}/${NAME}-${STAMP}.sql.gz"
    MAN="${TMPDIR}/${NAME}-${STAMP}.manifest.txt"

    # 1) Manifest ZUERST. Die Zeilenzahlen stammen aus der laufenden Datenbank
    #    und sind der Massstab, gegen den die Restore-Probe spaeter prueft.
    #    Ohne vorher notierte Sollwerte ist eine Restore-Pruefung nur eine
    #    Erzaehlung.
    {
        echo "# Manifest ${NAME} ${STAMP}"
        echo "# Zeilenzahlen aus der Live-Datenbank zum Zeitpunkt des Dumps."
        for T in users usermeta posts postmeta options comments; do
            CNT="$("$WP_BIN" --path="$WPPATH" db query \
                   "SELECT COUNT(*) FROM ${PREFIX}${T}" --skip-column-names 2>/dev/null || echo "n/a")"
            echo "${PREFIX}${T}=${CNT}"
        done
        # WooCommerce und Tutor: nur wenn vorhanden, sonst n/a
        for T in woocommerce_order_items tutor_quiz_attempts; do
            CNT="$("$WP_BIN" --path="$WPPATH" db query \
                   "SELECT COUNT(*) FROM ${PREFIX}${T}" --skip-column-names 2>/dev/null || echo "n/a")"
            echo "${PREFIX}${T}=${CNT}"
        done
    } > "$MAN" 2>/dev/null || { log "FEHLER ${NAME}: Manifest fehlgeschlagen"; echo x > "${TMPDIR}/failed"; continue; }

    # 2) Dump. Nicht direkt in die Pipe: bei set -e ohne pipefail wuerde ein
    #    fehlgeschlagener mysqldump durch ein erfolgreiches gzip verdeckt.
    if ! "$WP_BIN" --path="$WPPATH" db export "$RAW" --add-drop-table >/dev/null 2>>"$LOG"; then
        log "FEHLER ${NAME}: db export fehlgeschlagen"
        rm -f "$RAW"; echo x > "${TMPDIR}/failed"; continue
    fi

    # 3) Harte Pruefung: ist der Dump vollstaendig?
    #    mysqldump schreibt diese Zeile als letztes. Fehlt sie, wurde der Dump
    #    abgebrochen - typisch bei Speicher- oder Timeout-Problemen auf Shared
    #    Hosting, und genau der Fall, der unbemerkt bleibt.
    if ! tail -c 2000 "$RAW" | grep -q "Dump completed"; then
        log "FEHLER ${NAME}: Dump unvollstaendig, Endmarkierung fehlt"
        rm -f "$RAW"; echo x > "${TMPDIR}/failed"; continue
    fi

    gzip -9 -c "$RAW" > "$GZ"
    rm -f "$RAW"

    if ! gzip -t "$GZ" 2>/dev/null; then
        log "FEHLER ${NAME}: Archiv nicht lesbar"
        rm -f "$GZ"; echo x > "${TMPDIR}/failed"; continue
    fi

    SIZE="$(wc -c < "$GZ" | tr -d ' ')"
    if [ "$SIZE" -lt "$MIN_BYTES" ]; then
        log "FEHLER ${NAME}: Dump zu klein (${SIZE} Bytes, Untergrenze ${MIN_BYTES})"
        rm -f "$GZ"; echo x > "${TMPDIR}/failed"; continue
    fi

    # 4) Weiche Pruefung: deutlicher Schrumpf gegenueber dem letzten Stand.
    #    Weich, weil eine kleinere Datenbank auch eine echte Aenderung sein kann
    #    - etwa nach dem Leeren von Transients. Wird protokolliert, bricht aber
    #    nicht ab.
    PREV="$(ls -1t "${DEST_DIR}"/*.sql.gz 2>/dev/null | head -1 || true)"
    if [ -n "$PREV" ]; then
        PSIZE="$(wc -c < "$PREV" | tr -d ' ')"
        if [ "$PSIZE" -gt 0 ] && [ "$((SIZE * 100 / PSIZE))" -lt 80 ]; then
            log "WARNUNG ${NAME}: Dump ist ${SIZE} B, letzter war ${PSIZE} B - unter 80 Prozent. Bitte ansehen."
        fi
    fi

    mv "$GZ" "${DEST_DIR}/${NAME}-${STAMP}.sql.gz"
    mv "$MAN" "${DEST_DIR}/${NAME}-${STAMP}.manifest.txt"
    chmod 600 "${DEST_DIR}/${NAME}-${STAMP}.sql.gz" "${DEST_DIR}/${NAME}-${STAMP}.manifest.txt"
    ( cd "$DEST_DIR" && sha256sum "${NAME}-${STAMP}.sql.gz" > "${NAME}-${STAMP}.sha256" 2>/dev/null || true )

    log "OK ${NAME}: ${SIZE} Bytes"

    # 5) Rotation - ausschliesslich eigene Dateien dieses Skripts.
    ls -1t "${DEST_DIR}"/*.sql.gz 2>/dev/null | tail -n +$((KEEP_LOCAL + 1)) | while read -r OLD; do
        BASE="${OLD%.sql.gz}"
        rm -f "$OLD" "${BASE}.manifest.txt" "${BASE}.sha256"
        log "rotiert: $(basename "$OLD")"
    done
done

[ -f "${TMPDIR}/failed" ] && { rm -f "${TMPDIR}/failed"; FAILED=1; }

# --- Off-Site --------------------------------------------------------------

if [ -n "$OFFSITE_TARGET" ] && [ "$FAILED" -eq 0 ]; then
    if command -v rsync >/dev/null 2>&1; then
        if rsync -az --delete-after \
                 -e "ssh -p ${OFFSITE_PORT} -i ${OFFSITE_KEY} -o BatchMode=yes -o StrictHostKeyChecking=accept-new" \
                 "${BACKUP_BASE}/wp01" "${BACKUP_BASE}/wp02" \
                 "${OFFSITE_TARGET}/" >>"$LOG" 2>&1; then
            log "OK off-site (rsync)"
        else
            log "FEHLER off-site (rsync)"; FAILED=1
        fi
    else
        # Fallback ohne rsync. scp ist auf diesem Account defekt, sftp im
        # Batch-Modus ist der verlaessliche Weg.
        if ls "${BACKUP_BASE}"/wp0*/*"${STAMP}"* >/dev/null 2>&1; then
            for F in "${BACKUP_BASE}"/wp0*/*"${STAMP}"*; do
                echo "put ${F}"
            done > "${TMPDIR}/sftp.batch"
            if sftp -P "$OFFSITE_PORT" -i "$OFFSITE_KEY" -o BatchMode=yes \
                    -b "${TMPDIR}/sftp.batch" "$OFFSITE_TARGET" >>"$LOG" 2>&1; then
                log "OK off-site (sftp)"
            else
                log "FEHLER off-site (sftp)"; FAILED=1
            fi
            rm -f "${TMPDIR}/sftp.batch"
        fi
    fi
else
    [ -z "$OFFSITE_TARGET" ] && log "off-site nicht konfiguriert - Stufe 2 offen"
fi

# --- Alarmierung -----------------------------------------------------------

if [ "$FAILED" -eq 0 ] && [ -n "$KUMA_PUSH_URL" ]; then
    curl -fsS --max-time 20 "$KUMA_PUSH_URL" >/dev/null 2>&1 || log "WARNUNG: Kuma-Ping nicht zugestellt"
fi

# Log begrenzen, sonst waechst es still bis zum Quota.
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt 2000 ]; then
    tail -1000 "$LOG" > "${LOG}.tmp" && mv "${LOG}.tmp" "$LOG"
fi

log "=== Lauf ${STAMP} beendet, Status ${FAILED} ==="
exit "$FAILED"
