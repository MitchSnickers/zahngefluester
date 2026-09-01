/** Kursdaten der Marketing-Seite.
 *
 *  QUELLE: Notion, "Zahngeflüster / Produkte & Dienstleistungen" und die drei
 *  Unterseiten (Stand dort 10.04.2026). Texte, Preise und die Modulliste sind
 *  von dort uebernommen, nicht formuliert. Die Live-Seiten waren aus dieser
 *  Sitzung nicht erreichbar - was hier steht, ist also NICHT gegen den
 *  laufenden Shop geprueft. Drei Punkte, die daraus folgen, stehen als
 *  sichtbare Hinweise auf den Seiten und blockieren den Launch.
 *
 *  BEWUSST statisch: .com hat keine DB und keinen Login. Sobald .education
 *  steht, kommen Titel/Preis/Status per Build-Time-Fetch aus Supabase - der
 *  Kaufweg bleibt aber immer ein Link auf .education. */
import { site } from "./site";

export type Modul = { titel: string; referentin: string };
export type Merkmal = { titel: string; text: string };
export type Stimme = { text: string; person: string };

export type Kurs = {
  slug: string;
  title: string;
  kicker: string;
  price: string;
  format: string;
  /** null = nicht belegt. Bewusst nicht geraten, siehe hinweis. */
  cePoints: number | null;
  summary: string;
  module?: Modul[];
  enthalten?: string[];
  zielgruppe?: string[];
  merkmale?: Merkmal[];
  stimmen?: Stimme[];
  /** Offener Punkt, der sichtbar auf der Seite steht und den Launch sperrt. */
  hinweis?: string;
  checkoutUrl: string;
  status: "aktiv" | "eingestellt" | "auf-anfrage";
};

export const kurse: Kurs[] = [
  {
    slug: "masterclass",
    title: "Dental Diversity Masterclass 3.0",
    kicker: "Unser Flaggschiff",
    price: "699 €",
    format: "Online-Kurs, aufgezeichnete Live-Webinare, im eigenen Tempo",
    cePoints: null,
    summary:
      "Die Dental Diversity Masterclass vereint evidenzbasierte Ansätze und praxisorientiertes " +
      "Wissen in einem Online-Weiterbildungsprogramm. Sie richtet sich an Zahnärzt:innen, " +
      "Dentalhygieniker:innen und zahnmedizinische Fachangestellte, die ihr Wissen vertiefen " +
      "und ihre Fähigkeiten erweitern möchten.",
    module: [
      { titel: "Frauengesundheit: Von der Pille bis zur Menopause", referentin: "Sonja Steinert" },
      { titel: "Einfluss von Stress auf die Mundgesundheit", referentin: "Dr. Lina Dinse" },
      { titel: "Diabetes und andere Risikofaktoren", referentin: "PD Dr. Dr. Matthias Tröltzsch" },
      { titel: "Männerhormone und ihre Auswirkungen", referentin: "Jasmin Matthes" },
      { titel: "Onkologie-Patienten in der Zahnarztpraxis", referentin: "Martina Schaale" },
      { titel: "Minimalinvasivität in der PMPR/PZR", referentin: "Katja Piecuch" },
      { titel: "Wirtschaftlichkeit in der Prophylaxe", referentin: "Katja Piecuch" },
      { titel: "Alterszahnmedizin: Betreuung von Senioren", referentin: "Nicole Graw" },
      { titel: "Periimplantitis – Prävention und Behandlung", referentin: "Ann-Kathrin Giglberger" },
      { titel: "Antientzündliche Ernährung in der PA-Therapie", referentin: "Claudia Bastian" },
    ],
    zielgruppe: [
      "Zahnärztinnen und Zahnärzte",
      "Dentalhygienikerinnen und Dentalhygieniker",
      "Zahnmedizinische Fachangestellte und Prophylaxeassistenz",
    ],
    merkmale: [
      {
        titel: "Praxisorientiert",
        text:
          "Inhalte, die direkt auf die Praxis anwendbar sind – jeder Baustein ist darauf " +
          "ausgelegt, deinen Patient:innen bessere Betreuung zu bieten.",
      },
      {
        titel: "Evidenzbasiert",
        text: "Aktuelle, wissenschaftlich fundierte Erkenntnisse, damit du am Puls der Zeit bleibst.",
      },
      {
        titel: "Expert:innen",
        text: "Lerne von ausgewiesenen Fachleuten mit jahrelanger Praxiserfahrung.",
      },
      {
        titel: "Zertifikat",
        text: "Nach Abschluss erhältst du ein Zertifikat – digital oder als gedruckte Version.",
      },
      {
        titel: "Flexible Plattform",
        text: "Lerne in deinem eigenen Tempo – wann und wo es dir passt.",
      },
      {
        titel: "Individuelle Betreuung",
        text: "Jasmin & Lina und die Referent:innen stehen dir bei Fragen zur Seite.",
      },
    ],
    stimmen: [
      {
        text:
          "Das war mit Abstand die beste Fortbildung, die ich seit langem hatte. Tolle Themen, " +
          "mega Referenten. Ich kann es jedem nur empfehlen!",
        person: "Chrissi, Teilnehmerin",
      },
      {
        text:
          "Danke für die Masterclass, es war soooooo interessant und ich konnte wirklich viel " +
          "mitnehmen. Wahnsinn, was ihr auf die Beine gestellt habt!",
        person: "Kati, Teilnehmerin",
      },
    ],
    hinweis:
      "Fortbildungspunkte sind auf dieser Seite bewusst nicht angegeben. In einer früheren " +
      "Fassung stand hier „10 Fortbildungspunkte (BZÄK/DGZMK)“ – diese Zahl war von mir " +
      "gesetzt, nicht belegt. Eine falsche Punktezahl ist schlimmer als keine. Vor dem Launch " +
      "muss geklärt werden, ob und wie viele Punkte die Masterclass 3.0 trägt.",
    checkoutUrl: `${site.educationUrl}/produkt/dental-diversity-masterclass-3-0/`,
    status: "aktiv",
  },
  {
    slug: "praxisbuddy",
    title: "Masterclass 3.0 – Praxisbuddy",
    kicker: "Der kompakte Begleiter",
    price: "369 €",
    format: "Online-Kurs, ausgewählte Module der Masterclass 3.0",
    cePoints: null,
    summary:
      "Der Praxisbuddy ist die kompakte Variante der Dental Diversity Masterclass – ideal für " +
      "alle, die gezielt und effizient in die wichtigsten Themen einsteigen möchten, ohne das " +
      "volle Programm zu buchen.",
    enthalten: [
      "Ausgewählte Module aus der Dental Diversity Masterclass 3.0",
      "Aufgezeichnete Webinare – jederzeit abrufbar",
      "Begleitmaterialien und Handouts zum Download",
      "Zugang zur Zahngeflüster-Community",
      "Flexibles Lernen im eigenen Tempo",
    ],
    zielgruppe: [
      "Fachkräfte, die gezielt einzelne Themenbereiche vertiefen möchten",
      "Einsteiger:innen, die einen kompakten Überblick suchen",
      "Alle, die zeitlich flexibel lernen möchten",
    ],
    hinweis:
      "Welche Module der Praxisbuddy genau umfasst, ist nicht festgelegt – weder in Notion noch " +
      "hier. „Ausgewählte Module“ ist als Produktbeschreibung zu unbestimmt, um sie zu " +
      "verkaufen. Offene Entscheidung Nr. 2. Diese Seite darf nicht live gehen, solange der " +
      "Umfang unbestimmt ist.",
    checkoutUrl: `${site.educationUrl}/produkt/dental-diversity-masterclass-3-0-praxisbuddy/`,
    status: "aktiv",
  },
  {
    slug: "basis-prophylaxe",
    title: "Basis-Prophylaxe-Kurs",
    kicker: "Dein Fundament",
    price: "1.800 €",
    format: "Online und Praxis, nach Absprache buchbar",
    cePoints: null,
    summary:
      "Der Basis-Prophylaxe-Kurs vermittelt die wichtigsten Grundlagen der zahnmedizinischen " +
      "Prophylaxe – von der Theorie bis zur praktischen Anwendung.",
    enthalten: [
      "Fundiertes Basiswissen für den Prophylaxe-Alltag",
      "Theorie und Praxis in einem Kurs vereint",
      "Persönliche Betreuung durch Jasmin und Lina",
    ],
    zielgruppe: ["Einsteigerinnen und Einsteiger in die Prophylaxe"],
    hinweis:
      "Zum Ablauf fehlen Angaben: Termine, Ort, Dauer und Teilnehmerzahl. Außerdem ein " +
      "Widerspruch in den Quellen – die Übersicht in Notion nennt das Format „Online + Praxis“, " +
      "eine frühere Fassung dieser Seite sprach von einem reinen Präsenzkurs. Vor dem Launch zu " +
      "klären, was zutrifft.",
    checkoutUrl: `${site.educationUrl}/produkt/basis-prophylaxe-kurs/`,
    status: "auf-anfrage",
  },
];

/** Vorgaengergenerationen: nicht mehr verkauft, Bestandskundinnen behalten Zugang.
 *  Auf der Marketing-Seite nur erwaehnt, nicht beworben. */
export const archivierteGenerationen = [
  { title: "Dental Diversity Masterclass 2.0", lektionen: 22 },
  { title: "Dental Diversity Masterclass 1.0", lektionen: 10 },
];

/** BEWUSST NICHT auf der Seite.
 *  Notion fuehrt "Meet & Learn 2026" als viertes Produkt zu 139 EUR. Es steht
 *  hier nicht, weil auf der Altplattform offen ist, ob die Veranstaltung
 *  stattfindet - das Produkt soll dort auf Entwurf gesetzt und die Anmeldung
 *  geschlossen werden. Ein Event zu bewerben, dessen Durchfuehrung ungeklaert
 *  ist, waere der schlechteste denkbare erste Eindruck der neuen Seite.
 *  Wenn Jasmin und Lina es bestaetigen, kommt es als vierter Eintrag dazu. */
export const nichtBeworben = [
  { title: "Meet & Learn 2026", price: "139 €", grund: "Durchführung ungeklärt" },
];
