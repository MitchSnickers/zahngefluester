import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { faq } from "@/content/faq";

export const metadata: Metadata = { title: "Häufige Fragen" };

export default function Faq() {
  return (
    <>
      <PageHeader kicker="FAQ" title="Häufige Fragen" />
      <Container className="py-14">
        <dl className="max-w-2xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-medium">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
