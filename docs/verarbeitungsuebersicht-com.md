# Verarbeitungsübersicht — zahngefluester.com (Neubau)

Stand: 01.09.2026. Erhoben aus dem Quellcode, nicht geschätzt.

**Wozu diese Seite.** Sie ist keine Datenschutzerklärung und ersetzt keine.
Sie listet auf, was die neue Marketing-Seite technisch tatsächlich tut — als
Grundlage für die Person, die die Erklärung juristisch verantwortet. Wer den
Text schreibt, braucht genau diese Angaben und kann sie sonst nur raten.

## Warum die Erklärung von .education hier nicht passt

Auf zahngefluester.education liegt eine ausführliche Datenschutzerklärung
(rund 53.000 Zeichen, Stand 25.08.2024). Sie beschreibt Shop, Zahlungs-
dienstleister, Nutzerkonten und Kursfortschritt.

**Nichts davon findet auf der neuen .com statt.** Eine Erklärung, die
Verarbeitungen beschreibt, die es nicht gibt, ist genauso falsch wie keine —
sie behauptet Datenflüsse, die nicht existieren, und verdeckt damit die
wenigen, die es gibt. Die .com braucht einen eigenen, kurzen Text.

## Was die Seite tut

| Vorgang | Daten | Anmerkung |
|---|---|---|
| Auslieferung der Seiten | IP-Adresse, Zeitpunkt, angeforderte URL, User-Agent, Referrer | Serverprotokolle des Hosters. Der einzige unvermeidbare Vorgang. |
| Schriftarten | keine | System-Schriftstack, kein externer Abruf. Falls später eine Hausschrift kommt: `next/font` bettet zur Bauzeit ein, es geht **kein** Request vom Besucherbrowser zu Google. |
| Bilder | keine externen | Alles wird mitausgeliefert, keine fremden CDNs. |
| Cookies | keine | Die Seite setzt keine. Kein Login, keine Sitzung, kein Warenkorb. |
| Analyse, Statistik | keine | Aktuell nicht eingebaut. Kommt eines dazu, ändert das die Erklärung. |
| Formulare | keine | Kontakt läuft über eine E-Mail-Adresse, kein Formular. |
| Newsletter | keiner | Der Abschnitt auf der Startseite ist bewusst nicht verdrahtet. |
| Einbettungen | keine | Keine Karten, keine Videos, keine Social-Plugins. |

## Wer beteiligt ist

**Hosting: Vercel.** Die Seiten und die Serverprotokolle liegen dort. Zu klären
von der Person, die die Erklärung verantwortet:

- Auftragsverarbeitungsvertrag mit Vercel abschließen
- Region festlegen — Vercel erlaubt die Auslieferung aus EU-Regionen
- Aufbewahrungsdauer der Protokolle erfragen

**Weiterleitungen zu zahngefluester.education.** Jeder Kaufweg und der Login
verlassen die Domain per Link. Ab dort gilt die dortige Erklärung. Ein Hinweis
darauf gehört in den Text.

## Was den Text ändern würde

Diese drei Punkte stehen auf der Wunschliste und sind bewusst noch nicht
gebaut. Jeder einzelne macht die Erklärung länger:

1. **Kontaktformular** — nimmt personenbezogene Daten entgegen, braucht
   Rechtsgrundlage, Empfänger und Löschfrist
2. **Newsletter** — Double-Opt-in über Resend, Protokollierung der Anmeldung,
   Auftragsverarbeitung mit Resend
3. **Reichweitenmessung** — je nach Werkzeug einwilligungspflichtig, dann auch
   ein Einwilligungsbanner

Solange keiner davon existiert, bleibt die Erklärung kurz. Das ist ein
Argument, .com wirklich statisch zu halten.

## Befund zur heutigen Lage

Erhoben am 01.09.2026 an den Live-Seiten:

- **www.zahngefluester.com/datenschutzerklaerung/** ist leer. Null Zeichen
  Inhalt, auch ausgeloggt; die Seite rendert nur die Navigation.
- **www.zahngefluester.com/datenschutz/** enthält ein Registrierungsformular,
  keine Erklärung.
- Die **Fußzeile** verlinkt die Datenschutzerklärung auf
  `https://www.zahngeflüster.de/datenschutz/` — eine Domain, die nicht auflöst.
- Auf .education sind **echtheit-von-bewertungen** und **versandarten**
  ebenfalls leer (null Zeichen). Beides sind Pflichtangaben für einen Shop.

Das ist ein Befund, keine rechtliche Bewertung. Er betrifft die **Altplattform**
und besteht unabhängig vom Neubau — er wird nicht dadurch behoben, dass die
neue Seite es besser macht.
