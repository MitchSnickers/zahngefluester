import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { faq, faqKategorien } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Häufige Fragen" };

export default function Faq() {
  return (
    <>
      <PageHeader
        kicker="FAQ"
        title="Häufige Fragen"
        lead="Antworten auf die wichtigsten Fragen rund um Zahngeflüster, unsere Kurse und die Lernplattform."
      />
      <Container className="py-14">
        <div className="max-w-2xl space-y-12">
          {faqKategorien.map((kat) => {
            const eintraege = faq.filter((f) => f.kategorie === kat);
            if (eintraege.length === 0) return null;
            return (
              <section key={kat}>
                <h2 className="text-sm font-medium uppercase tracking-wider text-brand">{kat}</h2>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {eintraege.map((item) => (
                    <div key={item.q} className="py-5">
                      <dt className="font-medium leading-snug">{item.q}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}

          <p className="text-sm leading-relaxed text-ink-muted">
            Deine Frage war nicht dabei? Schreib uns an{" "}
            <a href={`mailto:${site.email}`} className="text-brand hover:text-brand-dark">
              {site.email}
            </a>{" "}
            oder ruf an unter{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-brand hover:text-brand-dark">
              {site.phone}
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
