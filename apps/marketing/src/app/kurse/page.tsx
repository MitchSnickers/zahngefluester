import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { archivierteGenerationen, kurse } from "@/content/kurse";

export const metadata: Metadata = { title: "Kurse" };

export default function KursUebersicht() {
  return (
    <>
      <PageHeader
        kicker="Kurse"
        title="Wissen, das sitzt."
        lead="Für alle, die in der Zahnmedizin den Unterschied machen wollen. Unsere Kurse und Masterclasses sind praxisnah, evidenzbasiert und von führenden Expert:innen der Dentalbranche entwickelt. Gebucht und besucht wird auf zahngefluester.education."
      />
      <Container className="py-14">
        <ul className="space-y-4">
          {kurse.map((k) => (
            <li key={k.slug}>
              <Link
                href={`/kurse/${k.slug}/`}
                className="flex flex-col gap-2 rounded-lg border border-line bg-white p-6 transition-colors hover:border-brand sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-brand">{k.kicker}</p>
                  <h2 className="mt-1 text-lg font-semibold">{k.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{k.format}</p>
                </div>
                <p className="shrink-0 text-base font-medium">{k.price}</p>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-14 rounded-lg border border-line bg-surface-alt p-6">
          <h2 className="text-lg font-semibold tracking-tight">Frühere Generationen</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Diese Masterclass-Generationen werden nicht mehr verkauft. Wer sie gekauft hat,
            behält den Zugang dauerhaft – der Login liegt auf zahngefluester.education.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-ink-muted">
            {archivierteGenerationen.map((g) => (
              <li key={g.title}>{g.title} · {g.lektionen} Lektionen</li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
