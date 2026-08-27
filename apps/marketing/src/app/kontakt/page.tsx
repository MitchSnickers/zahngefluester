import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Kontakt" };

export default function Kontakt() {
  return (
    <>
      <PageHeader kicker="Kontakt" title="Schreiben Sie uns" />
      <Container className="py-14">
        <div className="max-w-2xl space-y-6">
          <p className="text-lg">
            <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-dark">{site.email}</a>
          </p>
          <Placeholder>
            Kontaktformular bewusst noch nicht gebaut. Ein Formular auf .com nimmt
            personenbezogene Daten entgegen und braucht damit Empfängeradresse,
            Spam-Schutz, Datenschutzhinweis und einen geprüften Zustellweg – das
            Kontaktformular der Altseite wurde nach der Korrektur auf info@ nie
            getestet. Erst Zustellung beweisen, dann Formular.
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
