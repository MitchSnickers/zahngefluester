import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Impressum" };

/** Wortgleich aus dem Live-Impressum von www.zahngefluester.com uebernommen
 *  (Stand dort: 20.11.2024). Rechtstexte werden nicht umformuliert, nicht
 *  gekuerzt und nicht aus Bausteinen zusammengesetzt - nur uebertragen.
 *
 *  Jede Domain braucht ein eigenes Impressum. Dieses gilt fuer .com;
 *  .education fuehrt ein eigenes. */
export default function Impressum() {
  return (
    <>
      <PageHeader title="Impressum" />
      <Container className="py-14">
        <div className="max-w-2xl space-y-6 text-ink-muted">
          <section>
            <p className="font-medium text-ink">{site.legalName}</p>
            <p className="mt-2">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </p>
            <p className="mt-2">
              Tel.: <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-brand hover:text-brand-dark">{site.phone}</a>
              <br />
              E-Mail: <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-dark">{site.email}</a>
            </p>
          </section>

          <section>
            <p>Vertretungsberechtigte Gesellschafterinnen: Jasmin Matthes, Dr. Lina Dinse</p>
            <p className="mt-2">USt. wird nicht ausgewiesen (Kleinunternehmerregelung)</p>
          </section>

          <section>
            <h2 className="font-medium text-ink">Verantwortliche i.S.d. § 18 Abs. 2 MStV</h2>
            <p className="mt-1">Jasmin Matthes, Gritschstraße 59, 85276 Pfaffenhofen</p>
          </section>

          <section>
            <h2 className="font-medium text-ink">Online-Streitbeilegung</h2>
            <p className="mt-1">
              Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
              <a href="https://ec.europa.eu/odr" className="text-brand hover:text-brand-dark" rel="noopener">
                https://ec.europa.eu/odr
              </a>
            </p>
            <p className="mt-2">
              Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
