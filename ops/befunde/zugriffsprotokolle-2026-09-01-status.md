# Zugriffsprotokolle Strato-Webspace — Status 2026-09-01

Zugehörig zu: `kursdateien-2026-09-01.json` (Kursunterlagen auf
zahngefluester.education ohne Anmeldung öffentlich abrufbar, 31 Dateien,
336 MB, teils seit August 2024 online).

## Auftrag

Zugriffsprotokolle des Strato-Webspace sichern, bevor an der Konfiguration
etwas geändert wird — sie sind die einzige Quelle für die Frage, ob und von
wem auf die offenen Dateien zugegriffen wurde. Sie laufen aus.

## Status: nicht durchgeführt

Die Cloud-Session, in der dieser Auftrag erteilt wurde, hat keinen
Netzwerkzugriff auf Port 22 (rohes TCP) — nur ausgehendes HTTPS über einen
policy-gesteuerten Proxy ist erlaubt. Verifiziert: `nc` zum SSH-Host lief in
den Timeout, kein SSH-Key im Environment, und die Proxy-Dokumentation nennt
Nicht-443-Ports explizit als nicht unterstützt. Kein Umgehungsversuch
unternommen — das ist eine gesetzte Netzwerk-Policy, kein Fehler.

**Die Aufgabe ist damit nicht erledigt, nur vorbereitet.** Sie muss aus einer
Session mit echtem Netzwerkzugriff ausgeführt werden (lokale Claude-Code-
Session oder direktes Terminal), bevor die Protokolle rotieren.

## Weg A — zuerst prüfen, ohne SSH

Strato-Kundenmenü → Domains & SSL / Logfiles: einige Strato-Webspace-Produkte
bieten Zugriffsprotokolle browserbasiert zum Aktivieren und Herunterladen an.
Wenn das greift, ist Schritt 1–2 des Auftrags damit erledigt, ganz ohne SSH.

## Weg B — Runbook für eine Session mit SSH-Zugriff

Zugang: `stu376534248@533252250.ssh.w1.strato.hosting`. Betroffen ist
zahngefluester.education (WooCommerce + Tutor LMS Pro). Home-Verzeichnis ist
selbst htdocs; Elternordner hat Durchgangs- aber keine Leserechte — Pfade
direkt testen, nicht mit `find`/`locate` suchen.

### 1. Prüfen, ob Protokolle existieren

Kandidatenpfade sind Vermutungen basierend auf typischen Strato-Layouts,
keine bestätigte Tatsache — der Reihe nach mit `ls -la` bzw. `stat` direkt
testen (funktioniert auch ohne Leserecht auf das Verzeichnis selbst, solange
der exakte Dateiname bekannt ist):

```sh
ssh stu376534248@533252250.ssh.w1.strato.hosting '
  for p in \
    ~/../logs \
    ~/../logs/zahngefluester.education \
    ~/logs \
    ~/access_log \
    ~/../access_log \
    ~/../logs/access_log \
    ~/../logs/access.log \
    ~/../logs/error_log ; do
    echo "--- $p ---"
    ls -la "$p" 2>&1
  done
'
```

Falls das nichts findet: gezielt nach den in `debug.log` vermuteten Pfaden
suchen (falls dort ein absoluter Pfad zur Log-Konfiguration steht), sonst
Weg A als primäre Quelle behandeln.

### 2. Sichern — streamen statt auf dem Server ablegen

Kein Schreibzugriff auf den Server nötig: direkt komprimiert lokal sichern,
mit Datum im Dateinamen. `scp` ist defekt, daher `cat | ssh`:

```sh
ssh stu376534248@533252250.ssh.w1.strato.hosting 'cat /pfad/zum/access_log' \
  | gzip \
  > "zugriffsprotokoll-education-$(date +%F).log.gz"
```

Bei mehreren Dateien (z. B. rotierte Logs `access_log.1`, `access_log.2.gz`)
denselben Befehl pro Datei wiederholen, keine Konfiguration anfassen.

### 3. Prüfsumme verifizieren (CLAUDE.md 2.6 — Pflicht bei jedem Transfer)

```sh
# Remote-Hash der Originaldatei
ssh stu376534248@533252250.ssh.w1.strato.hosting 'sha256sum /pfad/zum/access_log'

# Lokaler Hash des entpackten Transfers — muss übereinstimmen
zcat "zugriffsprotokoll-education-$(date +%F).log.gz" | sha256sum
```

Ohne übereinstimmenden Hash gilt der Transfer laut CLAUDE.md als nicht
erfolgt.

### 4. Auswerten

```sh
zcat "zugriffsprotokoll-education-$(date +%F).log.gz" \
  | grep -E '\.(pdf|mp4|docx)($|[?[:space:]])|/wp-json/wp/v2/media' \
  > "auswertung-relevante-zugriffe-$(date +%F).log"

# Auffällig: einzelne IP mit vielen Treffern in kurzer Folge
awk '{print $1}' "auswertung-relevante-zugriffe-$(date +%F).log" \
  | sort | uniq -c | sort -rn | head -20
```

Feldposition der IP (`$1`) je nach Logformat (Common/Combined Log Format)
prüfen, bevor man sich auf das Ergebnis verlässt.

### 5. Nichts an der Konfiguration ändern

Alle Schritte oben sind rein lesend plus lokale Kopie. Keine Datei auf dem
Server verändert oder gelöscht, kein Plugin/keine Config angefasst.

## Offen für die nächste Session

- Weg A (Kundenmenü) prüfen, bevor Weg B nötig wird — spart Zeit.
- Falls keine Protokolle existieren (weder Weg A noch B liefert etwas): das
  selbst ist der Befund für Schritt 1 des Auftrags und gehört mit Datum
  festgehalten, nicht stillschweigend übergangen.
- Nach erfolgreicher Sicherung: dieser Status-Vermerk wird nicht gelöscht,
  sondern oben mit Datum ergänzt (siehe `ops/befunde/README.md`).
