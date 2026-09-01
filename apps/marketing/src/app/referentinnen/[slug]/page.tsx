import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { referentinBySlug, referentinnen } from "@/content/referentinnen";

/** Eigene Seite je Referentin. Nicht Kosmetik: auf der Altseite lagen diese 15
 *  Seiten indexiert auf oberster Ebene. Eine Sammelseite allein haette sie
 *  ersatzlos gestrichen. */
export function generateStaticParams() {
  return referentinnen.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = referentinBySlug(slug);
  return { title: r ? r.name : "Referentin" };
}

export default async function ReferentinSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = referentinBySlug(slug);
  if (!r) notFound();

  return (
    <>
      <PageHeader kicker={r.role} title={r.name} />
      <Container className="py-14">
        <div className="max-w-2xl space-y-6">
          {/* Sobald in content/referentinnen.ts eine echte Biografie steht, wird sie
              hier ausgegeben und der Platzhalter verschwindet von selbst. Vorher
              stand das bio-Feld ungenutzt in den Daten - wer es gefuellt haette,
              haette auf der Seite keine Aenderung gesehen. */}
          {r.bio && r.bio !== "PLATZHALTER" ? (
            <p className="text-base leading-relaxed text-ink-muted">{r.bio}</p>
          ) : (
            <Placeholder>
              Biografie {r.name} – Text und Foto von der Altseite übernehmen oder neu
              einholen. Später aus der instructors-Tabelle.
            </Placeholder>
          )}
          <section>
            <h2 className="text-lg font-semibold tracking-tight">Module</h2>
            <div className="mt-3"><Placeholder>Welche Module diese Referentin hält – kommt aus dem Datenmodell.</Placeholder></div>
          </section>
          <Link href="/referentinnen/" className="inline-block text-sm text-brand hover:text-brand-dark">
            ← Alle Referentinnen
          </Link>
        </div>
      </Container>
    </>
  );
}
