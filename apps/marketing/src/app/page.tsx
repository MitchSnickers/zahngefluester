import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaLink } from "@/components/CtaLink";
import { Placeholder } from "@/components/Placeholder";
import { Portrait } from "@/components/Portrait";
import { kurse } from "@/content/kurse";
import { referentinnenVonKurs } from "@/content/modulzuordnung";
import { referentinnen } from "@/content/referentinnen";
import { site } from "@/content/site";

/** Die Stimmen liegen bei der Masterclass, nicht doppelt auf der Startseite.
 *  Eine Quelle, zwei Orte der Ausgabe. */
const stimmen = kurse.find((k) => k.slug === "masterclass")?.stimmen ?? [];

/** Acht Gesichter auf der Startseite, nicht alle fuenfzehn: die Uebersicht
 *  soll ein Vorgeschmack sein, keine zweite Referentinnenseite. Die
 *  Reihenfolge kommt aus content/referentinnen.ts - Gruenderinnen zuerst. */
const gesichter = referentinnen.slice(0, 8);

/** Die beiden Gruenderinnen tragen den Kopfbereich. NN/g: echte Menschen statt
 *  Versprechen - und keine zwei Reihen Gesichter uebereinander, sonst wird die
 *  Startseite zur Belegschaftsseite. */
const gruenderinnen = referentinnen.filter((r) => r.founder);

/** Zahlen aus den Daten, nicht aus dem Marketing. Aendert sich die Modulliste,
 *  aendert sich der Abschnitt mit. */
const masterclass = kurse.find((k) => k.slug === "masterclass");
const modulAnzahl = masterclass?.module?.length ?? 0;
const dozentinnenAnzahl = referentinnenVonKurs("masterclass").length;

export default function Startseite() {
  return (
    <>
      <section className="border-b border-line bg-surface-alt py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand">{site.tagline}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                {site.claim}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{site.introKurz}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/kurse/">Kurse ansehen</CtaLink>
                <CtaLink href="/praxen/" variant="secondary">Für Praxen</CtaLink>
              </div>
              {/* Belege statt Adjektive: alle drei Angaben stehen so in den Daten. */}
              <p className="mt-7 text-sm text-ink-muted">
                {referentinnen.length} Referentinnen · Zertifikat nach Abschluss · zeitlich unbegrenzter Zugang
              </p>
            </div>

            {/* Ohne Markenfoto sind die Gruenderinnen das ehrlichste Bild, das
                die Seite hat - und laut NN/g das wirksamere: echte Personen mit
                Namen schlagen jedes Stockfoto. Ein Vektorlogo und ein
                Querformat-Foto stehen auf der Anforderungsliste. */}
            <ul className="grid grid-cols-2 gap-5">
              {gruenderinnen.map((r, i) => (
                <li key={r.slug}>
                  <Link href={`/referentinnen/${r.slug}/`} className="group block">
                    <Portrait
                      src={r.photo}
                      name={r.name}
                      sizes="(min-width: 1024px) 16rem, 42vw"
                      priority={i === 0}
                    />
                    <p className="mt-3 text-sm font-medium group-hover:text-brand-dark">
                      {r.shortName ?? r.name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">Gründerin</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Der Rest der Einleitung, wortgleich - nur nicht mehr ueber der Falz. */}
      <Container className="py-14">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">{site.introRest}</p>
      </Container>

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

      {/* Der eine Abschnitt pro Seite, der die Markenfarbe als FLAECHE traegt -
          Regel aus docs/design-regeln.md. Weiss darauf 5,43:1, surface-alt
          darauf 4,79:1: beides ueber der AA-Schwelle, nachgerechnet.
          Der Beschreibungssatz ist aus ihrer eigenen Produktbeschreibung in
          Notion zusammengesetzt, nicht formuliert. */}
      <section className="bg-brand py-16 text-white sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Dental Diversity Masterclass 3.0
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-surface-alt">
                Praxisorientierte Module mit renommierten Expert:innen – Themen wie Ernährung,
                Stressmanagement, Alterszahnmedizin und Periimplantitis.
              </p>
              <dl className="mt-9 flex flex-wrap gap-x-14 gap-y-6">
                <div>
                  <dt className="text-sm text-surface-alt">Module</dt>
                  <dd className="mt-1 text-3xl font-semibold">{modulAnzahl}</dd>
                </div>
                <div>
                  <dt className="text-sm text-surface-alt">Referentinnen</dt>
                  <dd className="mt-1 text-3xl font-semibold">{dozentinnenAnzahl}</dd>
                </div>
                <div>
                  <dt className="text-sm text-surface-alt">Zugang</dt>
                  <dd className="mt-1 text-3xl font-semibold">unbegrenzt</dd>
                </div>
              </dl>
            </div>
            <Link
              href="/kurse/masterclass/"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-surface-alt"
            >
              Zur Masterclass
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface-alt py-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">Von wem du lernst</h2>
            <Link href="/referentinnen/" className="text-sm text-brand hover:text-brand-dark">
              Alle {referentinnen.length} Referentinnen →
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gesichter.map((r) => (
              <li key={r.slug}>
                <Link href={`/referentinnen/${r.slug}/`} className="group block">
                  <Portrait src={r.photo} name={r.name} sizes="(min-width: 640px) 25vw, 50vw" />
                  <p className="mt-2 text-sm font-medium group-hover:text-brand-dark">
                    {r.shortName ?? r.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-muted">{r.role}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
