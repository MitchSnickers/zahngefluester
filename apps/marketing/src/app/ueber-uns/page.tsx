import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { referentinnen } from "@/content/referentinnen";

export const metadata: Metadata = { title: "Über uns" };

/** Beide Absaetze wortgleich von der Live-Seite /about-us/ uebernommen
 *  (Stand 01.09.2026). Nicht umformuliert.
 *
 *  OFFEN, bewusst nicht selbst entschieden: Die Altseite wechselt zwischen
 *  "du" und "ihr" - auf der Startseite "gemeinsam mit dir", hier "eure Partner".
 *  Eine Anrede durchzuhalten waere besser, aber welche, entscheiden die
 *  Kundinnen. Bis dahin steht beides so da, wie sie es geschrieben haben. */
const absaetze = [
  "Wir sind mehr als nur ein Anbieter von Fortbildungen – wir sind eure Partner, Mentoren und " +
    "Unterstützer auf dem Weg zu einer erfolgreichen Karriere in der Dentalwelt. Mit Leidenschaft " +
    "und Expertise bieten wir praxisnahe Onlinekurse, die euch dabei helfen, eure Fähigkeiten zu " +
    "erweitern, neue Perspektiven zu entdecken und euer berufliches Potenzial voll auszuschöpfen. " +
    "Unser Ziel? Euch auf Augenhöhe zu begegnen, komplexe Themen verständlich zu machen und dabei " +
    "immer den Spaß am Lernen im Fokus zu behalten. Denn wir glauben: Weiterentwicklung muss nicht " +
    "trocken sein – sie darf inspirieren, begeistern und motivieren. Lass uns gemeinsam die " +
    "Dentalwelt ein Stück besser machen – Schritt für Schritt und mit viel Herzblut.",
  "Zahngeflüster ist nicht nur unser Herzensprojekt, sondern die Verwirklichung einer Vision, die " +
    "wir, Jasmin und Lina, mit Leidenschaft verfolgen. Mit unserer langjährigen Erfahrung im " +
    "Dentalbereich, kombiniert mit einer Prise Humor und viel Einfühlungsvermögen, möchten wir " +
    "euch nicht nur weiterbilden, sondern auch inspirieren. Was uns antreibt? Unsere Liebe zur " +
    "Dentalwelt und der Wunsch, Wissen auf eine Art zu vermitteln, die euch wirklich weiterbringt " +
    "– authentisch, nahbar und immer am Puls der Zeit. Wir freuen uns darauf, euch auf eurem Weg " +
    "zu begleiten und gemeinsam mit euch das Beste aus euren beruflichen Möglichkeiten zu machen!",
];

export default function UeberUns() {
  const gruenderinnen = referentinnen.filter((r) => r.founder);

  return (
    <>
      <PageHeader
        kicker="Über uns"
        title="Wir sind Jasmin und Lina."
        lead="Die Köpfe und Herzen hinter Zahngeflüster."
      />
      <Container className="py-14">
        <div className="max-w-2xl space-y-6">
          {absaetze.map((t) => (
            <p key={t.slice(0, 40)} className="leading-relaxed text-ink-muted">
              {t}
            </p>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Die Gründerinnen</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {gruenderinnen.map((g) => (
              <Link
                key={g.slug}
                href={`/referentinnen/${g.slug}/`}
                className="rounded-lg border border-line bg-white p-6 transition-colors hover:border-brand"
              >
                <p className="font-medium">{g.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{g.role}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink-muted">{g.bio}</p>
                <p className="mt-3 text-sm text-brand">Mehr über {g.shortName ?? g.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
