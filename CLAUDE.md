# CLAUDE.md — Betriebs- und Arbeitsregeln

Diese Datei gilt für jede Session in diesem Repository, für Mensch und Modell.
Sie ist kein Stilleitfaden. Sie steht hier, weil im August 2026 auf der
Altplattform Kundendaten verloren gegangen sind und niemand es wochenlang
gemerkt hat.

Der Projektstand liegt in Notion unter **Zahngeflüster → Projektplan
Website-Relaunch**. Maßgeblich sind dort: *Architektur Neubau*,
*Zukunftsstrategie & Betriebsplan* (Revisionsblock oben zuerst lesen),
*Migrations-Inventar*.

---

## 1. Kontext in zwei Sätzen

Zahngeflüster ist eine Fortbildungsplattform für Dentalhygiene, betrieben von
Jasmin Matthes und Dr. Lina Dinse. Zwei Domains: **zahngefluester.com**
(Marketing, statisch, kein Login) und **zahngefluester.education** (Shop,
Kurse, Konten). Die Altplattform läuft auf WordPress und wird nur noch minimal
gepflegt.

Die Arbeit passiert abends neben einer Vollzeitstelle. Vorschläge, die eine
durchgearbeitete Woche brauchen, sind keine Vorschläge, sondern Blockaden.
Wenn etwas zu groß ist für diese Kadenz: sagen, nicht anfangen.

---

## 2. Produktivdaten

Produktivdaten sind: die WordPress-Datenbanken der Altplattform, die
Supabase-Produktivinstanz, Stripe im Live-Modus, Vimeo, die Postfächer der
Kundinnen.

### 2.1 Kein Schreibzugriff ohne Manifest und Rollback

Vor **jeder** schreibenden Operation auf Produktivdaten liegen zwei Dinge vor,
schriftlich, im Repository unter `ops/manifeste/<datum>-<vorgang>/`:

1. **Manifest** — welche Tabellen, welche Zeilen, welche vergebenen
   Primärschlüssel. Bei Inserts der reservierte ID-Bereich. Bei Updates die
   vollständige Vorher-Fassung der betroffenen Zeilen.
2. **Rollback** — ausführbares SQL beziehungsweise Skript, das exakt diesen
   Vorgang rückgängig macht. Nicht beschrieben, sondern erzeugt und abgelegt.

Ohne beides wird nicht geschrieben. Auch nicht „nur schnell", auch nicht bei
einer einzigen Zeile.

### 2.2 Transaktionen

Jeder Import läuft in `START TRANSACTION` / `COMMIT`. Ein Abbruch mittendrin
muss folgenlos bleiben. Kein Skript, das auf halbem Weg einen Zustand
hinterlässt, den niemand benennen kann.

### 2.3 Assertions vor und nach jeder Datenoperation

**Harte Assertions** (Abbruch bei Verletzung) für Struktur: Existenz der
Tabelle, Spaltennamen und Typen, Fremdschlüsselziele, Eindeutigkeit,
Zeilenanzahl vorher.

**Weiche Assertions** (Warnung, protokollieren, Mensch entscheidet) für Summen
und Beträge: Umsatzsummen, Anzahl Bestellungen, Anzahl Enrollments. Weich, weil
eine abweichende Summe genauso gut eine echte Änderung sein kann.

Nach der Operation laufen dieselben Prüfungen erneut, gegen die erwarteten
Zielwerte. Erwartet heißt: vorher aufgeschrieben, nicht nachträglich begründet.

### 2.4 Sichtprüfung an vorher benannten Stellen

Vor der Operation wird eine Liste konkreter Prüfpunkte notiert — konkrete URLs,
konkrete Datensätze, konkrete Nutzerinnen. Nach der Operation wird genau diese
Liste abgearbeitet. „Mal durchklicken" ist keine Prüfung, weil es keinen Befund
erzeugt, der falsch sein kann.

### 2.5 Keine Kundendaten löschen

Nutzerkonten, Bestellungen, Enrollments, Lernfortschritt, Zertifikate,
Praxis-Kontingente werden **nicht gelöscht**. Auch keine offensichtlichen
Dubletten, auch keine Bot-Registrierungen. Stattdessen markieren und der Kundin
zur Freigabe vorlegen. Löschung erfolgt erst nach ausdrücklicher Freigabe, mit
Manifest und Rollback wie oben.

### 2.6 Dateitransfers verifizieren

Nach jedem Transfer auf einen Server: SHA256 beider Seiten vergleichen. `scp`
ist auf Strato defekt, Transfer läuft über `cat | ssh`. Ein Transfer ohne
Prüfsummenvergleich gilt als nicht erfolgt.

### 2.7 Zugangsdaten

Keine Zugangsdaten, Tokens oder Verbindungsstrings im Repository — auch nicht
in Kommentaren, Beispieldateien oder Commit-Nachrichten. Alles in den
Passwortmanager. `.env.example` enthält Namen, niemals Werte.

---

## 3. Regeln für die Entwicklung

### 3.1 Die Domaintrennung ist eine Sicherheitsgrenze

**zahngefluester.com kennt keine Nutzerinnen.** Kein Login, keine Session, kein
Cookie mit Personenbezug, keine Datenbankverbindung, keine Formularannahme.
Jeder Kaufweg und jeder Login verlässt die Domain per Link — in
`apps/marketing` ist `CtaLink` die einzige Stelle, an der das passiert, damit
man per Suche belegen kann, dass es so ist.

Wenn ein Feature das aufweichen will, ist das eine Architekturentscheidung und
gehört vorher besprochen, nicht in einen Pull Request.

### 3.2 Stack — was drin ist und was bewusst nicht

Drin: **Next.js, Supabase (DB + Auth), Stripe, Vimeo, Resend.**

Bewusst nicht: Astro, Turborepo, Sanity, Clerk, Cloudflare Stream.

Der Grund ist nicht Geschmack. Jeder zusätzliche Dienst ist eine
Synchronisationsgrenze — eine Stelle, an der zwei Systeme still auseinander
laufen können. Fünf Teile für drei Kurse und rund hundert Nutzerinnen ist die
Obergrenze. Ein neuer Dienst braucht eine Begründung, die über „ist besser"
hinausgeht.

Achtung beim Lesen: die Stack-Tabelle in *Zukunftsstrategie* Abschnitt 4 nennt
noch Cloudflare Stream. Der Revisionsblock oben auf derselben Seite zieht das
zurück. **Vimeo bleibt.**

### 3.3 Repository-Struktur

```
apps/marketing     → zahngefluester.com        (Vercel-Projekt 1, Root Directory: apps/marketing)
apps/education     → zahngefluester.education  (Vercel-Projekt 2, noch leer)
packages/redirects → URL-Mapping alt → neu, von beiden Apps genutzt
```

npm-Workspaces, sonst nichts. Kein Turborepo, kein Nx, kein Build-Orchestrator.
Gemeinsamer Code entsteht erst, wenn er tatsächlich doppelt existiert — nicht
vorsorglich.

### 3.4 Weiterleitungen

`packages/redirects` ist die **einzige** Quelle für Weiterleitungen. Es wird
nichts direkt in eine `next.config.ts` geschrieben und nichts in der
Vercel-Oberfläche geklickt. Was in der Oberfläche steht, steht in keinem Diff.

Zeilen werden nicht gelöscht, sondern mit Begründung ersetzt. Die Liste
`UNRESOLVED` muss vor dem Launch der jeweiligen Domain leer sein.

### 3.5 Platzhalter müssen sichtbar sein

Unfertige Inhalte laufen über die `Placeholder`-Komponente. Vor einem Launch:

```
npm run launch-check
```

muss ohne Befund durchlaufen. Erst danach fällt `robots: noindex` in
`app/layout.tsx` und `app/robots.ts` — beides sind bewusste Schalter, die
zusammen umgelegt werden, und das Skript meldet den Widerspruch, wenn jemand
sie zu früh umlegt.

**Warum ein Skript und keine Suche nach dem Wort.** Die ursprüngliche Regel hier
lautete: `rg -i "platzhalter|TODO"` muss leer sein. Am 01.09.2026 stellte sich
heraus, dass sie eine blinde Stelle hat — Impressum, Datenschutz, Kontakt und
die fünfzehn Referentinnen-Seiten tragen unfertige Kästen, in deren Text das
Wort gar nicht vorkommt. Ausgerechnet die rechtlich heiklen Seiten wären als
fertig durchgegangen. Verlässlich ist die Komponente, nicht das Wort.

**Und Platzhalter müssen von selbst verschwinden.** Wenn echte Inhalte in
`src/content/` eintreffen, soll die Seite sie zeigen, ohne dass jemand zusätzlich
eine Komponente umbaut. Beispiel: `referentinnen.ts` hatte ein `bio`-Feld, das
nirgends gerendert wurde — wer es gefüllt hätte, hätte auf der Seite keine
Änderung gesehen. Bei jedem neuen Platzhalter prüfen: Wo kommt der echte Inhalt
her, und erscheint er automatisch, sobald er da ist?

### 3.6 Rechtstexte werden nicht formuliert

Impressum, Datenschutzerklärung, AGB, Widerrufsbelehrung werden 1:1 aus der
geprüften Fassung übernommen. Nicht neu geschrieben, nicht aus Bausteinen
zusammengesetzt, nicht „modernisiert". Offene Punkte werden markiert und der
Kundin vorgelegt.

Bekannter offener Punkt: die Widerrufsadresse enthält heute nur einen
Domain-String statt einer ladungsfähigen Anschrift. Abmahnfähig, muss vor dem
Launch korrigiert sein.

### 3.7 Vor dem Commit

`npm run build:marketing` muss durchlaufen. Ein Commit, der den Build bricht,
kostet abends eine halbe Session zum Wiederfinden.

---

## 4. Wie in diesem Repository gearbeitet wird

**Erst lesen, dann vorschlagen.** Die Notion-Seiten sind der Stand. Wenn ein
Vorschlag ihnen widerspricht, wird der Widerspruch benannt, nicht stillschweigend
aufgelöst.

**Widersprüche melden statt auflösen.** In dieser Dokumentation haben sich schon
Seiten gegenseitig widersprochen — beim Dateisystem, bei der Nutzerzahl (15
gegen 17), bei der Frage, ob die Masterclass 3.0 je existierte. Wer einen
Widerspruch findet, meldet ihn. Er wird nicht nach Bauchgefühl entschieden.

**Bei Folgen für Architektur oder Kundendaten: vorher einschätzen, was
schiefgehen kann.** Nicht als Formalie, sondern konkret: was genau bricht, wie
merkt man es, wie kommt man zurück.

**Aufwand ehrlich schätzen.** Die Referenz ist die Abendkadenz, nicht ein
Arbeitstag. Zeitschätzungen aus früheren Planungen gingen von Vollzeit aus und
sind mit Faktor drei bis vier zu lesen.

**Am Ende einer Session** geht ein kurzer Stand nach Notion — was gebaut wurde,
was offen ist, was als Nächstes ansteht. Vorfallseiten sind append-only mit
Datum und werden nie rückwirkend editiert.
