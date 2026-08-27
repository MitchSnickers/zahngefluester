import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaLink } from "@/components/CtaLink";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Für Praxen" };

/** Praxiszugaenge sind kein Zukunftsfeature - sie laufen heute schon produktiv.
 *  Deshalb hat diese Seite von Anfang an einen Platz im Seitenbaum. */
export default function Praxen() {
  return (
    <>
      <PageHeader
        kicker="Für Praxen"
        title="Das ganze Team fortbilden"
        lead="PLATZHALTER. Praxen buchen ein Kontingent an Plätzen und verteilen sie an ihr Team."
      />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold tracking-tight">So läuft es ab</h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                <li>1. Praxis bucht die gewünschte Anzahl Plätze.</li>
                <li>2. Ansprechpartnerin trägt Name und E-Mail je Platz ein.</li>
                <li>3. Die Zugänge werden freigeschaltet.</li>
              </ol>
              <div className="mt-4">
                <Placeholder>
                  Heute werden Zugänge manuell freigeschaltet. Im neuen System übernimmt
                  das die Kontingentverwaltung auf .education.
                </Placeholder>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold tracking-tight">Preise</h2>
              <div className="mt-3"><Placeholder>Staffelpreise – von Jasmin/Lina bestätigen lassen.</Placeholder></div>
            </section>
          </div>

          <aside className="h-fit rounded-lg border border-line bg-surface-alt p-6">
            <p className="font-medium">Kontingent anfragen</p>
            <p className="mt-2 text-sm text-ink-muted">
              Verwaltung der Plätze läuft über das Praxis-Dashboard.
            </p>
            <div className="mt-5">
              <CtaLink href={`${site.educationUrl}/praxiszugaenge/`}>Zu den Praxiszugängen</CtaLink>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
