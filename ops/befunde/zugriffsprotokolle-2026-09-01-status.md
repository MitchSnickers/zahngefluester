# Zugriffsprotokolle Strato-Webspace — Status 2026-09-01

Zugehörig zu: `kursdateien-2026-09-01.json` (Kursunterlagen auf
zahngefluester.education ohne Anmeldung öffentlich abrufbar, 31 Dateien,
336 MB, teils seit August 2024 online).

## Auftrag

Zugriffsprotokolle des Strato-Webspace sichern, bevor an der Konfiguration
etwas geändert wird — sie sind die einzige Quelle für die Frage, ob und von
wem auf die offenen Dateien zugegriffen wurde. Sie laufen aus.

## Befund 01.09.2026 — auf der Shell existieren keine Protokolle

Gemessen in einer SSH-Sitzung am 01.09.2026, alle Pfade direkt getestet
(`ls -ld`), nicht gesucht — der Elternordner `/mnt/web606/a2/50/533252250/`
ist nicht lesbar (`Permission denied`), erlaubt aber Durchgang, sodass exakte
Pfade prüfbar sind:

| Pfad | Ergebnis |
|---|---|
| `~/logs/` | leer / existiert nicht |
| `find ~ -maxdepth 2 -iname '*log*'` (ohne htdocs) | keine Treffer |
| `~/../logs`, `~/../logs/zahngefluester.education` | No such file or directory |
| `~/../logs/access_log`, `access.log`, `error_log` | No such file or directory |
| `~/../access_log`, `~/../access.log` | No such file or directory |
| `~/../{log,logs,logfiles,statistik,stats,webalizer}` | keiner vorhanden |
| `/logs`, `/var/log/strato` | No such file or directory |

**Schlussfolgerung:** Der Webspace liefert die Zugriffsprotokolle nicht über
die Shell aus. Weg B ist damit nicht offen, sondern beantwortet.

**Weg A ist keine Abkürzung, sondern die einzige Quelle** — und die
zeitkritische, weil die Protokolle im Kundenmenü rotieren.

## Status der Sicherung: weiterhin nicht durchgeführt

Die Protokolle sind nicht gesichert. Solange das so ist, gilt: an der
Konfiguration von zahngefluester.education wird nichts geändert, weil sich
die Frage „wurde zugegriffen" danach nicht mehr beantworten lässt.

Vorgeschichte: Die Cloud-Session, in der dieser Auftrag erteilt wurde, hat
keinen Netzwerkzugriff auf Port 22 — nur ausgehendes HTTPS über einen
policy-gesteuerten Proxy. Kein Umgehungsversuch unternommen; das ist eine
gesetzte Netzwerk-Policy, kein Fehler. Die Messung oben stammt daher aus
einer Terminal-Sitzung am Rechner.

## Weg A — Strato-Kundenmenü (offener Punkt)

Strato-Kundenmenü → Domains & SSL bzw. Statistik/Logfiles: Zugriffsprotokolle
dort aktivieren, falls nicht aktiv, und die vorhandenen Zeiträume
herunterladen. Danach hier mit Datum ergänzen: welcher Zeitraum liegt vor, ab
wann, und ob Zugriffe auf die betroffenen Dateien darin auftauchen.

Falls das Kundenmenü ebenfalls nichts liefert oder die Protokollierung dort
nie aktiv war: **auch das ist der Befund** und gehört hier festgehalten. Die
Aussage lautet dann nicht „es gab keine Zugriffe", sondern „es lässt sich
nicht mehr feststellen" — das ist ein Unterschied, der gegenüber den
Kundinnen zählt.

## Weg B — Runbook, falls Protokolle doch auf der Shell landen

Bleibt hier stehen, weil Strato die Ablage ändern kann und das Vorgehen dann
sofort verfügbar ist. Zugang: `stu376534248@533252250.ssh.w1.strato.hosting`.
Home-Verzeichnis ist selbst htdocs.

### 1. Sichern — streamen statt auf dem Server ablegen

Kein Schreibzugriff auf den Server nötig: direkt komprimiert lokal sichern,
mit Datum im Dateinamen. `scp` ist auf diesem Account defekt, daher
`cat | ssh`:

```sh
ssh stu376534248@533252250.ssh.w1.strato.hosting 'cat /pfad/zum/access_log' \
  | gzip \
  > "zugriffsprotokoll-education-$(date +%F).log.gz"
```

Bei rotierten Dateien (`access_log.1`, `access_log.2.gz`) denselben Befehl pro
Datei wiederholen, keine Konfiguration anfassen.

### 2. Prüfsumme verifizieren (CLAUDE.md 2.6 — Pflicht bei jedem Transfer)

```sh
ssh stu376534248@533252250.ssh.w1.strato.hosting 'sha256sum /pfad/zum/access_log'
zcat "zugriffsprotokoll-education-$(date +%F).log.gz" | sha256sum
```

Ohne übereinstimmenden Hash gilt der Transfer laut CLAUDE.md als nicht
erfolgt.

### 3. Auswerten

```sh
zcat "zugriffsprotokoll-education-$(date +%F).log.gz" \
  | grep -E '\.(pdf|mp4|docx)($|[?[:space:]])|/wp-json/wp/v2/media' \
  > "auswertung-relevante-zugriffe-$(date +%F).log"

# Auffällig: einzelne IP mit vielen Treffern in kurzer Folge
awk '{print $1}' "auswertung-relevante-zugriffe-$(date +%F).log" \
  | sort | uniq -c | sort -rn | head -20
```

Feldposition der IP (`$1`) je nach Logformat (Common/Combined) prüfen, bevor
man sich auf das Ergebnis verlässt.

### 4. Nichts an der Konfiguration ändern

Alle Schritte sind rein lesend plus lokale Kopie.

## Nebenbefund aus derselben Sitzung

Im Home liegen `wp-config-02.bak`, `wp-config-02.20260826-161338.bak` und
`elementor-355.20260826-162958.bak`. Sie liegen **nicht** im ausgelieferten
Bereich — ausgeliefert wird `STRATO-apps/wordpress_0X/app` — und `.bak`
liefert über HTTP generell 403, auch bei nicht existierenden Dateien.
Kein akutes Problem. `.sql.gz` steht allerdings nicht auf derselben
Sperrliste; deshalb bleibt der Browsertest aus Stufe 0 des Backup-Runbooks
Pflicht, bevor dort ein Dump abgelegt wird.

## Offen

- Weg A durchführen und Ergebnis hier mit Datum ergänzen.
- Erst danach die Lücke auf .education schließen (Media-Endpunkt sperren,
  Kursdateien aus dem ausgelieferten Verzeichnis nehmen).
- Dieser Vermerk wird nicht gelöscht, sondern fortgeschrieben
  (siehe `ops/befunde/README.md`).
