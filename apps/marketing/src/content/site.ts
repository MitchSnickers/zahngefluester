/** Zentrale Stammdaten der Marketing-Seite.
 *  PLATZHALTER: alles mit TODO muss vor dem Launch von Jasmin/Lina bestaetigt sein. */
export const site = {
  name: "Zahngeflüster",
  tagline: "Fortbildung für Dentalhygiene",
  /* Wortgleich von der Live-Startseite uebernommen. Meine erste Fassung war
     erfunden - diese ist ihre. */
  claim: "Mit Wissen zum Strahlen",
  /* Der erste Satz der Live-Einleitung, wortgleich herausgeloest. NN/g:
     Wichtiges ohne Scrollen sichtbar - vier Saetze Fliesstext ueber der Falz
     sind keine Aussage, sondern eine Huerde. Der Rest steht weiter unten,
     nicht gestrichen und nicht umformuliert. */
  introKurz: "Deine Plattform für Wissen aus der Dentalwelt.",
  /* Der Rest derselben Einleitung, ebenfalls wortgleich. Er steht unter dem
     Kopfbereich statt darin - getrennt, nicht gekuerzt. */
  introRest:
    "Unser Ziel ist es, gemeinsam mit dir und " +
    "unserer Leidenschaft für Innovationen in der ganzheitlichen Zahnmedizin zu entdecken, zu " +
    "verstehen und zu lernen. Es erwarten dich spannende Themen in unseren Online-Webinaren und " +
    "Kursen. Wir freuen uns darauf, dich begrüßen zu dürfen.",
  url: "https://www.zahngefluester.com",
  educationUrl: "https://www.zahngefluester.education",
  email: "info@zahngefluester.com",
  phone: "+49 8441 9087405",
  /* Wortgleich aus dem Live-Impressum von www.zahngefluester.com uebernommen,
     Stand der Seite dort: 20.11.2024. Nicht umformuliert. */
  legalName: "Zahngeflüster by Jasmin Matthes & Dr. Lina Dinse GbR",
  address: { line1: "Gritschstraße 59", line2: "85276 Pfaffenhofen an der Ilm", country: "Deutschland" },
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
