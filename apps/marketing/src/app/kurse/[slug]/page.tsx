import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CtaLink } from "@/components/CtaLink";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { kurse } from "@/content/kurse";

/** Produktseiten als eine Vorlage, nicht als drei handgeschriebene Seiten -
 *  passend zum Schablonen-Gedanken aus der Architekturseite.
 *  Abschnitte erscheinen nur, wenn es dafuer Inhalt gibt. Ein leerer
 *  Abschnitt mit Platzhalterkasten war die alte Loesung; er sagte auf allen
 *  drei Seiten dasselbe und half niemandem. */
export function generateStaticParams() {
  return kurse.map((k) => ({ slug: k.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = kurse.find((x) => x.slug === slug);
  return { title: k ? k.title : "Kurs" };
}

export default async function Produktseite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kurs = kurse.find((k) => k.slug === slug);
  if (!kurs) notFound();

  return (
    <>
      <PageHeader kicker={kurs.kicker} title={kurs.title} lead={kurs.summary} />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          {/* Auf schmalen Schirmen steht der Preis oben: wer kaufen will, soll
              nicht erst an drei Inhaltsabschnitten vorbeiscrollen muessen. */}
          <div className="order-2 space-y-10 lg:order-1">
            {kurs.module && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Themen und Module</h2>
                <ul className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                  {kurs.module.map((m) => (
                    <li
                      key={m.titel}
                      className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="text-sm leading-snug">{m.titel}</span>
                      <span className="shrink-0 text-xs text-ink-muted">{m.referentin}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {kurs.enthalten && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Was enthalten ist</h2>
                <ul className="mt-4 space-y-2">
                  {kurs.enthalten.map((e) => (
                    <li key={e} className="flex gap-3 text-sm leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {e}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {kurs.zielgruppe && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Für wen</h2>
                <ul className="mt-4 space-y-2">
                  {kurs.zielgruppe.map((z) => (
                    <li key={z} className="flex gap-3 text-sm leading-relaxed">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {z}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {kurs.merkmale && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Das macht uns besonders</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {kurs.merkmale.map((m) => (
                    <div key={m.titel} className="rounded-lg border border-line bg-surface-alt p-5">
                      <h3 className="text-sm font-semibold">{m.titel}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{m.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {kurs.stimmen && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Stimmen von Teilnehmerinnen</h2>
                <div className="mt-4 space-y-4">
                  {kurs.stimmen.map((s) => (
                    <figure key={s.person} className="rounded-lg border-l-2 border-brand bg-surface-alt py-4 pl-5 pr-6">
                      <blockquote className="text-sm leading-relaxed">„{s.text}“</blockquote>
                      <figcaption className="mt-2 text-xs text-ink-muted">{s.person}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {kurs.hinweis && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight">Offen vor dem Launch</h2>
                <div className="mt-3">
                  <Placeholder>{kurs.hinweis}</Placeholder>
                </div>
              </section>
            )}
          </div>

          <aside className="order-1 h-fit rounded-lg border border-line bg-surface-alt p-6 lg:order-2 lg:sticky lg:top-24">
            <p className="text-2xl font-semibold">{kurs.price}</p>
            <p className="mt-1 text-xs text-ink-muted">inkl. 19 % MwSt.</p>
            <p className="mt-3 text-sm text-ink-muted">{kurs.format}</p>
            {kurs.cePoints !== null && (
              <p className="mt-2 text-sm text-ink-muted">{kurs.cePoints} Fortbildungspunkte</p>
            )}
            <div className="mt-5">
              <CtaLink href={kurs.checkoutUrl}>
                {kurs.status === "auf-anfrage" ? "Anfragen" : "Zur Buchung"}
              </CtaLink>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Buchung und Konto laufen auf zahngefluester.education.
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
