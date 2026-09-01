#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Zahngefluester - Restore-Probe
#
# Laeuft LOKAL auf deinem Rechner, nicht auf Strato. Braucht Docker.
#
# Zweck: beweisen, dass ein Dump tatsaechlich zurueckspielbar ist und
# vollstaendig ankommt. Solange das nicht einmal passiert ist, ist "wir haben
# ein Backup" eine Vermutung, keine Aussage.
#
# Die Probe laeuft gegen einen isolierten Container ohne veroeffentlichten
# Port. Sie fasst weder die Live-Datenbank noch den Webspace an.
#
# Aufruf:
#   ./zg-restore-probe.sh wp02-2026-08-28_0300.sql.gz
#
# Erwartet die zugehoerige Manifest-Datei im selben Verzeichnis:
#   wp02-2026-08-28_0300.manifest.txt
# ---------------------------------------------------------------------------

set -euo pipefail

DUMP="${1:?Aufruf: $0 <pfad-zum-dump.sql.gz>}"
MANIFEST="${DUMP%.sql.gz}.manifest.txt"
SHAFILE="${DUMP%.sql.gz}.sha256"

CONTAINER="zg-restore-probe-$$"
MYSQL_IMAGE="mysql:8.0"
DB="probe"
ROOT_PW="probe-nur-lokal-$$"

cleanup() { docker rm -f "$CONTAINER" >/dev/null 2>&1 || true; }
trap cleanup EXIT

fail() { echo "FEHLGESCHLAGEN: $*" >&2; exit 1; }

echo "== Restore-Probe: $(basename "$DUMP") =="

# --- 1. Vorpruefungen ohne Datenbank ---------------------------------------

[ -f "$DUMP" ] || fail "Dump nicht gefunden: $DUMP"
[ -f "$MANIFEST" ] || fail "Manifest fehlt: $MANIFEST — ohne Sollwerte ist die Probe wertlos"

if [ -f "$SHAFILE" ]; then
    ( cd "$(dirname "$DUMP")" && sha256sum -c "$(basename "$SHAFILE")" ) \
        || fail "Pruefsumme stimmt nicht — der Dump ist beim Transfer beschaedigt worden"
    echo "  Pruefsumme  OK"
else
    echo "  Pruefsumme  uebersprungen (keine .sha256 vorhanden)"
fi

gzip -t "$DUMP" || fail "Archiv nicht lesbar"
echo "  Archiv      OK"

zcat "$DUMP" | tail -c 2000 | grep -q "Dump completed" \
    || fail "Endmarkierung fehlt — der Dump ist abgeschnitten"
echo "  Endmarke    OK"

# --- 2. Isolierten Container starten ---------------------------------------

echo "  Starte isolierten MySQL-Container ..."
docker run -d --name "$CONTAINER" \
    --network none \
    -e MYSQL_ROOT_PASSWORD="$ROOT_PW" \
    -e MYSQL_DATABASE="$DB" \
    "$MYSQL_IMAGE" >/dev/null

# --network none nimmt dem Container jede Netzverbindung. Ein Restore-Test
# soll nichts erreichen koennen, auch nicht versehentlich die Live-Datenbank.

printf "  Warte auf Datenbank "
for _ in $(seq 1 60); do
    if docker exec "$CONTAINER" mysqladmin ping -uroot -p"$ROOT_PW" --silent >/dev/null 2>&1; then
        echo " bereit"; break
    fi
    printf "."; sleep 2
done
docker exec "$CONTAINER" mysqladmin ping -uroot -p"$ROOT_PW" --silent >/dev/null 2>&1 \
    || fail "Container wurde nicht bereit"

# --- 3. Einspielen ---------------------------------------------------------

echo "  Spiele Dump ein ..."
START=$(date +%s)
zcat "$DUMP" | docker exec -i "$CONTAINER" mysql -uroot -p"$ROOT_PW" "$DB" \
    || fail "Import abgebrochen"
DAUER=$(( $(date +%s) - START ))
echo "  Import      OK (${DAUER}s)"

# --- 4. Harte Pruefung gegen das Manifest ----------------------------------

echo
printf "  %-38s %10s %10s  %s\n" "Tabelle" "Soll" "Ist" "Ergebnis"
printf "  %s\n" "----------------------------------------------------------------------"

ABWEICHUNGEN=0
GEPRUEFT=0

while IFS='=' read -r TABELLE SOLL; do
    case "$TABELLE" in \#*|"") continue ;; esac
    [ "$SOLL" = "n/a" ] && continue

    IST="$(docker exec "$CONTAINER" mysql -uroot -p"$ROOT_PW" -N -B "$DB" \
           -e "SELECT COUNT(*) FROM \`${TABELLE}\`" 2>/dev/null || echo "FEHLT")"

    GEPRUEFT=$((GEPRUEFT + 1))
    if [ "$IST" = "$SOLL" ]; then
        printf "  %-38s %10s %10s  %s\n" "$TABELLE" "$SOLL" "$IST" "ok"
    else
        printf "  %-38s %10s %10s  %s\n" "$TABELLE" "$SOLL" "$IST" "ABWEICHUNG"
        ABWEICHUNGEN=$((ABWEICHUNGEN + 1))
    fi
done < "$MANIFEST"

# --- 5. Stichprobe: ist der Inhalt brauchbar, nicht nur die Zeilenzahl? ----
# Eine stimmende Zeilenzahl beweist noch keinen brauchbaren Inhalt. Deshalb
# eine Stichprobe an einer Stelle, an der ein kaputter Dump auffaellt.

echo
PREFIX="$(head -20 "$MANIFEST" | grep -o '^[a-z0-9]*_' | head -1 || true)"
if [ -n "$PREFIX" ]; then
    SITEURL="$(docker exec "$CONTAINER" mysql -uroot -p"$ROOT_PW" -N -B "$DB" \
        -e "SELECT option_value FROM \`${PREFIX}options\` WHERE option_name='siteurl'" 2>/dev/null || echo "")"
    ADMIN="$(docker exec "$CONTAINER" mysql -uroot -p"$ROOT_PW" -N -B "$DB" \
        -e "SELECT user_email FROM \`${PREFIX}users\` WHERE ID=1" 2>/dev/null || echo "")"
    echo "  Stichprobe  siteurl = ${SITEURL:-<leer>}"
    echo "  Stichprobe  User 1  = ${ADMIN:-<leer>}"
    [ -n "$SITEURL" ] || { echo "  WARNUNG: siteurl leer"; ABWEICHUNGEN=$((ABWEICHUNGEN + 1)); }
fi

# --- 6. Befund -------------------------------------------------------------

echo
if [ "$ABWEICHUNGEN" -eq 0 ]; then
    echo "== BESTANDEN: ${GEPRUEFT} Tabellen ohne Abweichung, Import in ${DAUER}s =="
    echo "   Diese Zahl ist dein RTO-Datenpunkt: das Zurueckspielen der Daten"
    echo "   dauert ${DAUER}s. Der zeitkritische Teil eines Wiederaufbaus liegt"
    echo "   damit woanders - beim Neuaufsetzen von Hosting, Domains und Plugins."
else
    echo "== DURCHGEFALLEN: ${ABWEICHUNGEN} von ${GEPRUEFT} Tabellen weichen ab =="
    echo "   Nicht wegdiskutieren. Ein Dump mit Abweichung ist kein Backup."
    exit 1
fi
