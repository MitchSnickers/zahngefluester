/** Prueft das URL-Mapping auf Widersprueche.
 *
 *  Aufruf: npm run check:redirects   (laeuft auch in der CI)
 *
 *  Warum: packages/redirects ist eine handgepflegte Liste, und Listen dieser Art
 *  bekommen mit der Zeit Dubletten. Eine doppelte Quelle faellt niemandem auf -
 *  Next nimmt stillschweigend die erste und ignoriert die zweite. Genau so
 *  verschwindet eine Weiterleitung, von der alle glauben, sie sei da.
 *
 *  Harte Pruefungen brechen ab, weiche melden nur.
 */
import {
  COM_LEGACY_REDIRECTS, EDUCATION_LEGACY_REDIRECTS,
  COM_GONE_PATHS, EDUCATION_GONE_PATHS, UNRESOLVED, REFERENTINNEN_SLUGS,
} from "../packages/redirects/index.mjs";

let hart = 0;
const melde = (art, text) => {
  console.log(`  ${art === "hart" ? "FEHLER " : "Hinweis"}  ${text}`);
  if (art === "hart") hart++;
};

console.log("URL-Mapping\n");

for (const [name, liste, gone] of [
  ["zahngefluester.com", COM_LEGACY_REDIRECTS, COM_GONE_PATHS],
  ["zahngefluester.education", EDUCATION_LEGACY_REDIRECTS, EDUCATION_GONE_PATHS],
]) {
  console.log(`  ${name}: ${liste.length} Weiterleitungen, ${gone.length} auf 410`);

  // Harte Pruefung: keine doppelte Quelle
  const gesehen = new Map();
  for (const r of liste) {
    if (gesehen.has(r.source))
      melde("hart", `${name}: Quelle doppelt - ${r.source} -> ${gesehen.get(r.source)} und ${r.destination}`);
    gesehen.set(r.source, r.destination);
  }

  // Harte Pruefung: ein Pfad ist entweder Weiterleitung oder 410, nie beides
  for (const p of gone)
    if (gesehen.has(p)) melde("hart", `${name}: ${p} steht als Weiterleitung UND auf 410`);

  // Harte Pruefung: Ziel traegt den Slash, sonst zwei Spruenge
  for (const r of liste)
    if (!r.destination.includes("/:") && !r.destination.endsWith("/"))
      melde("hart", `${name}: Ziel ohne abschliessenden Slash - ${r.source} -> ${r.destination}`);

  // Harte Pruefung: Quelle ohne Slash, sonst greift das Matching nicht
  for (const r of liste)
    if (r.source.endsWith("/")) melde("hart", `${name}: Quelle mit Slash - ${r.source}`);

  // Harte Pruefung: kein Selbstbezug
  for (const r of liste)
    if (r.source === r.destination.replace(/\/$/, "")) melde("hart", `${name}: zeigt auf sich selbst - ${r.source}`);
}

// Harte Pruefung: jede Referentin hat genau eine Weiterleitung
for (const slug of REFERENTINNEN_SLUGS) {
  const treffer = COM_LEGACY_REDIRECTS.filter((r) => r.source === `/${slug}`);
  if (treffer.length !== 1) melde("hart", `Referentin ${slug}: ${treffer.length} Weiterleitungen statt einer`);
  else if (treffer[0].destination !== `/referentinnen/${slug}/`)
    melde("hart", `Referentin ${slug}: falsches Ziel ${treffer[0].destination}`);
}

// Weich: Ungeloestes bremst nichts, muss aber vor dem Launch weg
if (UNRESOLVED.length) {
  console.log(`\n  ${UNRESOLVED.length} ungeloeste Faelle - vor dem Launch der jeweiligen Domain zu klaeren:`);
  UNRESOLVED.forEach((u) => console.log(`    ${u.source}`));
}

console.log(hart === 0 ? "\n  Mapping ist widerspruchsfrei.\n" : `\n  ${hart} harte Fehler.\n`);
process.exit(hart ? 1 : 0);
