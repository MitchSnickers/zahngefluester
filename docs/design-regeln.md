# Design- und Usability-Regeln

Recherchiert am 01.09.2026. Diese Seite ist die Grundlage für
Gestaltungsentscheidungen im Neubau — damit die nächste Sitzung nicht wieder
bei „was ist eigentlich gutes Design" anfängt und damit Entscheidungen
begründbar bleiben statt Geschmackssache zu sein.

**Vorbemerkung, damit die Liste richtig gelesen wird:** Ein großer Teil dessen,
was als modernes Webdesign verkauft wird, ist Mode und in zwei Jahren peinlich.
Belastbar ist ein deutlich kleinerer Kern. Nur der steht hier. Was Geschmack
ist, ist als Geschmack gekennzeichnet.

---

## 1. Startseite (Nielsen Norman Group)

Aus 113 Regeln, die aus Usability-Tests abgeleitet sind, nicht aus Meinungen.

| Regel | Stand bei uns |
|---|---|
| Name und Tagline oben links, prägnant | erfüllt |
| Ein bis vier Kernaufgaben sichtbar, nicht alles gleich wichtig | **offen** — alle Abschnitte gleich laut |
| Zeigen statt beschreiben: konkrete Beispiele, echte Menschen | **offen** — Kopfbereich ohne Gesichter, dabei liegen 15 Porträts im Repo |
| Keine generischen Stockfotos | erfüllt (es gibt gar keine) |
| Grafik nur, wenn sie etwas aussagt; Dekoration schadet | Grundsatz für alles Weitere |
| Keine Versalien für längere Texte | erfüllt, seit die Referentinnen-Funktionen umgestellt wurden |
| Wichtiges ohne Scrollen sichtbar | **offen** — vier Sätze Fließtext über der Falz |
| Kundensprache statt Firmenstruktur | erfüllt (Navigation nach Nutzersicht benannt) |
| Impressum, Kontakt, Datenschutz erreichbar | erfüllt, Datenschutz inhaltlich offen |

## 2. Ladeverhalten (Core Web Vitals)

Gemessen am **75. Perzentil**, mobil und Desktop getrennt. Ein guter Wert auf
dem eigenen Rechner sagt nichts.

| Metrik | Schwelle „gut" | Was das für uns heißt |
|---|---|---|
| LCP (größtes Element sichtbar) | ≤ 2,5 s | Ein Bild im Kopfbereich wird das LCP-Element. Es braucht `priority` und korrekte `sizes`, sonst kippt der Wert. |
| INP (Reaktion auf Eingabe) | ≤ 200 ms | Unkritisch, solange die Seite statisch bleibt. Wird relevant, sobald Formulare dazukommen. |
| CLS (Layoutsprünge) | ≤ 0,1 | Deshalb hat `Portrait` ein festes Seitenverhältnis. Jedes neue Bild braucht das auch. |

## 3. Barrierefreiheit (WCAG 2.2, Stufe AA)

Kontrast war schon Thema; neu gegenüber 2.1 und für uns einschlägig:

- **1.4.3 Kontrast:** Text 4,5:1, großer Text 3:1. Erfüllt und nachgemessen —
  deshalb `--color-ink-muted: #736963` statt des Markengraus #928781, das mit
  3,09:1 durchfällt.
- **1.4.11 Non-Text-Kontrast:** Bedienelemente, ihre Zustände und aussagende
  Grafikelemente 3:1 gegen die Nachbarfarbe. **Offen** — unsere Ränder
  (`--color-line: #E8E1D8`) liegen auf Weiß bei etwa 1,3:1. Für reine Zierlinien
  zulässig, für Umrisse von Bedienelementen nicht.
- **2.4.11 Fokus nicht verdeckt:** Der Tastaturfokus darf nicht von klebenden
  Elementen verdeckt werden. **Zu prüfen** — die Preisbox auf den Kursseiten
  ist `sticky`.
- **2.5.8 Zielgröße:** Bedienelemente mindestens 24×24 px. **Zu prüfen** — die
  Textlinks in der Fußzeile und die Kicker-Links.
- Sichtbarer Fokus bleibt. Er wird nicht wegoptimiert, auch wenn er „stört".

## 4. Schrift

**Entscheidung 01.09.2026: Poppins für Überschriften, Inter für Fließtext.**

Das ist keine Geschmacksentscheidung, sondern ein Abgleich mit dem Bestand:
Elementor führt auf der Live-Seite „Inter" als globale Typografie, gerendert
wird aber überwiegend **Poppins** (76 Elemente) und vereinzelt Montserrat. Beide
Schriften sind also bereits ihre — die Live-Seite ist nur in sich uneinig.

Poppins ist geometrisch, rund und freundlich; in längeren Texten aber
anstrengend, weil die Buchstaben zu ähnlich gebaut sind. Inter ist für
Bildschirmtext gemacht. Die Aufteilung nimmt von beiden das, wofür sie taugen.

Eingebettet über `next/font/google`, also zur **Bauzeit**. Vom Browser der
Besucherin geht kein Request an Google — das ist zugleich ein
Datenschutzpunkt, nicht nur ein Performancepunkt.

Montserrat kommt nicht mit. Drei Schriften sind keine Marke, sondern ein Unfall.

## 5. Farbe

Palette steht (siehe `globals.css`, aus den Elementor-Variablen ausgelesen).
Was noch fehlt, ist ihr **Einsatz**: `--color-brand` erscheint bisher nur als
kleiner Akzent in Kicker-Zeilen und Links. Eine Marke entsteht nicht aus
6-Punkt-Text in Markenfarbe.

Regel: **ein** Abschnitt pro Seite darf die Markenfarbe als Fläche tragen. Mehr
wird laut, weniger bleibt blass.

`--color-sand-warm` (#CAB8A2) ist Fläche und Zierrat, niemals Text — als Text
auf Weiß nur 1,93:1.

## 6. Rhythmus — hier ist es Geschmack, und das wird auch so gesagt

Die Seite hat derzeit **einen** Gestaltungsbaustein: weiße Karte, feiner Rand,
abgerundet, 24 px Innenabstand. Auf jeder Seite, für jeden Inhalt. Das ist
ordentlich und vollkommen ereignislos.

Ein Erlebnis entsteht aus Wechsel: Ruhe, dann ein Moment, dann wieder Ruhe. Für
das hier gilt als Arbeitsregel — belegt ist sie nicht, sie ist begründet:

- Abschnitte wechseln zwischen `surface` und `surface-alt`, nicht willkürlich,
  sondern um Themenwechsel zu markieren.
- Nicht jeder Inhalt ist eine Karte. Listen dürfen Listen sein.
- Pro Seite höchstens ein Abschnitt, der sich optisch vordrängt.
- Weißraum ist kein verschenkter Platz. Enge Abstände wirken billig.

## 7. Was Gestaltung nicht lösen kann

Ehrlich an den Anfang jeder Design-Diskussion in diesem Projekt:

**Es gibt kein Markenfoto.** Nur das Logo als 500-px-Rastergrafik. Solange das
so ist, bleibt der Kopfbereich behelfsmäßig, egal wie gut Schrift, Farbe und
Rhythmus sitzen. Zwei Dateien von Jasmin und Lina — ein bis zwei
Querformat-Aufnahmen mit geklärten Rechten und das Logo als Vektor — verändern
den ersten Eindruck mehr als jede Umgestaltung.

Das steht hier, damit es nicht in Vergessenheit gerät und damit niemand später
glaubt, an der Gestaltung sei etwas versäumt worden.

---

**Quellen:**
[113 Design Guidelines for Homepage Usability, Nielsen Norman Group](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/) ·
[Web Vitals, web.dev](https://web.dev/articles/vitals) ·
[Web Content Accessibility Guidelines 2.2, W3C](https://www.w3.org/TR/WCAG22/)
