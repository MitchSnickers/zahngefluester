import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaLink } from "@/components/CtaLink";
import { Placeholder } from "@/components/Placeholder";
import { kurse } from "@/content/kurse";
import { site } from "@/content/site";

/** Die Stimmen liegen bei der Masterclass, nicht doppelt auf der Startseite.
 *  Eine Quelle, zwei Orte der Ausgabe. */
const stimmen = kurse.find((k) => k.slug === "masterclass")?.stimmen ?? [];

export default function Startseite() {
  return (
    <>
      <section className="border-b border-line bg-surface-alt py-20 sm:py-28">
        <Container>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-brand">{site.tagline}</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {site.claim}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/kurse/">Kurse ansehen</CtaLink>
            <CtaLink href="/praxen/" variant="secondary">Für Praxen</CtaLink>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Fortbildungen</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {kurse.map((k) => (
            <Link
              key={k.slug}
              href={`/kurse/${k.slug}/`}
              className="group rounded-lg border border-line bg-white p-6 transition-colors hover:border-brand"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-brand">{k.kicker}</p>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-brand-dark">{k.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{k.format}</p>
              <p className="mt-4 text-sm font-medium">{k.price}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <h2 className="text-2xl font-semibold tracking-tight">Was Teilnehmerinnen sagen</h2>
        {/* Echte Stimmen aus Notion, nicht erfunden. Was fehlt, ist nicht der
            Text, sondern die Erlaubnis - siehe Kasten darunter. */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stimmen.map((s) => (
            <figure key={s.person} className="rounded-lg border border-line bg-surface-alt p-6">
              <blockquote className="text-sm leading-relaxed">„{s.text}“</blockquote>
              <figcaption className="mt-3 text-xs text-ink-muted">{s.person}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4">
          <Placeholder>
            Diese beiden Stimmen stehen so in eurem Notion, sind also echt. Offen ist,
            ob Chrissi und Kati der namentlichen Veröffentlichung zugestimmt haben –
            und ob es weitere gibt, die eine Praxis nennen dürfen. Dazu gehört ein
            zweiter Punkt: wer Bewertungen zeigt, muss erklären, wie er ihre Echtheit
            sicherstellt. Die entsprechende Pflichtseite auf .education ist leer.
          </Placeholder>
        </div>
      </Container>

      <Container className="pb-8">
        <div className="rounded-lg border border-line bg-surface-alt p-8">
          <h2 className="text-xl font-semibold tracking-tight">Newsletter</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
            PLATZHALTER. Das Opt-in braucht Double-Opt-in über Resend und einen
            Datenschutzhinweis. Bewusst noch nicht verdrahtet – ein Formular, das
            Adressen entgegennimmt, ist die erste Stelle, an der .com personenbezogene
            Daten anfasst.
          </p>
        </div>
      </Container>
    </>
  );
}
