import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Portrait } from "@/components/Portrait";
import { moduleVonReferentin } from "@/content/modulzuordnung";
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
  const module = moduleVonReferentin(r.slug);

  return (
    <>
      <PageHeader kicker={r.role} title={r.name} />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <div className="mx-auto w-56 lg:mx-0 lg:w-full">
            <Portrait src={r.photo} name={r.name} sizes="16rem" priority />
          </div>
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
          {r.credentials && r.credentials.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold tracking-tight">Qualifikationen</h2>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {r.credentials.map((c) => (
                  <div key={c.label} className="py-3 sm:flex sm:gap-6">
                    <dt className="text-sm font-medium sm:w-40 sm:shrink-0">{c.label}</dt>
                    <dd className="mt-1 text-sm text-ink-muted sm:mt-0">{c.text}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {module.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold tracking-tight">
                Module in der {module[0].kursTitel}
              </h2>
              <ul className="mt-3 space-y-2">
                {module.map((m) => (
                  <li key={m.titel} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {m.titel}
                  </li>
                ))}
              </ul>
              <Link
                href={`/kurse/${module[0].kursSlug}/`}
                className="mt-4 inline-block text-sm text-brand hover:text-brand-dark"
              >
                Zur {module[0].kursTitel} →
              </Link>
            </section>
          )}
            <Link href="/referentinnen/" className="inline-block text-sm text-brand hover:text-brand-dark">
              ← Alle Referentinnen
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
