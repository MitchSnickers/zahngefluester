/** Haeufige Fragen.
 *
 *  QUELLE: Notion, "Zahngeflüster / Kundenservice / FAQ" (Stand dort
 *  10.04.2026). Antworten uebernommen, nicht formuliert. Drei Antworten
 *  fehlen dort ebenfalls - die tragen weiterhin PLATZHALTER und sperren
 *  den Launch.
 *
 *  ABWEICHUNG ZUR QUELLE, bewusst:
 *  1. Die Notion-FAQ nennt vier Kurse, darunter "Meet & Learn 2026". Das
 *     Event steht hier nicht, solange seine Durchfuehrung ungeklaert ist -
 *     Begruendung in kurse.ts unter nichtBeworben.
 *  2. Die Notion-FAQ nennt als Kontakt info@zahngefluester.de. Das Impressum
 *     der Live-Seite nennt die Adresse aus site.email (.com). Hier steht
 *     site.email, damit FAQ und Impressum nicht auseinanderlaufen. Welche
 *     der beiden gilt, muessen Jasmin und Lina sagen - die ausgeschriebene
 *     .de-Domain steht nicht in ihrem Strato-Vertrag, dort liegt die
 *     Umlaut-Variante. Eine Mailadresse auf einer fremden Domain waere ein
 *     ernstes Problem, kein Schoenheitsfehler. */
import { site } from "./site";

export type FaqEintrag = { kategorie: string; q: string; a: string };

export const faq: FaqEintrag[] = [
  {
    kategorie: "Allgemein",
    q: "Was ist Zahngeflüster?",
    a:
      "Zahngeflüster ist eine Fortbildungsplattform für zahnmedizinische Fachkräfte, gegründet " +
      "von Jasmin Matthes (Dentalhygienikerin) und Dr. Lina Dinse (Zahnärztin). Wir bieten " +
      "praxisnahe Online-Kurse, Live-Webinare und Events zu ganzheitlichen Themen der Zahnmedizin.",
  },
  {
    kategorie: "Allgemein",
    q: "An wen richten sich die Angebote?",
    a:
      "Unsere Kurse richten sich an Zahnärzt:innen, Dentalhygieniker:innen (DH), Zahnmedizinische " +
      "Prophylaxeassistent:innen (ZMP) und Zahnmedizinische Fachangestellte (ZFA) – also an alle, " +
      "die in der Zahnmedizin tätig sind und sich weiterbilden möchten.",
  },
  {
    kategorie: "Allgemein",
    q: "Was unterscheidet die Masterclass von anderen Fortbildungen?",
    a:
      "Die Masterclass beleuchtet neben technischen Fertigkeiten auch Gesundheitsfaktoren wie " +
      "Ernährung, hormonelle Einflüsse und Stressmanagement. Jede Einheit wird von renommierten " +
      "Expert:innen mit jahrelanger Praxiserfahrung geleitet. Dazu kommt die flexible " +
      "Online-Plattform und die Community.",
  },

  {
    kategorie: "Kurse und Anmeldung",
    q: "Welche Kurse gibt es?",
    a:
      "Die Dental Diversity Masterclass 3.0 (699 €) als umfassende Online-Weiterbildung, den " +
      "Praxisbuddy (369 €) als kompakte Variante mit ausgewählten Modulen und den " +
      "Basis-Prophylaxe-Kurs (1.800 €) mit Theorie und Praxis. Alle Preise inklusive 19 % " +
      "Mehrwertsteuer.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Wie melde ich mich an?",
    a:
      `Direkt im Shop auf ${site.educationUrl.replace("https://www.", "")}. Kurs auswählen, ` +
      "Bestellvorgang durchlaufen – die Zugangsdaten kommen per E-Mail.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Was ist der Unterschied zwischen der Masterclass und dem Praxisbuddy?",
    a:
      "Die Masterclass 3.0 umfasst alle Module, der Praxisbuddy eine Auswahl daraus. Zertifikat, " +
      "Community-Zugang und die unbegrenzte Laufzeit sind bei beiden gleich. PLATZHALTER: welche " +
      "Module der Praxisbuddy genau enthält, ist noch nicht festgelegt.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Können mehrere Personen aus einer Praxis teilnehmen?",
    a: "PLATZHALTER – Praxiszugänge sind noch nicht geregelt.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Wie viele Fortbildungspunkte bekomme ich?",
    a:
      "PLATZHALTER – noch nicht belegt. Eine frühere Fassung nannte hier 10 Punkte nach " +
      "BZÄK/DGZMK; diese Zahl war nicht gesichert und steht deshalb nicht mehr da.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Kann ich auch per Rechnung zahlen?",
    a: `Schreib uns an ${site.email} – wir finden eine passende Lösung.`,
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Gibt es Ratenzahlung?",
    a: "Sprich uns an, dann besprechen wir individuelle Zahlungsoptionen.",
  },
  {
    kategorie: "Kurse und Anmeldung",
    q: "Kann ich meine Buchung widerrufen?",
    a:
      "Ja, im gesetzlichen Rahmen. Die Widerrufsbelehrung gehört zum Shop und liegt deshalb auf " +
      "zahngefluester.education; sie ist im Fußbereich jeder Seite verlinkt.",
  },

  {
    kategorie: "Lernplattform und Zugang",
    q: "Muss ich bei den Webinaren live dabei sein?",
    a:
      "Nein. Die Webinare sind aufgezeichnet und jederzeit abrufbar – du lernst in deinem eigenen " +
      "Tempo, wann und wo es dir passt.",
  },
  {
    kategorie: "Lernplattform und Zugang",
    q: "Wie lange habe ich Zugang zu den Kursinhalten?",
    a:
      "Nach dem Kauf zeitlich unbegrenzt. Du kannst die Videos und Materialien so oft anschauen, " +
      "wie du möchtest.",
  },
  {
    kategorie: "Lernplattform und Zugang",
    q: "Kann ich die Kurse auch auf dem Smartphone anschauen?",
    a: "Ja. Die Lernplattform ist für Smartphone, Tablet und Desktop ausgelegt.",
  },
  {
    kategorie: "Lernplattform und Zugang",
    q: "Mein Login funktioniert nicht – was tun?",
    a:
      "Klick auf der Anmeldeseite auf „Passwort vergessen“ und folge den Anweisungen. Sieh auch im " +
      `Spam-Ordner nach. Wenn es dann noch klemmt, schreib uns an ${site.email}.`,
  },
  {
    kategorie: "Lernplattform und Zugang",
    q: "Ich habe nach dem Kauf keine Zugangsdaten erhalten.",
    a:
      "Bitte sieh zuerst im Spam-Ordner nach. Ist dort nichts, melde dich bei uns – wir senden die " +
      "Daten erneut zu.",
  },

  {
    kategorie: "Zertifikat und Community",
    q: "Erhalte ich ein Zertifikat?",
    a:
      "Ja. Nach Abschluss aller Module erhältst du ein Zertifikat, das deine Teilnahme bestätigt. " +
      "Es lässt sich digital nutzen oder ausdrucken.",
  },
  {
    kategorie: "Zertifikat und Community",
    q: "Gibt es eine Community?",
    a:
      "Ja. Als Teilnehmerin oder Teilnehmer bekommst du Zugang zu unserer Community, in der du " +
      "dich mit anderen Fachkräften austauschen kannst.",
  },
];

/** Reihenfolge der Abschnitte auf der Seite. */
export const faqKategorien = [
  "Allgemein",
  "Kurse und Anmeldung",
  "Lernplattform und Zugang",
  "Zertifikat und Community",
] as const;
