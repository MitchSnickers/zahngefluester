import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CtaLink } from "@/components/CtaLink";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { kurse } from "@/content/kurse";

/** Produktseiten als eine Vorlage, nicht als drei handgeschriebene Seiten -
 *  passend zum Schablonen-Gedanken aus der Architekturseite. */
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
          <div className="order-2 space-y-8 lg:order-1">
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Inhalte</h2>
              <div className="mt-3"><Placeholder>Modulübersicht – kommt später aus der courses/modules-Tabelle.</Placeholder></div>
            </section>
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Für wen</h2>
              <div className="mt-3"><Placeholder>Zielgruppe und Voraussetzungen.</Placeholder></div>
            </section>
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Ablauf</h2>
              <div className="mt-3"><Placeholder>Live-Termine, Aufzeichnung, Quiz, Zertifikat.</Placeholder></div>
            </section>
          </div>

          <aside className="order-1 h-fit rounded-lg border border-line bg-surface-alt p-6 lg:order-2 lg:sticky lg:top-24">
            <p className="text-2xl font-semibold">{kurs.price}</p>
            <p className="mt-2 text-sm text-ink-muted">{kurs.format}</p>
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
