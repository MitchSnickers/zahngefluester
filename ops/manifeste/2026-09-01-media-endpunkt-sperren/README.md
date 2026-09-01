# Manifest: anonyme Auflistung der Mediathek sperren (.education)

**Datum:** 01.09.2026
**System:** zahngefluester.education, WordPress-Installation `wordpress_02`
**Docroot:** `~/STRATO-apps/wordpress_02/app` (Datenbank `dbs12886504`)
**Anlass:** `ops/befunde/kursdateien-2026-09-01.json` — `/wp-json/wp/v2/media`
antwortet ohne Anmeldung mit HTTP 200 und listet 248 Dateien mit vollständigen
Adressen, darunter 31 schutzwürdige mit zusammen 336 MB.

## Was diese Stufe tut — und was nicht

**Tut:** entfernt die Route `/wp/v2/media` aus der REST-API, solange niemand
angemeldet ist. Danach kann kein Fremder mehr sehen, *welche* Dateien es gibt.

**Tut nicht:** die Dateien selbst schützen. Wer eine Adresse bereits hat, lädt
sie weiterhin herunter. Die Auffindbarkeit fällt, die Erreichbarkeit nicht.

`npm run pruefe:kursdateien` endet nach dieser Stufe **weiterhin mit Exit 1**.
Das ist beabsichtigt. Eine Prüfung, die nach dem halben Schritt grün wird,
wiegt in Sicherheit — genau der Fehler, den die Launch-Sperre schon einmal
hatte.

## Vorzustand (vor dem Eingriff festgehalten)

`~/STRATO-apps/wordpress_02/app/wp-content/mu-plugins/` enthielt drei Dateien:

| Datei | Stand |
|---|---|
| `automation-by-installatron.php` | 25.08.2026 12:53 |
| `block-all-plugin-auto-updates.php` | 26.08.2026 17:12 |
| `elementor-safe-mode.php` | 20.11.2024 |

Es wird **keine** dieser Dateien verändert. Es kommt genau eine hinzu.

Nebenbefund, nicht Teil dieses Vorgangs: `elementor-safe-mode.php` liegt seit
November 2024 dort. Elementors Safe Mode wird normalerweise zum Eingrenzen
eines Fehlers eingeschaltet und danach entfernt. Sie greift nur, wenn der
Safe Mode aktiv geschaltet ist — vermutlich also wirkungslos. Nicht angefasst,
weil sie mit diesem Vorgang nichts zu tun hat. Gehört auf die Liste.

## Änderung

Eine neue Datei, sonst nichts:

```
~/STRATO-apps/wordpress_02/app/wp-content/mu-plugins/zg-media-schutz.php
```

Keine Änderung an Datenbank, Theme, Plugins, `.htaccess` oder `wp-config.php`.
Keine Datei gelöscht, keine überschrieben.

## Rückbau

```sh
ssh stu376534248@533252250.ssh.w1.strato.hosting \
  'rm ~/STRATO-apps/wordpress_02/app/wp-content/mu-plugins/zg-media-schutz.php'
```

Das ist der vollständige Rückbau. Es gibt keinen zweiten Schritt, weil es
keinen zweiten Eingriff gab. Danach ist der Zustand exakt der von vorher —
einschließlich der offenen Lücke.

## Prüfung

| Prüfung | Erwartung vorher | Erwartung nachher |
|---|---|---|
| `/wp-json/wp/v2/media?per_page=1` anonym | 200 | 404 |
| Startseite `/` | 200 | 200 |
| Shop `/shop/` | 200 | 200 |
| Mediathek im wp-admin, angemeldet | zeigt Dateien | zeigt Dateien |

Die letzte Zeile ist die wichtige: der Filter nimmt angemeldete Benutzer aus.
Wenn die Mediathek im Backend leer wirkt, ist die Änderung zu weit gegangen
und gehört zurückgebaut — nicht nachgebessert.

## Ergebnis: durchgeführt und wirksam, 01.09.2026

| Prüfung | Vorher | Nachher |
|---|---|---|
| `/wp-json/wp/v2/media?per_page=1` anonym | 200 | **404** |
| Startseite `/` | 200 | 200 |
| Shop `/shop/` | 200 | 200 |
| `php -l zg-media-schutz.php` | — | `No syntax errors detected` |

Die drei bestehenden mu-plugins sind unverändert; die Verzeichnisliste nach dem
Eingriff zeigt sie mit ihren alten Zeitstempeln (25.08., 26.08., 20.11.2024).

### Der Rückbau ist ebenfalls belegt — versehentlich

Der Rückbaubefehl stand in derselben Anleitung direkt unter dem
Ausführungsblock, in gleicher Form zum Kopieren, und wurde beim Ausführen
mitgenommen. Die Datei war dadurch für einige Minuten wieder gelöscht und die
Lücke offen. Danach neu eingespielt, erneut auf 404 geprüft.

Das bleibt hier stehen, weil es zwei Dinge belegt, die ein Manifest sonst nur
behauptet: **die Änderung wirkt, und der Rückbau wirkt.** Der beschriebene
Notausstieg ist damit kein Vorsatz, sondern ein getesteter Vorgang.

Lehre für kommende Manifeste: **Rückbaubefehle gehören nicht in denselben
kopierbaren Block wie die Ausführung.** Sie stehen ab jetzt nur noch im
Manifest, nicht in der Anleitung daneben.

### Was damit erreicht ist — und was nicht

Erreicht: Ein Fremder kann nicht mehr herausfinden, welche Dateien es gibt.
Die Massenerfassung, mit der die 248 Dateien überhaupt erst auffindbar waren,
ist zu.

Nicht erreicht: Die Dateien selbst. Jede Adresse, die jemand bereits hat,
funktioniert weiterhin. `npm run pruefe:kursdateien` endet daher weiterhin mit
Exit 1 — richtig so.

### Offen aus dieser Stufe

- Sichtprüfung im wp-admin: Mediathek muss angemeldet weiterhin Dateien zeigen.
- Stufe 2: Schutz der Dateien selbst. Entscheidung steht aus zwischen hartem
  Sperren (sofort dicht, Bestandskundinnen der 1.0/2.0 verlieren ihre
  Downloads) und Auslieferung über eine Anmeldeprüfung (Zugang bleibt, aber
  neuer Code auf dem Produktivsystem — eigener Termin mit Test).
