# ops/befunde

Belegte Befunde an den Altsystemen, mit Datum und Messmethode.

**Diese Dateien listen geschütztes Material und gehören nicht in ein
öffentliches Repository.** Sie enthalten keine Zugangsdaten und keine
Kundendaten, aber sie beschreiben, wo Kursunterlagen liegen. Das Repository ist
privat und muss es bleiben.

Zweck: Ein Befund, der nur im Chat oder in einer Notiz steht, ist beim nächsten
Mal weg. Hier steht, was wann gemessen wurde und womit — damit später
nachvollziehbar ist, ob sich etwas geändert hat.

| Datei | Befund | Prüfung |
|---|---|---|
| `kursdateien-2026-09-01.json` | Kursunterlagen auf .education ohne Anmeldung abrufbar | `npm run pruefe:kursdateien` |

Ein Befund wird nicht gelöscht, wenn er behoben ist. Er bekommt oben einen
Vermerk mit Datum. Die Historie ist der Beleg.

---

## Nachtrag 01.09.2026 — der Befund zu den Kursdateien ist erledigt

`kursdateien-2026-09-01.json` beschreibt einen Zustand, den es nicht mehr gibt.
Die Datei bleibt unverändert stehen: sie ist die Messung von damals, nicht der
aktuelle Stand, und eine nachträglich geschönte Messung wäre wertlos.

Geschlossen in zwei Stufen, beide mit Manifest:

- `ops/manifeste/2026-09-01-media-endpunkt-sperren/` — anonyme Auflistung über
  die REST-API gesperrt. `/wp-json/wp/v2/media` antwortet ohne Anmeldung mit
  404 statt 200.
- `ops/manifeste/2026-09-01-kursdateien-sperren/` — die 31 Dateien selbst per
  `.htaccess` gesperrt. Alle 31 antworten mit 403.

`npm run pruefe:kursdateien` endet seither mit Exit 0. Die Prüfung bleibt im
Projekt: sie ist ab jetzt die Wache, die meldet, wenn die Sperre bei einem
Update oder einer Migration wieder herausfällt.

**Nicht geklärt und nicht mehr klärbar:** ob in den zwei Jahren jemand auf die
Dateien zugegriffen hat. Es gibt keine Zugriffsprotokolle, weder auf der Shell
noch im Kundenmenü — siehe `zugriffsprotokolle-2026-09-01-status.md`.

**Offen und nicht technisch:** Bestandskundinnen der Masterclass 1.0 und 2.0
kommen an ihre Handouts nicht mehr heran. Jasmin und Lina müssen das wissen,
bevor die erste Beschwerde kommt.
