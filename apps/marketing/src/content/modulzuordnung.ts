/** Verbindet Module und Referentinnen.
 *
 *  Der Zweck ist nicht die Bequemlichkeit, sondern die Pruefung: die Zuordnung
 *  steht an genau einer Stelle (kurse.ts), und wenn ein Modul auf eine
 *  Referentin zeigt, die es nicht gibt, scheitert der Build - laut und beim
 *  Bauen, nicht still auf der fertigen Seite. Ein Abschnitt, der wegen eines
 *  Tippfehlers einfach verschwindet, ist der unangenehmere Fehler: er sieht
 *  aus wie eine Entscheidung. */
import { kurse, type Modul } from "./kurse";
import { referentinnen } from "./referentinnen";

const bekannteSlugs = new Set(referentinnen.map((r) => r.slug));

const unbekannt = kurse
  .flatMap((k) => k.module ?? [])
  .map((m) => m.referentinSlug)
  .filter((slug) => !bekannteSlugs.has(slug));

if (unbekannt.length > 0) {
  throw new Error(
    `Modulzuordnung: unbekannte Referentinnen-Slugs in content/kurse.ts: ${[
      ...new Set(unbekannt),
    ].join(", ")}. Entweder ist der Slug falsch geschrieben oder die Person fehlt in content/referentinnen.ts.`,
  );
}

export type ModulMitKurs = Modul & { kursSlug: string; kursTitel: string };

/** Alle Module, die diese Referentin haelt. Leer ist ein gueltiges Ergebnis:
 *  sechs der fuenfzehn Referentinnen waren in der 1.0 oder 2.0 dabei und in
 *  der aktuellen Masterclass nicht. */
export function moduleVonReferentin(slug: string): ModulMitKurs[] {
  return kurse.flatMap((k) =>
    (k.module ?? [])
      .filter((m) => m.referentinSlug === slug)
      .map((m) => ({ ...m, kursSlug: k.slug, kursTitel: k.title })),
  );
}

/** Die Referentinnen eines Kurses, in der Reihenfolge der Module und ohne
 *  Doppelte. Katja Piecuch haelt zwei Module - sie soll einmal erscheinen. */
export function referentinnenVonKurs(kursSlug: string) {
  const kurs = kurse.find((k) => k.slug === kursSlug);
  const slugs = [...new Set((kurs?.module ?? []).map((m) => m.referentinSlug))];
  return slugs
    .map((slug) => referentinnen.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
}
