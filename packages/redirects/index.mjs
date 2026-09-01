// URL-Mapping alt -> neu, Zahngefluester-Relaunch.
//
// QUELLEN
//   .education : Notion "Architektur Neubau - Seitenbaum, URLs, Datenmodell" (26.08.2026)
//                und "Migrations-Inventar" (31.07.2026)
//   .com       : Live-Sitemaps von www.zahngefluester.com, gezogen 27.08.2026.
//                Im Migrations-Inventar NICHT enthalten - das wurde nur aus den
//                .education-Sitemaps erhoben.
//
// REGEL: Diese Datei ist die einzige Quelle fuer Weiterleitungen. Beide Vercel-
// Projekte importieren sie. Kein Redirect wird direkt in eine next.config
// geschrieben. Zeilen werden nicht geloescht, sondern mit Begruendung ersetzt.
//
// Pfade stehen OHNE abschliessenden Slash. Beide Apps fahren trailingSlash: true,
// Next normalisiert vor dem Matching.

const EDU = "https://www.zahngefluester.education";
const COM = "https://www.zahngefluester.com";

/** Die 15 Referentinnen hatten auf .com je eine eigene, indexierte Seite auf
 *  oberster Ebene. Der Seitenbaum sah nur eine Sammelseite vor - das waere der
 *  Verlust von 15 indexierten Seiten. Slugs bleiben identisch, nur eine Ebene
 *  tiefer. */
export const REFERENTINNEN_SLUGS = [
  "jasmin-matthes",
  "dr-lina-dinse",
  "dr-marion-kauderer",
  "professor-dr-georg-gassmann",
  "pd-dr-dr-matthias-troeltzsch",
  "katrin-kersting",
  "tatjana-bejta",
  "sanella-blatt",
  "thea-wittling",
  "sonja-steinert",
  "martina-schaale",
  "katja-piecuch",
  "nicole-graw",
  "ann-kathrin-giglberger",
  "claudia-bastian",
];


/** Beide Apps fahren trailingSlash: true. Ohne abschliessenden Slash im Ziel
 *  leitet Next ein zweites Mal um - jede Alt-URL kaeme dann ueber zwei Sprunge
 *  an. Diese Funktion sorgt dafuer, dass niemand daran denken muss.
 *  Ziele mit Pfad-Platzhaltern (/:slug) bleiben unberuehrt, dort erledigt Next
 *  die Normalisierung selbst und ein angehaengter Slash koennte doppeln.
 *  Achtung: nicht auf ":" pruefen - "https:" enthaelt einen Doppelpunkt, damit
 *  waeren alle domainuebergreifenden Ziele durchgerutscht. */
function normalize(list) {
  return list.map((r) => ({
    ...r,
    destination:
      r.destination.includes("/:") || r.destination.endsWith("/")
        ? r.destination
        : `${r.destination}/`,
  }));
}

const COM_LEGACY = [
  // --- Marketing ---
  { source: "/about-us", destination: "/ueber-uns", permanent: true },
  { source: "/fortbildungen", destination: "/kurse", permanent: true },
  { source: "/workshops", destination: "/kurse", permanent: true,
    note: "Praezisieren, sobald geklaert ist, ob Workshops = Basis-Prophylaxe-Kurs" },
  { source: "/workshops/events", destination: "/kurse", permanent: true,
    note: "Haengt an der offenen Entscheidung Meet & Learn / Events" },
  { source: "/wartezimmer-2025", destination: "/", permanent: true },

  // --- Referentinnen: /<name>/ -> /referentinnen/<name>/ ---
  ...REFERENTINNEN_SLUGS.map((slug) => ({
    source: `/${slug}`,
    destination: `/referentinnen/${slug}`,
    permanent: true,
  })),

  // --- Kurse, die auf .education gehoeren ---
  { source: "/kurse/dental-diversity-masterclass", destination: `${EDU}/kurse/masterclass-1-0`, permanent: true },
  { source: "/kurse/dental-diversity-masterclass-2-0", destination: `${EDU}/kurse/masterclass-2-0`, permanent: true },

  // --- Shop und Konto: gehoeren nach .education ---
  { source: "/shop", destination: `${EDU}/shop`, permanent: true },
  { source: "/shop/warenkorb", destination: `${EDU}/shop`, permanent: true },
  { source: "/cart", destination: `${EDU}/shop`, permanent: true },
  { source: "/checkout", destination: `${EDU}/shop`, permanent: true },
  { source: "/mein-konto", destination: `${EDU}/dashboard`, permanent: true },
  { source: "/dashboard", destination: `${EDU}/dashboard`, permanent: true },
  { source: "/produkt/:slug*", destination: `${EDU}/shop`, permanent: true,
    note: "OFFEN: Merch (u.a. handgemachte-holz-ohrstecker). Wenn Merch bleibt, "
        + "muss je Artikel auf /shop/<slug> gemappt werden statt pauschal." },

  // --- Rechtsseiten: Shop und Checkout liegen auf .education, also auch das
  //     Shoprecht. Impressum und Datenschutz bleiben auf BEIDEN Domains eigen. ---
  { source: "/agb", destination: `${EDU}/agb`, permanent: true },
  { source: "/widerrufsbelehrung", destination: `${EDU}/widerrufsbelehrung`, permanent: true },
  { source: "/versandarten", destination: `${EDU}/versandarten`, permanent: true },
  { source: "/bezahlmoeglichkeiten", destination: `${EDU}/bezahlmoeglichkeiten`, permanent: true },
  { source: "/echtheit-von-bewertungen", destination: `${EDU}/echtheit-von-bewertungen`, permanent: true },
  { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true,
    note: ".com hat heute beide Seiten. /datenschutz/ ist die kanonische im neuen Seitenbaum." },
];

const EDUCATION_LEGACY = [
  // --- Kurse: Generationen ---
  { source: "/kurse/dental-diversity-masterclass-30", destination: "/kurse/masterclass-3-0", permanent: true },
  { source: "/kurse/dental-diversity-masterclass-2-0", destination: "/kurse/masterclass-2-0", permanent: true },
  { source: "/kurse/dental-diversity-masterclass", destination: "/kurse/masterclass-1-0", permanent: true },

  // --- Konto, Zertifikate, Praxen ---
  { source: "/my-account", destination: "/dashboard", permanent: true },
  { source: "/tutor-uebersicht", destination: "/dashboard", permanent: true },
  { source: "/tutor-zertifikate-3", destination: "/zertifikate", permanent: true },
  { source: "/praxiszugaenge-dental-diversity-masterclass-3-0", destination: "/praxiszugaenge", permanent: true },

  // --- Shop ---
  { source: "/produkt/:slug*", destination: "/shop/:slug*", permanent: true },

  // --- Marketing zieht auf .com ---
  { source: "/about-us", destination: `${COM}/ueber-uns`, permanent: true },
  { source: "/contact", destination: `${COM}/kontakt`, permanent: true },
  { source: "/bio", destination: `${COM}/referentinnen`, permanent: true },
  { source: "/uebersicht", destination: `${COM}/kurse`, permanent: true },
  { source: "/sale-page", destination: `${COM}/kurse/masterclass`, permanent: true },
  { source: "/help-info", destination: `${COM}/faq`, permanent: true },
  { source: "/dental-diversity-masterclass-3-0", destination: `${COM}/kurse/masterclass`, permanent: true },
  { source: "/masterclass-2-0", destination: `${COM}/kurse`, permanent: true,
    note: "2.0 wird nicht mehr verkauft - Uebersicht statt Produktseite" },
  { source: "/wartezimmer-2025", destination: `${COM}/`, permanent: true },
];

export const COM_LEGACY_REDIRECTS = normalize(COM_LEGACY);
export const EDUCATION_LEGACY_REDIRECTS = normalize(EDUCATION_LEGACY);

/** 410 Gone. Bewusst KEIN Redirect: diese URLs hatten nie Inhalt, den jemand
 *  sucht. Ein 301 auf die Startseite waere ein Soft-404 und schadet dem Index. */
export const COM_GONE_PATHS = [
  "/global-styles",
  "/hello-world",
  "/registrierung-fuer-teilnehmer",
  "/anmeldung-fuer-kursleiter",
];

export const EDUCATION_GONE_PATHS = [
  "/tutor-login",
  "/tutor-login-2",
  "/tutor-login-3",
  "/tutor-login-4",
  "/tutor-login-5",
  "/tutor-login-6",
  "/tutor-login-7",
  "/cart-2",
  "/checkout-2",
  "/sample-page",
  "/global-styles",
  "/anmeldung-fuer-kursleiter",
  "/registrierung-fuer-teilnehmer",
  "/dashboard-seite",
  "/hello-world",
];

/** URLs, die heute NICHT aufloesbar sind. Werden hier gefuehrt, damit sie nicht
 *  beim Launch vergessen werden. Jeder Eintrag muss vor dem Launch der
 *  jeweiligen Domain leer sein. */
export const UNRESOLVED = [
  {
    source: "/lektion/*  (.education, ~62 Lektionen)",
    problem:
      "Zielpfad /kurse/<kurs>/<modul>/<lektion>/ laesst sich nicht aus dem alten "
      + "flachen Slug ableiten. Die Tabelle muss beim Datenimport aus Tutor LMS "
      + "erzeugt werden - ein Eintrag pro Lektion. Bis dahin laufen alle "
      + "Lektions-Deeplinks ins Leere.",
  },
  {
    source: "/terms-privacy/  (.education)",
    problem:
      "Im Migrations-Inventar als rechtlich verpflichtend gefuehrt, aber ohne "
      + "erkennbares Gegenstueck im neuen Seitenbaum. Vermutlich englisches "
      + "Duplikat von /datenschutzerklaerung/. Vor dem Launch pruefen.",
  },
  {
    source: "/produkt/handgemachte-holz-ohrstecker/  (.com)",
    problem:
      "Merch. Offene Entscheidung Nr. 5 in Notion. Solange offen, greift der "
      + "pauschale /produkt/:slug* -> /shop. Wenn Merch bleibt, braucht jeder "
      + "der 7 Artikel ein eigenes Ziel.",
  },
];

/** Alle Domains im Strato-Vertrag, gelesen am 01.09.2026 im Kundenmenue
 *  (Paketuebersicht, Auftragsnummer 8711338). Vorher stand im Projekt die
 *  Annahme, es gebe zwei Domains - es sind fuenf.
 *
 *  Das ist keine Weiterleitung im Sinne dieser Datei: Domain-Aliase werden
 *  nicht im Code, sondern im Vercel-Projekt eingetragen. Die Liste steht
 *  trotzdem hier, weil sie zur Umschaltung gehoert und weil eine vergessene
 *  Domain nach dem Umzug still ins Leere laeuft - niemand meldet das, es faellt
 *  nur der Umsatz aus, den sie gebracht haette.
 *
 *  punycode ist die Form, in der die Umlaut-Domains technisch existieren. Wer
 *  sie im DNS oder bei Vercel eintraegt, braucht diese Schreibweise.
 *
 *  OFFEN: die Fussleiste auf .com verlinkt die Datenschutzerklaerung auf
 *  "zahngefluester.de" - ausgeschrieben. Diese Domain steht NICHT in der Liste.
 *  Entweder ist der Link ein Tippfehler und meint die Umlaut-Variante, oder er
 *  zeigt auf eine fremde Domain. Ungeprueft, weil aus dieser Sitzung keine der
 *  Seiten erreichbar war. Dieselbe Schreibweise taucht in Notion als
 *  Kontaktadresse info@zahngefluester.de auf - der Punkt haengt also an mehr
 *  als einem Link. */
export const DOMAINS = [
  {
    domain: "zahngefluester.com",
    punycode: "zahngefluester.com",
    rolle: "Hauptadresse Marketing",
    ziel: "Vercel-Projekt marketing (primaer)",
  },
  {
    domain: "zahngefluester.education",
    punycode: "zahngefluester.education",
    rolle: "Shop, Kurse, Konten",
    ziel: "Vercel-Projekt education (primaer)",
  },
  {
    domain: "zahngeflüster.com",
    punycode: "xn--zahngeflster-klb.com",
    rolle: "Umlaut-Variante",
    ziel: "301 auf zahngefluester.com",
  },
  {
    domain: "zahngeflüster.de",
    punycode: "xn--zahngeflster-klb.de",
    rolle: "Umlaut-Variante, aeltere Hauptadresse",
    ziel: "301 auf zahngefluester.com",
  },
  {
    domain: "zahngeflüster.info",
    punycode: "xn--zahngeflster-klb.info",
    rolle: "Umlaut-Variante",
    ziel: "301 auf zahngefluester.com",
  },
];
