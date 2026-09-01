/** Erzeugt docs/url-mapping.md aus packages/redirects.
 *  Die Doku wird nicht von Hand gepflegt - sonst laeuft sie von den echten
 *  Weiterleitungen weg, und das ist genau der Fehler, der diesem Projekt schon
 *  einmal drei widerspruechliche Notion-Seiten eingebracht hat.
 *
 *  Aufruf: npm run docs:urls
 */
import { writeFileSync } from "node:fs";
import {
  COM_LEGACY_REDIRECTS,
  EDUCATION_LEGACY_REDIRECTS,
  COM_GONE_PATHS,
  EDUCATION_GONE_PATHS,
  UNRESOLVED,
  DOMAINS,
} from "../packages/redirects/index.mjs";

const table = (rows) =>
  ["| Alt | Neu | Anmerkung |", "|---|---|---|"]
    .concat(rows.map((r) => `| \`${r.source}\` | \`${r.destination}\` | ${r.note ?? ""} |`))
    .join("\n");

const list = (paths) => paths.map((p) => `\`${p}\``).join(" · ");

const domainTable = () =>
  ["| Domain | Punycode | Rolle | Ziel nach der Umschaltung |", "|---|---|---|---|"]
    .concat(
      DOMAINS.map(
        (d) => `| \`${d.domain}\` | \`${d.punycode}\` | ${d.rolle} | ${d.ziel} |`,
      ),
    )
    .join("\n");

const out = `<!-- ERZEUGT von scripts/url-mapping.mjs. Nicht von Hand bearbeiten. -->
# URL-Mapping alt → neu

Quelle der Wahrheit ist \`packages/redirects/index.mjs\`. Diese Seite wird daraus
erzeugt.

Quellen der Daten:

- **.education** — Notion *Architektur Neubau* (26.08.2026) und
  *Migrations-Inventar* (31.07.2026)
- **.com** — Live-Sitemaps von www.zahngefluester.com, gezogen 27.08.2026.
  Im Migrations-Inventar nicht enthalten, das wurde nur aus den
  .education-Sitemaps erhoben.

Alle Pfade stehen ohne abschließenden Slash. Beide Apps fahren
\`trailingSlash: true\`, Next normalisiert vor dem Matching. Ziele tragen den
Slash, damit keine Weiterleitungskette aus zwei Sprüngen entsteht.

---

## zahngefluester.com — ${COM_LEGACY_REDIRECTS.length} Weiterleitungen

${table(COM_LEGACY_REDIRECTS)}

### 410 Gone (${COM_GONE_PATHS.length})

${list(COM_GONE_PATHS)}

---

## zahngefluester.education — ${EDUCATION_LEGACY_REDIRECTS.length} Weiterleitungen

${table(EDUCATION_LEGACY_REDIRECTS)}

### 410 Gone (${EDUCATION_GONE_PATHS.length})

${list(EDUCATION_GONE_PATHS)}

### URLs, die unverändert bleiben

Rechtsseiten auf .education: \`/impressum/\` · \`/agb/\` ·
\`/datenschutzerklaerung/\` · \`/widerrufsbelehrung/\` ·
\`/echtheit-von-bewertungen/\` · \`/versandarten/\` · \`/bezahlmoeglichkeiten/\`

Impressum und Datenschutz braucht **jede** Domain eigenständig. AGB,
Widerrufsbelehrung, Versandarten, Bezahlmöglichkeiten und Echtheit von
Bewertungen liegen auf .education, weil Shop und Checkout dort liegen.

---

## Offen (${UNRESOLVED.length}) — muss vor dem Launch der jeweiligen Domain leer sein

${UNRESOLVED.map((u) => `### \`${u.source}\`\n\n${u.problem}`).join("\n\n")}

## Domains im Vertrag

Gelesen am 01.09.2026 im Strato-Kundenmenue. Domain-Aliase werden im
Vercel-Projekt eingetragen, nicht in \`packages/redirects\` - die Liste steht
hier, weil eine vergessene Domain nach dem Umzug still ins Leere laeuft.

${domainTable()}

Offen: die Fussleiste auf .com verlinkt die Datenschutzerklaerung auf
\`zahngefluester.de\` (ausgeschrieben). Diese Domain steht nicht in der Liste.
`;

writeFileSync(new URL("../docs/url-mapping.md", import.meta.url), out);
console.log("docs/url-mapping.md geschrieben");
