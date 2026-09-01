/** Launch-Sperre.
 *
 *  Aufruf: npm run launch-check
 *
 *  Warum ein Skript und keine Suche, die man sich merkt: die urspruengliche
 *  Regel in der CLAUDE.md lautete "rg -i platzhalter|TODO muss leer sein".
 *  Sie hatte eine blinde Stelle - Impressum, Datenschutz, Kontakt und die
 *  fuenfzehn Referentinnen-Seiten tragen unfertige Kaesten, in deren Text das
 *  Wort gar nicht vorkommt. Ausgerechnet die rechtlich heiklen Seiten waeren
 *  als fertig durchgegangen.
 *
 *  Verlaesslich ist die Komponente, nicht das Wort. Danach wird hier geprueft.
 */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { execSync } from "node:child_process";

const WURZEL = "apps/marketing/src";
let fehler = 0;

function dateien() {
  return execSync(`find ${WURZEL} -type f \\( -name '*.tsx' -o -name '*.ts' \\)`)
    .toString().trim().split("\n").filter(Boolean);
}

const treffer = { komponente: [], wort: [] };

for (const f of dateien()) {
  const t = readFileSync(f, "utf8");
  t.split("\n").forEach((zeile, i) => {
    if (zeile.includes("<Placeholder")) treffer.komponente.push(`${f}:${i + 1}`);
    if (/PLATZHALTER|TODO/i.test(zeile) && !f.endsWith("Placeholder.tsx"))
      treffer.wort.push(`${f}:${i + 1}`);
  });
}

console.log("Launch-Sperre\n");

if (treffer.komponente.length) {
  console.log(`  ${treffer.komponente.length} unfertige Kaesten (<Placeholder>):`);
  treffer.komponente.forEach((s) => console.log("    " + s));
  fehler++;
} else {
  console.log("  keine <Placeholder> mehr");
}

if (treffer.wort.length) {
  console.log(`\n  ${treffer.wort.length} Stellen mit PLATZHALTER oder TODO:`);
  treffer.wort.forEach((s) => console.log("    " + s));
  fehler++;
} else {
  console.log("  kein PLATZHALTER, kein TODO");
}

// noindex ist ein bewusster Schalter - er darf erst fallen, wenn alles andere leer ist.
const layout = readFileSync(`${WURZEL}/app/layout.tsx`, "utf8");
const robots = readFileSync(`${WURZEL}/app/robots.ts`, "utf8");
const gesperrt = layout.includes("index: false") || robots.includes('disallow: "/"');

console.log(`\n  Indexierung: ${gesperrt ? "gesperrt (noindex)" : "FREIGEGEBEN"}`);

if (fehler && !gesperrt) {
  console.log("\n  WIDERSPRUCH: Es sind noch Platzhalter da, aber die Indexierung ist frei.");
  fehler++;
}

console.log(
  fehler === 0
    ? "\n  Bereit zum Launch.\n"
    : "\n  NICHT bereit. Erst die Punkte oben, dann noindex entfernen.\n"
);
process.exit(fehler ? 1 : 0);
