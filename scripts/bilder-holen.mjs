/** Holt die Bilder von der Live-Seite in das Repository.
 *
 *  Aufruf: npm run bilder:holen
 *
 *  Warum ein Skript und kein einmaliges Herunterladen von Hand: der Vorgang muss
 *  nachvollziehbar sein. Hier steht, welche Datei von welcher Quelle stammt und
 *  wann sie geholt wurde - sonst weiss in einem halben Jahr niemand mehr, woher
 *  die Portraets kommen und ob sie aktuell sind.
 *
 *  Das Skript ist wiederholbar: vorhandene Dateien werden uebersprungen, ausser
 *  mit --neu. Es schreibt ausschliesslich nach public/ und fasst nichts anderes an.
 *
 *  RECHTE: Die Bilder gehoeren Zahngefluester bzw. den abgebildeten Personen.
 *  Die Uebernahme auf die neue Seite ist dieselbe Verwendung wie bisher. Ob die
 *  Nutzungsrechte an den Portraets weiterhin bestehen, ist eine offene Frage an
 *  Jasmin und Lina - sie steht in der Anforderungsliste.
 */
import { mkdirSync, existsSync, writeFileSync, statSync } from "node:fs";
import { dirname } from "node:path";

const NEU = process.argv.includes("--neu");
const STAND = "01.09.2026";

/** Quelle: WordPress-Mediathek von www.zahngefluester.com, ausgelesen am 01.09.2026.
 *  Immer die Originaldatei, nicht die Vorschaugroesse. */
const BILDER = [
  ["referentinnen/jasmin-matthes.webp",              "2024/11/15.-September-2024_Shooting_LinaJasmin_kleineDaten_12.webp", 1280, 1920],
  ["referentinnen/dr-lina-dinse.webp",               "2024/11/15.-September-2024_Shooting_LinaJasmin_kleineDaten_70.webp", 1280, 1920],
  ["referentinnen/dr-marion-kauderer.webp",          "2024/03/IMG_7564-e1709814730328.webp", 1136, 1136],
  ["referentinnen/professor-dr-georg-gassmann.webp", "2024/03/Prof.-Dr.-Georg-Gassmann-e1709817590150.webp", 489, 489],
  ["referentinnen/pd-dr-dr-matthias-troeltzsch.webp","2024/11/Troelitzsch.webp", 921, 1168],
  ["referentinnen/katrin-kersting.webp",             "2024/03/IMG_7379.webp", 829, 829],
  ["referentinnen/tatjana-bejta.webp",               "2024/03/88288cab-ae2f-448a-8b94-8753e218393b.webp", 902, 902],
  ["referentinnen/sanella-blatt.webp",               "2024/03/IMG_7738-scaled-e1709814601911.webp", 1920, 1920],
  ["referentinnen/thea-wittling.webp",               "2024/03/IMG_7337.webp", 828, 828],
  ["referentinnen/sonja-steinert.webp",              "2024/03/IMG_7567-e1709815471216.webp", 425, 425],
  ["referentinnen/martina-schaale.webp",             "2024/11/Martina_Schaale.webp", 843, 1124],
  ["referentinnen/katja-piecuch.webp",               "2024/11/Katja-Pietruch.webp", 1200, 1800],
  ["referentinnen/nicole-graw.webp",                 "2024/11/Nicole-Graw-scaled-1.webp", 886, 1920],
  ["referentinnen/ann-kathrin-giglberger.webp",      "2024/11/Anki.webp", 1281, 1920],
  ["referentinnen/claudia-bastian.webp",             "2024/11/Claudia-Bastian.webp", 1155, 1600],
  ["marke/logo.webp",                                "2024/01/Kopie-von-Blue-minimalist-tooth-love-logo.webp", 500, 500],
];

const BASIS = "https://www.zahngefluester.com/wp-content/uploads/";
const ZIEL = "apps/marketing/public/";

/** WebP beginnt mit "RIFF" und traegt "WEBP" an Position 8. Ohne diese Pruefung
 *  landet eine HTML-Fehlerseite als .webp im Repo und faellt erst im Browser auf. */
function istWebp(buf) {
  return buf.length > 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP";
}

let geholt = 0, uebersprungen = 0, fehler = 0;
console.log(`Bilder holen (Quelle: www.zahngefluester.com, Stand ${STAND})\n`);

for (const [ziel, pfad, w, h] of BILDER) {
  const datei = ZIEL + ziel;
  if (existsSync(datei) && !NEU) {
    console.log(`  uebersprungen  ${ziel}  (${(statSync(datei).size/1024).toFixed(0)} kB)`);
    uebersprungen++;
    continue;
  }
  try {
    const r = await fetch(BASIS + pfad);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (!istWebp(buf)) throw new Error(`keine WebP-Datei (${buf.length} Bytes) - vermutlich eine Fehlerseite`);
    mkdirSync(dirname(datei), { recursive: true });
    writeFileSync(datei, buf);
    console.log(`  geholt         ${ziel}  ${w}x${h}  ${(buf.length/1024).toFixed(0)} kB`);
    geholt++;
  } catch (e) {
    console.log(`  FEHLER         ${ziel}  ${e.message}`);
    fehler++;
  }
}

console.log(`\n  ${geholt} geholt, ${uebersprungen} uebersprungen, ${fehler} Fehler`);
if (fehler) console.log("  Fehlende Bilder bitte melden - die Seiten zeigen sonst eine Leerstelle.\n");
process.exit(fehler ? 1 : 0);
