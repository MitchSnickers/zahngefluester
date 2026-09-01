# Manifest: 31 Kursdateien für den direkten Abruf sperren (.education)

**Datum:** 01.09.2026
**System:** zahngefluester.education, Installation `wordpress_02` (`dbs12886504`)
**Betroffene Datei:** `~/STRATO-apps/wordpress_02/app/wp-content/uploads/.htaccess`
**Stufe 1 zuvor:** `ops/manifeste/2026-09-01-media-endpunkt-sperren/`

## Entscheidung und wer sie getroffen hat

Micha hat sich am 01.09.2026 für die vollständige harte Sperre entschieden —
alle 31 Dateien, nicht nur den Videomitschnitt. Die Alternativen und ihre
Kosten lagen ihm vor.

## Was das kostet — bewusst in Kauf genommen

Der Webserver liefert diese Dateien direkt aus und kennt keine Anmeldung. Eine
Sperre auf dieser Ebene kann deshalb **nicht** zwischen Kundin und Fremder
unterscheiden. Folge:

**Wer die Masterclass 1.0 oder 2.0 gekauft hat, kann seine Handouts nicht mehr
herunterladen.** Das sind zahlende Kundinnen mit zugesagtem dauerhaftem
Zugang. Die Lektionen in der Lernplattform sind nicht betroffen, nur die
Downloads daneben.

Das ist eine Zwischenlösung, kein Zielzustand. Der Zielzustand ist die
Auslieferung über eine Anmeldeprüfung.

**Daraus folgt eine Pflicht, die nicht technisch ist:** Jasmin und Lina müssen
davon wissen, bevor die erste Kundin sich meldet. Sonst erfahren sie von einer
Änderung an ihrem Produkt durch eine Beschwerde.

## Umfang

31 Dateien, zusammen 336,5 MB. Gesperrt wird über die Dateinamen, nicht über
Verzeichnisse — die Dateien liegen in verschiedenen Monatsordnern, und eine
Sperre ganzer Ordner würde auch Bilder treffen, die öffentlich sein sollen.

Die Namen enthalten keine Sonderzeichen; sie werden trotzdem regex-escaped,
weil ein unmaskierter Punkt in `FilesMatch` für jedes beliebige Zeichen steht
und die Sperre damit stillschweigend zu weit ginge.

Erzeugter Block: `uploads-htaccess-block.txt` (aus dem Befund generiert, nicht
von Hand geschrieben).
Prüfliste aller 31 Adressen: `pruefliste.txt`.

## Vorzustand

Wird beim Ausführen gesichert nach
`~/zg-sicherung-2026-09-01-uploads-htaccess.txt` — im Home-Verzeichnis, also
außerhalb des ausgelieferten Bereichs (ausgeliefert wird
`STRATO-apps/wordpress_0X/app`).

## Änderung

Der Block wird an die vorhandene `.htaccess` **angehängt**, zwischen zwei
Marken. Nichts Bestehendes wird verändert oder entfernt. Existiert noch keine
`.htaccess`, wird sie neu angelegt.

## Rückbau

```sh
# Variante A - Sicherung zurückspielen (wenn es vorher eine .htaccess gab)
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'cp ~/zg-sicherung-2026-09-01-uploads-htaccess.txt \
      ~/STRATO-apps/wordpress_02/app/wp-content/uploads/.htaccess'

# Variante B - nur den Block herausschneiden
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  "sed -i '/=== ZG-SCHUTZ ANFANG 2026-09-01 ===/,/=== ZG-SCHUTZ ENDE 2026-09-01 ===/d' \
      ~/STRATO-apps/wordpress_02/app/wp-content/uploads/.htaccess"
```

Variante B ist die richtige, wenn nach dem Eingriff noch etwas anderes an der
Datei geändert wurde.

## Prüfung

| Prüfung | Erwartung |
|---|---|
| Alle 31 Adressen aus `pruefliste.txt` | 403 |
| Startseite `/`, Shop `/shop/` | 200 |
| Bilder im Shop sichtbar | ja — sonst greift die Sperre zu weit |
| `npm run pruefe:kursdateien` | Exit 0 |

Die dritte Zeile ist die, die kein `curl` erledigt: Wenn Produktbilder
verschwinden, ist der Ausdruck zu weit gefasst und gehört zurückgebaut.

## Ergebnis: durchgeführt und wirksam, 01.09.2026, 11:55

**Vorzustand:** In `wp-content/uploads` gab es **keine** `.htaccess`. Es wurde
also keine bestehende Datei verändert, sondern eine neue angelegt, die
ausschließlich aus dem ZG-SCHUTZ-Block besteht. Die Sicherungsdatei im
Home-Verzeichnis wurde folgerichtig nicht geschrieben — für den Rückbau gilt
deshalb **Variante B** (Block herausschneiden) oder schlicht das Löschen der
neu angelegten Datei.

**Messung:**

| Prüfung | Ergebnis |
|---|---|
| Alle 31 Adressen aus `pruefliste.txt` | **403** — ausnahmslos |
| Startseite `/` | 200 |
| Shop `/shop/` | 200 |
| `npm run pruefe:kursdateien` | **Exit 0 — „GESCHLOSSEN"** |

Zusammen mit Stufe 1 gilt damit: weder die Liste noch die Dateien sind ohne
Anmeldung erreichbar. Die Lücke, die seit August 2024 offen stand, ist zu.

### Was jetzt kaputt ist — absichtlich

Bestandskundinnen der Masterclass 1.0 und 2.0 können ihre Handouts nicht mehr
herunterladen. Das war die bewusste Entscheidung, nicht ein Nebeneffekt. Die
Lektionen in der Lernplattform laufen weiter.

**Offene Pflicht, nicht technisch:** Jasmin und Lina informieren, bevor sich
die erste Kundin meldet.

### Beobachtung zur Liste

Einige der 31 sind öffentliche Vordrucke, keine schützenswerten Unterlagen —
`BMV-Z_20180425_Anlage14b-Hinweise.pdf`, `Ueberleitungsbogen_08_2018.pdf`,
`Pflegeampel.docx`, `Zahnaerztlicher-Bogen-Kopie.pdf`. Sie sind mitgesperrt,
weil das Aussortieren mehr Fehlerquellen gebracht hätte als Nutzen. Die Zahl
„336,5 MB schützenswertes Material" enthält sie also mit; sie ist damit eher
zu groß als zu klein.

`kh_einladung_himacs_verarbeiterworkshop_2024_clustersued_screen2.pdf` gehört
thematisch gar nicht auf diese Plattform — vermutlich ein versehentlicher
Upload aus einem anderen Zusammenhang. Ebenfalls mitgesperrt.

### Nächster Schritt

Der Zielzustand bleibt die Auslieferung über eine Anmeldeprüfung, damit
Kundinnen ihre Downloads zurückbekommen. Bis dahin ist dieser Stand die
Zwischenlösung — und der Grund, warum sie nicht dauerhaft bleiben darf, steht
oben unter „Was jetzt kaputt ist".
