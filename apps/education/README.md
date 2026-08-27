# apps/education — zahngefluester.education

Noch leer. Der Ordner existiert, damit der Ort feststeht und das zweite
Vercel-Projekt später ohne Umbau andocken kann.

## Wenn es losgeht

1. `npx create-next-app@latest apps/education --ts --tailwind --app --eslint --src-dir --import-alias "@/*"`
2. In `apps/education/package.json` den Namen auf `@zg/education` setzen und
   `"@zg/redirects": "*"` als Abhängigkeit eintragen.
3. In `next.config.ts` `trailingSlash: true` setzen und
   `EDUCATION_LEGACY_REDIRECTS` aus `@zg/redirects` in `redirects()` zurückgeben.
4. `middleware.ts` aus `apps/marketing` übernehmen, `COM_GONE_PATHS` durch
   `EDUCATION_GONE_PATHS` ersetzen.
5. Vercel-Projekt anlegen, Root Directory `apps/education`, „Include files
   outside of the Root Directory" aktiv lassen.

## Was hier gilt und in `apps/marketing` nicht

Diese App fasst Kundendaten an. Ab dem ersten Commit gelten damit die Regeln aus
Abschnitt 2 der [CLAUDE.md](../../CLAUDE.md) — Manifest und Rollback vor jedem
Schreibzugriff, Assertions vor und nach jeder Datenoperation, keine
Kundendatenlöschung ohne Freigabe.

## Offene Punkte, die vor dem Bau geklärt sein müssen

Aus *Architektur Neubau* in Notion:

1. **Meet & Learn / Events** — nachbauen oder externes Ticketing?
2. **Praxisbuddy-Umfang** — welche Module umfasst der Teilzugang für 369 €?
3. **Lernfortschritt der Bestandskundinnen** — übernehmen oder bewusst
   zurücksetzen?
4. **Basis-Prophylaxe-Kurs** — reines Buchungsprodukt ohne LMS-Inhalt, so
   gewollt?
5. **Merch** (7 Artikel) — bleibt das im Sortiment? Braucht Lager und Versand.

Dazu aus `packages/redirects`: die Zieltabelle für `/lektion/*` muss beim
Datenimport aus Tutor LMS erzeugt werden. Solange sie fehlt, laufen alle
Lektions-Deeplinks ins Leere.
