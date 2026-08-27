/** Zentrale Stammdaten der Marketing-Seite.
 *  PLATZHALTER: alles mit TODO muss vor dem Launch von Jasmin/Lina bestaetigt sein. */
export const site = {
  name: "Zahngeflüster",
  tagline: "Fortbildung für Dentalhygiene",
  // TODO: von Jasmin/Lina bestaetigen lassen
  claim: "Fundierte Fortbildung für die Prophylaxe – von Praktikerinnen für Praktikerinnen.",
  url: "https://www.zahngefluester.com",
  educationUrl: "https://www.zahngefluester.education",
  email: "info@zahngefluester.com", // TODO pruefen
  // TODO: ladungsfaehige Anschrift. Fehlt heute in der Widerrufsbelehrung -> abmahnfaehig.
  address: { line1: "TODO Straße Nr.", line2: "TODO PLZ Ort", country: "Deutschland" },
} as const;

export const nav = [
  { href: "/", label: "Start" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/referentinnen/", label: "Referentinnen" },
  { href: "/kurse/", label: "Kurse" },
  { href: "/praxen/", label: "Praxen" },
  { href: "/faq/", label: "FAQ" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

export const footerLegal = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
  // Shoprecht liegt auf .education, weil Shop und Checkout dort liegen.
  { href: `${site.educationUrl}/agb/`, label: "AGB", external: true },
  { href: `${site.educationUrl}/widerrufsbelehrung/`, label: "Widerrufsbelehrung", external: true },
] as const;
