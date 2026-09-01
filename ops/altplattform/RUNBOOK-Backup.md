# Runbook — Backup der Zahngeflüster-Altplattform

Stand: 27.08.2026. Für den Webspace bei Strato mit den beiden
WordPress-Installationen `wordpress_01` (zahngefluester.com, DB `dbs12470740`,
Präfix `i0qf_`) und `wordpress_02` (zahngefluester.education, DB `dbs12886504`,
Präfix `vemy_`).

Dieses Runbook schließt Priorität 1 aus der Zukunftsstrategie: tägliche
Datenbanksicherung beider Installationen, Ablage außerhalb des Webspaces,
mindestens einmal zurückgespielt.

## Was inzwischen geprüft ist — und was nicht

**Nachtrag 01.09.2026.** Drei der ursprünglichen Annahmen sind inzwischen am
laufenden System überprüft:

- **Das SSH-Startverzeichnis IST `htdocs`.** `ls ~/` zeigt `STRATO-apps`,
  `cgi-bin`, `tmp` — kein `htdocs` darunter. Ausgeliefert wird aber nicht
  `htdocs`, sondern der App-Ordner der jeweiligen Installation
  (`STRATO-apps/wordpress_0X/app`). `~/backups/` liegt damit außerhalb.
  **Die erste Fassung des Skripts hatte deshalb einen Fehler**: sie brach ab,
  sobald der Pfad „htdocs" enthielt — und hätte damit jeden zulässigen Pfad
  abgelehnt. Korrigiert: geprüft wird jetzt gegen die App-Ordner.
- **`.bak`-Dateien werden vom Server generell mit 403 beantwortet**, auch nicht
  existierende. Die wp-config-Sicherungen im Home sind also nicht abrufbar.
  Das ist beruhigend, aber **kein Ersatz** für den Browsertest unten: Der
  Server hat seine Regeln, und `.sql.gz` steht nicht auf derselben Liste.
- **Zugriffsprotokolle liegen nicht auf der Shell.** Weder `~/logs/` noch eine
  Suche im Home liefern etwas. Sie sind ausschließlich im **Strato-Kundenmenü
  unter Logfiles** zu holen, und nur für begrenzte Zeit.

Weiterhin ungeprüft und deshalb in Stufe 0:

1. Steht WP-CLI `mysqldump` zur Verfügung?
2. Gibt es einen brauchbaren Cron-Weg?
3. Ist ein Off-Site-Transfer von diesem Account aus möglich?

Und Prüfpunkt 0.1 bleibt Pflicht, trotz der 403-Beobachtung. Der Dump von
`wordpress_02` enthält Bestellungen, Anschriften und Passwort-Hashes. Ob er
erreichbar ist, entscheidet nicht meine Pfadlogik, sondern der Webserver — und
auf genau diesem Account lag schon eine `debug.log` öffentlich erreichbar.

## Zeitbedarf, ehrlich

| Stufe | Inhalt | Dauer |
|---|---|---|
| 0 | Bestandsaufnahme, sechs Kommandos | 15 Min |
| 1 | Dump-Skript, erster Lauf, Cron | 60–90 Min |
| 2 | Off-Site-Transfer | 30–45 Min |
| 3 | Restore-Probe | 45 Min |
| 4 | Dateien und Alarmierung | zweiter Abend |

**Stufe 0 bis 3 sind ein Abend**, wenn nichts dazwischenkommt. Stufe 4 ist der
zweite. Wenn der Abend kürzer wird: Stufe 0 bis 1 allein bringen schon mehr als
der heutige Zustand, weil dann überhaupt wieder ein Dump entsteht.

Nicht in einem Rutsch mit Stufe 1 mischen: die 23 ausstehenden Plugin-Updates
und der PHP-Rückstufungs-Versuch. Beides braucht das Backup als Voraussetzung,
nicht als Begleitung.

---

## Stufe 0 — Bestandsaufnahme

Sechs Kommandos. Ihre Ausgabe entscheidet, welche Variante in Stufe 2 gilt.
Notiere die Antworten, sie gehören in den Session-Stand.

```bash
ssh stu376534248@533252250.ssh.w1.strato.hosting

# 1. Wo bin ich, und wo liegt htdocs?
pwd; ls -la

# 2. Ist mysqldump da, und funktioniert WP-CLI gegen beide Installationen?
which mysqldump gzip curl sftp rsync ssh sha256sum
/bin/wp --path=~/htdocs/STRATO-apps/wordpress_01/app db size
/bin/wp --path=~/htdocs/STRATO-apps/wordpress_02/app db size

# 3. Wieviel Platz ist frei?
du -sh ~/htdocs; df -h . 2>/dev/null || quota -s 2>/dev/null

# 4. Gibt es Cron auf Shell-Ebene?
crontab -l 2>&1 | head

# 5. Testdatei anlegen, gleich per Browser prüfen
mkdir -p ~/backups && echo "erreichbarkeitstest-$(date +%s)" > ~/backups/PROBE.txt
```

### Prüfpunkt 0.1 — der entscheidende

Ruf im Browser **alle** folgenden Adressen auf. Jede muss **404** oder **403**
liefern:

```
https://www.zahngefluester.com/../backups/PROBE.txt
https://www.zahngefluester.com/backups/PROBE.txt
https://zahngefluester.education/backups/PROBE.txt
```

Liefert eine davon den Dateiinhalt, ist `~/backups/` web-erreichbar. Dann
**nicht weitermachen** — stattdessen ein anderes Verzeichnis suchen und den Test
wiederholen. Danach `rm ~/backups/PROBE.txt`.

### Was die Antworten bedeuten

- **`mysqldump` fehlt** → `wp db export` funktioniert nicht. Ersatzweg über
  `wp db query` ist unbrauchbar für vollständige Dumps; dann bleibt nur
  phpMyAdmin von Hand, und das ist keine Automatisierung. In dem Fall melden,
  nicht basteln.
- **`crontab -l` verweigert** → Cron läuft über das Strato-Kundenmenü
  (Einstellungen → Cronjobs). Dort ein Shell-Skript mit vollem Pfad eintragen.
- **`rsync` fehlt** → das Skript fällt automatisch auf `sftp` im Batch-Modus
  zurück. `scp` ist auf diesem Account defekt, das ist bekannt und eingeplant.
- **Kein `sftp`, kein `rsync`, kein ausgehendes SSH** → Stufe 2 dreht sich um:
  dann holt dein Rechner die Dateien ab, statt dass Strato sie schickt. Siehe
  Variante B.

---

## Stufe 1 — Tägliche Sicherung einrichten

### 1.1 Skript hochladen

`scp` ist auf diesem Account defekt. Der Weg über die SSH-Pipe funktioniert:

```bash
cat zg-backup.sh | ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'mkdir -p ~/bin && cat > ~/bin/zg-backup.sh && chmod 700 ~/bin/zg-backup.sh'
```

Prüfsumme vergleichen — ein Transfer ohne Prüfsummenvergleich gilt als nicht
erfolgt:

```bash
sha256sum zg-backup.sh
ssh stu376534248@533252250.ssh.w1.strato.hosting 'sha256sum ~/bin/zg-backup.sh'
```

### 1.2 Erster Lauf von Hand

```bash
ssh stu376534248@533252250.ssh.w1.strato.hosting '~/bin/zg-backup.sh'
```

Erwartet: zwei Zeilen `OK wp01: …` und `OK wp02: …`. Danach:

```bash
ls -lh ~/backups/wp01 ~/backups/wp02
cat ~/backups/wp02/*.manifest.txt
```

Das Manifest ist der Kern. Es hält die Zeilenzahlen der Live-Datenbank zum
Zeitpunkt des Dumps fest — die Sollwerte, gegen die Stufe 3 prüft. Ohne vorher
notierte Sollwerte ist eine Restore-Prüfung nur eine Erzählung.

### 1.3 Untergrenze nachziehen

`MIN_BYTES` steht auf 200 KB als Platzhalter. Setz es nach dem ersten Lauf auf
etwa die Hälfte der realen Größe von `wp02`. Ein Dump, der plötzlich halb so
groß ist, soll abbrechen und nicht als Erfolg gelten.

### 1.4 Cron eintragen

Täglich um 03:15, außerhalb der Zugriffszeiten:

```
15 3 * * * /mnt/web606/a2/50/533252250/bin/zg-backup.sh >/dev/null 2>&1
```

Falls `crontab -e` verweigert wird: Strato-Kundenmenü → Cronjobs → Skript mit
vollem Pfad, Intervall täglich. Manche Strato-Pakete rufen nur URLs auf; dann
braucht es ein winziges PHP-Wrapper-Skript im Webspace, das `shell_exec` auf das
Backup-Skript macht — **das ist die schlechteste Variante**, weil sie einen
Ausführungspfad im Web öffnet. Dann lieber Variante B in Stufe 2, wo dein
Rechner den Dump auslöst und abholt.

### Prüfpunkte Stufe 1

| # | Prüfung | Erwartet |
|---|---|---|
| 1.1 | `~/backups/PROBE.txt` über alle drei Domains | 404 oder 403 |
| 1.2 | Erster Lauf | zwei `OK`-Zeilen, kein `FEHLER` |
| 1.3 | `gzip -t` auf beide Dumps | keine Ausgabe |
| 1.4 | Manifest `vemy_users` | Zahl > 0, plausibel zu den 17 bekannten Usern |
| 1.5 | Rechte auf `~/backups` | `drwx------` |
| 1.6 | Nach 24 h erneut `ls -lh` | ein zweiter, frischerer Stand |

Prüfpunkt 1.6 ist der, der übersehen wird. Ein Cron, der einmal von Hand lief
und danach nie wieder, sieht am nächsten Tag genauso aus wie einer, der läuft.

---

## Stufe 2 — Off-Site

Solange die Dumps nur auf dem Webspace liegen, decken sie genau das Szenario
nicht ab, das im August eingetreten ist: der Hoster fährt einen Restore, den
niemand angeordnet hat.

### Variante A — Strato schiebt auf eine Storage Box

Du betreibst für DroneRecon bereits eine Hetzner Storage Box mit 1 TB, belegt
sind davon rund 107 MiB. Dort einen **eigenen Sub-Account** für Zahngeflüster
anlegen — eigenes Basisverzeichnis, eigener Schlüssel, kein Zugriff auf die
DroneRecon-Daten. Dann `OFFSITE_TARGET`, `OFFSITE_PORT` und `OFFSITE_KEY` im
Skript setzen.

**Zwei Dinge, die du vorher entscheiden solltest, nicht nachher:**

Erstens die Vermischung. Auf der Box liegen THW-Einsatzdaten mit Personenbezug
von Betroffenen. Zahngeflüster-Kundendaten daneben zu legen ist technisch
trennbar, aber es sind zwei verschiedene Verantwortlichkeiten auf einem
bezahlten Konto, das auf dich läuft. Sauber wäre eine eigene Box für die
Kundinnen — 3,81 € im Monat. Für eine Brücke von wenigen Monaten ist der
Sub-Account vertretbar, wenn du es bewusst so entscheidest und im Stand
festhältst.

Zweitens die Richtung. Ein Push bedeutet: Strato besitzt Schreibrechte auf dem
Ziel. Wer den Webspace übernimmt, kann die Sicherungen löschen. Für die
Restlaufzeit der Altplattform akzeptabel, aber es ist eine bewusste Grenze und
kein Versehen.

### Variante B — dein Rechner holt ab

Wenn Stufe 0 ergibt, dass von Strato aus kein ausgehender Transfer möglich ist,
dreht sich die Richtung um. Ein Cron auf deinem Rechner oder NAS:

```bash
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'tar -C ~/backups -cf - wp01 wp02' | tar -C ~/zg-backups -xf -
```

Das ist die sicherere Variante — Strato besitzt dann keine Zugangsdaten für das
Ziel. Ihr Nachteil ist, dass sie einen laufenden Rechner braucht.

---

## Stufe 3 — Restore-Probe

Der Punkt, an dem sich entscheidet, ob das hier eine Sicherung ist oder eine
Vermutung.

```bash
# Dump auf den eigenen Rechner holen
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'cat ~/backups/wp02/$(ls -1t ~/backups/wp02 | grep sql.gz | head -1)' > wp02-probe.sql.gz

# Manifest dazu
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'cat ~/backups/wp02/$(ls -1t ~/backups/wp02 | grep manifest | head -1)' > wp02-probe.manifest.txt

# Dateinamen angleichen, damit das Skript sie findet
mv wp02-probe.manifest.txt "$(basename wp02-probe.sql.gz .sql.gz).manifest.txt"

./zg-restore-probe.sh wp02-probe.sql.gz
```

Das Skript startet einen MySQL-Container **ohne Netzwerk** (`--network none`),
spielt den Dump ein und vergleicht jede Tabelle gegen das Manifest. Es fasst
weder die Live-Datenbank noch den Webspace an.

Erwartete Ausgabe: `BESTANDEN: n Tabellen ohne Abweichung`.

Notier die Importdauer. Sie ist dein Wiederanlaufwert und beantwortet die Frage,
die im Ernstfall zuerst kommt: wie lange dauert es. Bei DroneRecon war die
Antwort Minuten, nicht Stunden — und damit war klar, dass der zeitkritische Teil
nicht das Backup ist, sondern das Neuaufsetzen drumherum.

**Bei Abweichung nicht wegdiskutieren.** Ein Dump mit Abweichung ist kein
Backup. Ursache suchen, Stufe 1 korrigieren, Probe wiederholen.

---

## Stufe 4 — Dateien und Alarmierung

### 4.1 Alarmierung

Uptime Kuma läuft bei dir ohnehin. Leg dort einen **Push-Monitor** an, Intervall
26 Stunden, und trag die Push-URL als `KUMA_PUSH_URL` ins Skript ein. Das Skript
pingt ausschließlich bei vollständigem Erfolg.

Damit ist es ein Totmannschalter: bleibt der Ping aus, schlägt Kuma Alarm. Genau
das hat im letzten Jahr gefehlt — das UpdraftPlus-Backup lief seit September 2025
nicht, und die Warnung wurde weggeklickt. Ein Backup, das niemand beobachtet,
fällt lautlos aus.

Bevor du die Alarmierung als erledigt zählst: einmal absichtlich fehlschlagen
lassen, etwa mit einem falschen Pfad in `WP_BIN`. Eine Alarmierung, die nie
ausgelöst wurde, ist eine Behauptung.

### 4.2 Dateien

Wöchentlich, nicht täglich — die Datenbank ist das, was sich ändert und was im
August verloren ging. Bei rund 1 GB Gesamtbelegung ist ein wöchentliches Archiv
unproblematisch:

```bash
tar -C ~/htdocs/STRATO-apps -czf ~/backups/files-$(date +%F).tar.gz \
  --exclude='*/wp-content/cache/*' \
  --exclude='*/wp-content/updraft/*' \
  --exclude='*/wp-content/upgrade*' \
  --exclude='*.bak-*' \
  wordpress_01/app/wp-content wordpress_02/app/wp-content
```

`updraft/` ist bewusst ausgeschlossen — dort liegen die alten UpdraftPlus-Archive
von 2025 mit 194 MB. Sie sind wertvoll (sie haben den Tutor-Rollback gerettet)
und gehören einmalig gesichert, aber nicht wöchentlich mitgeschleppt.

---

## Was in derselben Sitzung mit erledigt gehört

Drei Punkte aus Priorität 1, die zusammen keine zehn Minuten kosten und offene
Löcher sind:

```bash
# WP_DEBUG zurücksetzen und das öffentlich erreichbare Log entfernen
/bin/wp --path=~/htdocs/STRATO-apps/wordpress_02/app config set WP_DEBUG false --raw
rm -f ~/htdocs/STRATO-apps/wordpress_02/app/wp-content/debug.log

# Registrierung schließen (die Bots vom 25.08. waren die Vorschau)
/bin/wp --path=~/htdocs/STRATO-apps/wordpress_02/app option update users_can_register 0
```

Erst **nach** dem ersten erfolgreichen Backup ausführen, nicht davor.

Nicht anfassen: die beiden Bot-Registrierungen vom 25.08. Markieren und den
Kundinnen vorlegen — es werden keine Nutzerkonten ohne Freigabe gelöscht, auch
keine offensichtlichen.

Ebenfalls offen und hier nur als Erinnerung: die OneDrive- und
UpdraftVault-Zugänge liegen im Klartext in `wp_01` und sollten rotiert werden.
Das ist ein eigener Vorgang, keine Nebentätigkeit.

---

## Wenn es schiefgeht

**`db export` bricht mit Speicherfehler ab.** Shared Hosting begrenzt den
Speicher. Dann tabellenweise dumpen: `wp db tables` auflisten und in Gruppen
exportieren. Die großen sind `*_postmeta` und `*_options`.

**Cron läuft, aber es entsteht kein Dump.** Cron hat eine andere Umgebung als
deine SSH-Sitzung — meist fehlt `PATH`. Im Skript stehen deshalb absolute Pfade.
Prüf `~/backups/backup.log`, dort steht jeder Lauf mit Zeitstempel.

**Der Dump wird von Lauf zu Lauf kleiner.** Die weiche Prüfung im Skript warnt
ab 20 Prozent Schrumpf und bricht bewusst nicht ab — eine kleinere Datenbank
kann auch eine echte Änderung sein. Aber nachsehen, nicht ignorieren.

**Das Quota läuft voll.** `KEEP_LOCAL` steht auf 3. Der Webspace ist die
Zwischenablage, nicht das Archiv — die lange Vorhaltung passiert off-site.
