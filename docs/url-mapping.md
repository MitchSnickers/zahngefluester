<!-- ERZEUGT von scripts/url-mapping.mjs. Nicht von Hand bearbeiten. -->
# URL-Mapping alt → neu

Quelle der Wahrheit ist `packages/redirects/index.mjs`. Diese Seite wird daraus
erzeugt.

Quellen der Daten:

- **.education** — Notion *Architektur Neubau* (26.08.2026) und
  *Migrations-Inventar* (31.07.2026)
- **.com** — Live-Sitemaps von www.zahngefluester.com, gezogen 27.08.2026.
  Im Migrations-Inventar nicht enthalten, das wurde nur aus den
  .education-Sitemaps erhoben.

Alle Pfade stehen ohne abschließenden Slash. Beide Apps fahren
`trailingSlash: true`, Next normalisiert vor dem Matching. Ziele tragen den
Slash, damit keine Weiterleitungskette aus zwei Sprüngen entsteht.

---

## zahngefluester.com — 35 Weiterleitungen

| Alt | Neu | Anmerkung |
|---|---|---|
| `/about-us` | `/ueber-uns/` |  |
| `/fortbildungen` | `/kurse/` |  |
| `/workshops` | `/kurse/` | Praezisieren, sobald geklaert ist, ob Workshops = Basis-Prophylaxe-Kurs |
| `/workshops/events` | `/kurse/` | Haengt an der offenen Entscheidung Meet & Learn / Events |
| `/wartezimmer-2025` | `/` |  |
| `/jasmin-matthes` | `/referentinnen/jasmin-matthes/` |  |
| `/dr-lina-dinse` | `/referentinnen/dr-lina-dinse/` |  |
| `/dr-marion-kauderer` | `/referentinnen/dr-marion-kauderer/` |  |
| `/professor-dr-georg-gassmann` | `/referentinnen/professor-dr-georg-gassmann/` |  |
| `/pd-dr-dr-matthias-troeltzsch` | `/referentinnen/pd-dr-dr-matthias-troeltzsch/` |  |
| `/katrin-kersting` | `/referentinnen/katrin-kersting/` |  |
| `/tatjana-bejta` | `/referentinnen/tatjana-bejta/` |  |
| `/sanella-blatt` | `/referentinnen/sanella-blatt/` |  |
| `/thea-wittling` | `/referentinnen/thea-wittling/` |  |
| `/sonja-steinert` | `/referentinnen/sonja-steinert/` |  |
| `/martina-schaale` | `/referentinnen/martina-schaale/` |  |
| `/katja-piecuch` | `/referentinnen/katja-piecuch/` |  |
| `/nicole-graw` | `/referentinnen/nicole-graw/` |  |
| `/ann-kathrin-giglberger` | `/referentinnen/ann-kathrin-giglberger/` |  |
| `/claudia-bastian` | `/referentinnen/claudia-bastian/` |  |
| `/kurse/dental-diversity-masterclass` | `https://www.zahngefluester.education/kurse/masterclass-1-0/` |  |
| `/kurse/dental-diversity-masterclass-2-0` | `https://www.zahngefluester.education/kurse/masterclass-2-0/` |  |
| `/shop` | `https://www.zahngefluester.education/shop/` |  |
| `/shop/warenkorb` | `https://www.zahngefluester.education/shop/` |  |
| `/cart` | `https://www.zahngefluester.education/shop/` |  |
| `/checkout` | `https://www.zahngefluester.education/shop/` |  |
| `/mein-konto` | `https://www.zahngefluester.education/dashboard/` |  |
| `/dashboard` | `https://www.zahngefluester.education/dashboard/` |  |
| `/produkt/:slug*` | `https://www.zahngefluester.education/shop/` | OFFEN: Merch (u.a. handgemachte-holz-ohrstecker). Wenn Merch bleibt, muss je Artikel auf /shop/<slug> gemappt werden statt pauschal. |
| `/agb` | `https://www.zahngefluester.education/agb/` |  |
| `/widerrufsbelehrung` | `https://www.zahngefluester.education/widerrufsbelehrung/` |  |
| `/versandarten` | `https://www.zahngefluester.education/versandarten/` |  |
| `/bezahlmoeglichkeiten` | `https://www.zahngefluester.education/bezahlmoeglichkeiten/` |  |
| `/echtheit-von-bewertungen` | `https://www.zahngefluester.education/echtheit-von-bewertungen/` |  |
| `/datenschutzerklaerung` | `/datenschutz/` | .com hat heute beide Seiten. /datenschutz/ ist die kanonische im neuen Seitenbaum. |

### 410 Gone (4)

`/global-styles` · `/hello-world` · `/registrierung-fuer-teilnehmer` · `/anmeldung-fuer-kursleiter`

---

## zahngefluester.education — 17 Weiterleitungen

| Alt | Neu | Anmerkung |
|---|---|---|
| `/kurse/dental-diversity-masterclass-30` | `/kurse/masterclass-3-0/` |  |
| `/kurse/dental-diversity-masterclass-2-0` | `/kurse/masterclass-2-0/` |  |
| `/kurse/dental-diversity-masterclass` | `/kurse/masterclass-1-0/` |  |
| `/my-account` | `/dashboard/` |  |
| `/tutor-uebersicht` | `/dashboard/` |  |
| `/tutor-zertifikate-3` | `/zertifikate/` |  |
| `/praxiszugaenge-dental-diversity-masterclass-3-0` | `/praxiszugaenge/` |  |
| `/produkt/:slug*` | `/shop/:slug*` |  |
| `/about-us` | `https://www.zahngefluester.com/ueber-uns/` |  |
| `/contact` | `https://www.zahngefluester.com/kontakt/` |  |
| `/bio` | `https://www.zahngefluester.com/referentinnen/` |  |
| `/uebersicht` | `https://www.zahngefluester.com/kurse/` |  |
| `/sale-page` | `https://www.zahngefluester.com/kurse/masterclass/` |  |
| `/help-info` | `https://www.zahngefluester.com/faq/` |  |
| `/dental-diversity-masterclass-3-0` | `https://www.zahngefluester.com/kurse/masterclass/` |  |
| `/masterclass-2-0` | `https://www.zahngefluester.com/kurse/` | 2.0 wird nicht mehr verkauft - Uebersicht statt Produktseite |
| `/wartezimmer-2025` | `https://www.zahngefluester.com/` |  |

### 410 Gone (15)

`/tutor-login` · `/tutor-login-2` · `/tutor-login-3` · `/tutor-login-4` · `/tutor-login-5` · `/tutor-login-6` · `/tutor-login-7` · `/cart-2` · `/checkout-2` · `/sample-page` · `/global-styles` · `/anmeldung-fuer-kursleiter` · `/registrierung-fuer-teilnehmer` · `/dashboard-seite` · `/hello-world`

### URLs, die unverändert bleiben

Rechtsseiten auf .education: `/impressum/` · `/agb/` ·
`/datenschutzerklaerung/` · `/widerrufsbelehrung/` ·
`/echtheit-von-bewertungen/` · `/versandarten/` · `/bezahlmoeglichkeiten/`

Impressum und Datenschutz braucht **jede** Domain eigenständig. AGB,
Widerrufsbelehrung, Versandarten, Bezahlmöglichkeiten und Echtheit von
Bewertungen liegen auf .education, weil Shop und Checkout dort liegen.

---

## Offen (3) — muss vor dem Launch der jeweiligen Domain leer sein

### `/lektion/*  (.education, ~62 Lektionen)`

Zielpfad /kurse/<kurs>/<modul>/<lektion>/ laesst sich nicht aus dem alten flachen Slug ableiten. Die Tabelle muss beim Datenimport aus Tutor LMS erzeugt werden - ein Eintrag pro Lektion. Bis dahin laufen alle Lektions-Deeplinks ins Leere.

### `/terms-privacy/  (.education)`

Im Migrations-Inventar als rechtlich verpflichtend gefuehrt, aber ohne erkennbares Gegenstueck im neuen Seitenbaum. Vermutlich englisches Duplikat von /datenschutzerklaerung/. Vor dem Launch pruefen.

### `/produkt/handgemachte-holz-ohrstecker/  (.com)`

Merch. Offene Entscheidung Nr. 5 in Notion. Solange offen, greift der pauschale /produkt/:slug* -> /shop. Wenn Merch bleibt, braucht jeder der 7 Artikel ein eigenes Ziel.
