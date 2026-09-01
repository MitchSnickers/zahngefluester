import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Kontakt" };

/** Inhalte aus Notion, "Zahngeflüster / Kontakt" (Stand dort 10.04.2026).
 *  Die Ueberschrift hiess vorher "Schreiben Sie uns" - als einzige Sie-Anrede
 *  auf der ganzen Seite. Der Rest duzt, die Quelle duzt. Auf du vereinheitlicht;
 *  ob es am Ende du oder ihr wird, entscheiden Jasmin und Lina. */
export default function Kontakt() {
  return (
    <>
      <PageHeader
        kicker="Kontakt"
        title="Wir freuen uns auf deine Nachricht."
        lead="Ob Fragen zu unseren Kursen, Kooperationsanfragen oder einfach nur ein freundliches Hallo – wir sind für dich da."
      />
      <Container className="py-14">
        <div className="grid max-w-4xl gap-10 sm:grid-cols-2">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand">So erreichst du uns</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-ink-muted">E-Mail</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-dark">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Telefon</dt>
                <dd>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-brand hover:text-brand-dark">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Lernplattform</dt>
                <dd>
                  <a
                    href={site.educationUrl}
                    className="text-brand hover:text-brand-dark"
                    rel="noopener"
                  >
                    {site.educationUrl.replace("https://www.", "")}
                  </a>
                </dd>
              </div>
            </dl>

            <h2 className="mt-8 text-sm font-medium uppercase tracking-wider text-brand">Social Media</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/zahn.gefluester/"
                  className="text-brand hover:text-brand-dark"
                  rel="noopener"
                >
                  Instagram: @zahn.gefluester
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/zahn.gefluester/"
                  className="text-brand hover:text-brand-dark"
                  rel="noopener"
                >
                  Facebook: Zahngeflüster
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand">Anschrift</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </address>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Pfaffenhofen an der Ilm liegt in Oberbayern, rund 50 Kilometer nördlich von München,
              erreichbar über die A9.
            </p>
          </section>
        </div>

        <div className="mt-12 max-w-2xl">
          <Placeholder>
            Kontaktformular und Newsletter-Anmeldung bewusst noch nicht gebaut. Beides nimmt
            personenbezogene Daten entgegen, und .com hat derzeit keine Datenschutzerklärung –
            ein Formular davorzuschalten würde die Lücke vergrößern statt sie zu schließen. Beim
            Formular kommt hinzu: Empfängeradresse, Spam-Schutz und ein bewiesener Zustellweg
            fehlen; das Formular der Altseite wurde nach der Umstellung auf info@ nie getestet.
            Beim Newsletter läuft der Versand über Mailchimp, also über einen weiteren
            Auftragsverarbeiter, der in der fehlenden Erklärung genannt sein muss. Erst die
            Erklärung, dann die Formulare.
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
