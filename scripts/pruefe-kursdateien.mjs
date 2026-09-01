/** Prueft, ob die Kursunterlagen auf zahngefluester.education oeffentlich
 *  abrufbar sind.
 *
 *  Aufruf:  npm run pruefe:kursdateien
 *
 *  ZWECK. Am 01.09.2026 wurde festgestellt, dass die vollstaendige Dateiliste
 *  der Lernplattform ohne Anmeldung abrufbar ist und jede Datei einzeln geladen
 *  werden kann - darunter das Unterrichtsmaterial der Masterclass 1.0 und 2.0.
 *  Der Befund liegt in ops/befunde/kursdateien-2026-09-01.json.
 *
 *  Dieses Skript macht aus der Behauptung eine Messung. Es beweist heute den
 *  Zustand und spaeter, dass die Luecke geschlossen ist. Solange es mit Exit 1
 *  endet, ist sie offen.
 *
 *  SCHONEND. Es wird NICHTS heruntergeladen: jede Pruefung fordert mit
 *  Range: bytes=0-0 genau ein Byte an. Zwischen den Anfragen liegt eine kurze
 *  Pause, damit die ohnehin belastete Altplattform nicht zusaetzlich leidet.
 *
 *  ANONYM. Es werden keine Anmeldedaten mitgeschickt. Was dieses Skript sieht,
 *  sieht jeder Besucher.
 */
import { readFileSync } from "node:fs";

const HOST = "https://zahngefluester.education";
const BEFUND = "ops/befunde/kursdateien-2026-09-01.json";
const PAUSE = 250;

const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const mb = (b) => (b / 1024 / 1024).toFixed(1);

console.log(`Pruefung: sind die Kursunterlagen oeffentlich?  (${new Date().toISOString().slice(0, 16)})\n`);

let offen = 0;

// --- 1. Ist die Dateiliste ohne Anmeldung abrufbar? -------------------------
// Das ist der schwerwiegendere Teil: ohne diese Liste muesste man Adressen
// raten, mit ihr bekommt man sie frei Haus.
let listeOffen = false, gesamt = "?";
try {
  const r = await fetch(`${HOST}/wp-json/wp/v2/media?per_page=1&_fields=id`, { redirect: "follow" });
  gesamt = r.headers.get("X-WP-Total") ?? "?";
  listeOffen = r.ok;
  console.log(`  Dateiliste ohne Anmeldung   HTTP ${r.status}` +
              (r.ok ? `  -> OFFEN, ${gesamt} Dateien auflistbar` : "  -> gesperrt"));
} catch (e) {
  console.log(`  Dateiliste ohne Anmeldung   nicht erreichbar (${e.message.slice(0, 40)})`);
}
if (listeOffen) offen++;

// --- 2. Sind die einzelnen Dateien abrufbar? --------------------------------
const befund = JSON.parse(readFileSync(BEFUND, "utf8"));
const dateien = befund.schutzwuerdig;
console.log(`\n  Einzelabruf von ${dateien.length} schutzwuerdigen Dateien (${mb(dateien.reduce((s, d) => s + d.bytes, 0))} MB):\n`);

let erreichbar = 0, gesperrt = 0, weg = 0;
for (const d of dateien) {
  await warte(PAUSE);
  let zeile;
  try {
    const r = await fetch(`${HOST}/wp-content/uploads/${d.pfad}`,
      { headers: { Range: "bytes=0-0" }, redirect: "manual" });
    if (r.status === 200 || r.status === 206) { erreichbar++; zeile = `OFFEN     ${r.status}`; }
    else if (r.status === 404) { weg++; zeile = `entfernt  404`; }
    else { gesperrt++; zeile = `gesperrt  ${r.status}`; }
  } catch (e) { gesperrt++; zeile = `Fehler    ${e.message.slice(0, 24)}`; }
  console.log(`    ${zeile}  ${d.pfad.slice(0, 66)}`);
}

console.log(`\n  ${erreichbar} offen, ${gesperrt} gesperrt, ${weg} nicht mehr vorhanden`);
if (erreichbar > 0) offen++;

// --- Befund ----------------------------------------------------------------
console.log("");
if (offen === 0) {
  console.log("  GESCHLOSSEN. Weder die Liste noch die Dateien sind ohne Anmeldung erreichbar.");
  console.log("  Dieses Ergebnis gehoert mit Datum nach Notion - vorher war es andersherum.\n");
} else {
  console.log("  OFFEN. Der Zustand vom 01.09.2026 besteht fort.");
  console.log("  Reihenfolge: erst die Server-Protokolle bei Strato sichern (wer hat zugegriffen),");
  console.log("  dann den anonymen Zugriff auf die Liste sperren, dann die Dateien aus dem");
  console.log("  frei ausgelieferten Verzeichnis nehmen.\n");
}
process.exit(offen ? 1 : 0);
