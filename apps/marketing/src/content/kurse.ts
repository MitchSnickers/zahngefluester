/** Kursdaten der Marketing-Seite.
 *  BEWUSST statisch: .com hat keine DB und keinen Login. Sobald .education steht,
 *  kommen Titel/Preis/Status per Build-Time-Fetch aus Supabase - der Kaufweg
 *  bleibt aber immer ein Link auf .education. */
import { site } from "./site";

export type Kurs = {
  slug: string;
  title: string;
  kicker: string;
  price: string;
  format: string;
  cePoints: number | null;
  summary: string;
  checkoutUrl: string;
  status: "aktiv" | "eingestellt" | "auf-anfrage";
};

export const kurse: Kurs[] = [
  {
    slug: "masterclass",
    title: "Dental Diversity Masterclass",
    kicker: "Aktuelle Generation",
    price: "699 €",
    format: "10 Live-Webinare à 90 Min, danach dauerhaft als Aufzeichnung",
    cePoints: 10,
    summary:
      "PLATZHALTER. Zehn Module, je Modul Aufzeichnung, Unterlagen und Referentinnen-Bio. " +
      "Abschluss mit Zertifikat über 10 Fortbildungspunkte (BZÄK/DGZMK).",
    checkoutUrl: `${site.educationUrl}/shop/masterclass-3-0/`,
    status: "aktiv",
  },
  {
    slug: "praxisbuddy",
    title: "Masterclass Praxisbuddy",
    kicker: "Teilzugang",
    price: "369 €",
    format: "Ausgewählte Module der aktuellen Masterclass",
    cePoints: null, // TODO: offen, haengt am Umfang
    summary:
      "PLATZHALTER. ⚠️ OFFEN: Welche Module der Teilzugang genau umfasst, ist nicht " +
      "geklärt (offene Entscheidung Nr. 2 in Notion). Diese Seite darf nicht live " +
      "gehen, solange der Umfang unbestimmt ist.",
    checkoutUrl: `${site.educationUrl}/shop/praxisbuddy/`,
    status: "aktiv",
  },
  {
    slug: "basis-prophylaxe",
    title: "Basis-Prophylaxe-Kurs",
    kicker: "Präsenz, Hands-on",
    price: "1.800 €",
    format: "Präsenzkurs, Termine auf Anfrage",
    cePoints: null,
    summary:
      "PLATZHALTER. Reines Buchungsprodukt ohne Online-Inhalte. " +
      "TODO: Termine, Ort, Teilnehmerzahl.",
    checkoutUrl: `${site.educationUrl}/shop/basis-prophylaxe/`,
    status: "auf-anfrage",
  },
];

/** Vorgaengergenerationen: nicht mehr verkauft, Bestandskundinnen behalten Zugang.
 *  Auf der Marketing-Seite nur erwaehnt, nicht beworben. */
export const archivierteGenerationen = [
  { title: "Dental Diversity Masterclass 2.0", lektionen: 22 },
  { title: "Dental Diversity Masterclass 1.0", lektionen: 10 },
];
