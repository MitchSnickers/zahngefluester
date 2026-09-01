# Zugriffsprotokolle Strato-Webspace — Status 2026-09-01

Zugehörig zu: `kursdateien-2026-09-01.json` (Kursunterlagen auf
zahngefluester.education ohne Anmeldung öffentlich abrufbar, 31 Dateien,
336 MB, teils seit August 2024 online).

## Auftrag

Zugriffsprotokolle des Strato-Webspace sichern, bevor an der Konfiguration
etwas geändert wird — sie sind die einzige Quelle für die Frage, ob und von
wem auf die offenen Dateien zugegriffen wurde.

## Ergebnis: es gibt keine. Die Frage ist nicht mehr beantwortbar.

Abgeschlossen am 01.09.2026. Beide möglichen Quellen wurden geprüft, das
Ergebnis ist in beiden Fällen negativ.

### Shell (SSH)

Alle Kandidatenpfade direkt getestet (`ls -ld`), nicht gesucht — der
Elternordner `/mnt/web606/a2/50/533252250/` ist nicht lesbar
(`Permission denied`), erlaubt aber Durchgang, sodass exakte Pfade prüfbar
sind:

| Pfad | Ergebnis |
|---|---|
| `~/logs/` | leer / existiert nicht |
| `find ~ -maxdepth 2 -iname '*log*'` (ohne htdocs) | keine Treffer |
| `~/../logs`, `~/../logs/zahngefluester.education` | No such file or directory |
| `~/../logs/access_log`, `access.log`, `error_log` | No such file or directory |
| `~/../access_log`, `~/../access.log` | No such file or directory |
| `~/../{log,logs,logfiles,statistik,stats,webalizer}` | keiner vorhanden |
| `/logs`, `/var/log/strato` | No such file or directory |

Der Dateimanager im Kundenmenü (Datenbanken und Webspace → Webspace) zeigt
exakt dasselbe Verzeichnis und kommt über diese Ebene ebenfalls nicht hinaus.
Zwei unabhängige Wege, dasselbe Ergebnis.

### Kundenmenü

Durchgesehen: Domains, Datenbanken und Webspace (Dateimanager, BackupControl,
SFTP & SSH, PHP-Version), Online Marketing, Paketübersicht STRATO Hosting
Basic. Rohe Zugriffsprotokolle bietet der Tarif nicht an. Die einzige
verwandte Funktion ist eine Kachel „Statistik anzeigen — Zugriffszahlen", also
eine aufbereitete Besucherzählung. Die beantwortet die Frage nicht: gebraucht
würde, ob eine bestimmte Datei abgerufen wurde, nicht wie viele Besucher die
Seite hatte. Nicht weiter verfolgt.

### Was daraus folgt

- Die Aussage gegenüber den Kundinnen lautet **nicht** „es hat niemand
  zugegriffen", sondern **„es lässt sich nicht mehr feststellen"**. Der
  Unterschied ist wesentlich und darf in der Kommunikation nicht verwischen.
- Die Sperre, das Schließen der Lücke bis zur Protokollsicherung
  zurückzustellen, **entfällt**. Es gibt nichts mehr zu verlieren.
  Nächster Schritt ist das Schließen selbst.
- Für die Zukunft: die neue Plattform muss eigene Zugriffsprotokolle führen,
  weil dieser Fall sonst wieder unbeantwortbar wäre.

## Nebenbefunde aus derselben Durchsicht

**BackupControl** (Strato-eigene Sicherung, im Tarif enthalten): acht
Versionen, 09.08.2026 bis heute — die letzten vier Tage täglich, davor
wöchentlich. Aufbewahrung also rund drei Wochen.

Deckt ab: „gestern lief es, heute ist es kaputt". Deckt nicht ab: Verlust des
Vertrags, ein Problem das erst nach über drei Wochen auffällt, ein
versehentliches Zurückspielen. Und es liegt beim selben Anbieter. Die eigene
Kopie außerhalb von Strato bleibt daher im Runbook — die Dringlichkeit der
Stufen 0 und 1 sinkt aber deutlich. Für die Frage nach den Kursdateien nützt
es nichts: die älteste Version ist vom 09.08.2026, offen liegen die Dateien
seit August 2024.

**Größen für das eigene Backup** (gemessen, vorher geschätzt): Webspace
9,94 GB von 100 GB. Datenbanken 126,84 MB (`dbs12470740`, WordPress .com) und
147,31 MB (`dbs12886504`, WordPress .education), zusammen rund 274 MB.
Webspace-Pfad laut Paketübersicht `/mnt/rid/22/50/533252250/htdocs`.

**Fünf Domains im Vertrag, nicht zwei** — alle aktiv mit SSL:
`zahngefluester.com`, `zahngefluester.education`, `zahngeflüster.com`,
`zahngeflüster.de`, `zahngeflüster.info`. Domain Guard nur auf der `.de`.

Die drei Umlaut-Domains sind technisch eigene Adressen (Punycode) und gehören
ins Weiterleitungs-Mapping, sonst laufen sie nach dem Umschalten ins Leere.
**Offen:** Die Fußzeile auf .com verlinkt die Datenschutzerklärung auf eine
nicht auflösende `zahngefluester.de` — ausgeschrieben. Ob dieses Ziel die
Umlaut-Domain meint (dann ein Einstellungsfehler) oder die ausgeschriebene
Variante (die nicht im Vertrag steht, dann ein Link ins Fremde), ist noch
nicht geprüft.

**SiteLock** meldet in der Paketübersicht „5 gefährdete Websites" mit
Warndreieck. Nicht geprüft. Bei Strato ist das erfahrungsgemäß eine Anzeige
für ein kostenpflichtiges Zusatzpaket und keine Befundmeldung — behauptet ist
weder das eine noch das andere.

## Runbook — falls Protokolle doch einmal verfügbar sind

Bleibt stehen, weil Strato die Ablage ändern kann.
Zugang: `stu376534248@533252250.ssh.w1.strato.hosting`. Home ist selbst
htdocs, `scp` auf diesem Account defekt.

```sh
# Sichern, ohne auf dem Server zu schreiben
ssh <zugang> 'cat /pfad/zum/access_log' | gzip > "zugriffsprotokoll-$(date +%F).log.gz"

# Prüfsumme (CLAUDE.md 2.6 — Pflicht bei jedem Transfer)
ssh <zugang> 'sha256sum /pfad/zum/access_log'
zcat "zugriffsprotokoll-$(date +%F).log.gz" | sha256sum

# Auswerten
zcat "zugriffsprotokoll-$(date +%F).log.gz" \
  | grep -E '\.(pdf|mp4|docx)($|[?[:space:]])|/wp-json/wp/v2/media'
```

Feldposition der IP je nach Logformat prüfen, bevor man sich auf eine
Häufigkeitsauswertung verlässt.
