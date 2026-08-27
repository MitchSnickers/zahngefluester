import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { referentinnen } from "@/content/referentinnen";

export const metadata: Metadata = { title: "Referentinnen" };

export default function Referentinnen() {
  return (
    <>
      <PageHeader
        kicker="Referentinnen"
        title="Wer bei Zahngeflüster unterrichtet"
        lead="PLATZHALTER. Die Referentinnen aller Masterclass-Generationen."
      />
      <Container className="py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {referentinnen.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/referentinnen/${r.slug}/`}
                className="block h-full rounded-lg border border-line bg-white p-5 transition-colors hover:border-brand"
              >
                <p className="font-medium">{r.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{r.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
