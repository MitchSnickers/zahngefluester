import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Portrait } from "@/components/Portrait";
import { referentinnen } from "@/content/referentinnen";

export const metadata: Metadata = { title: "Referentinnen" };

export default function Referentinnen() {
  return (
    <>
      <PageHeader
        kicker="Referentinnen"
        title="Wer bei Zahngeflüster unterrichtet"
        lead="Die Referentinnen und Referenten aller Masterclass-Generationen."
      />
      <Container className="py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {referentinnen.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/referentinnen/${r.slug}/`}
                className="block h-full overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand"
              >
                <Portrait src={r.photo} name={r.name} className="rounded-none" />
                <div className="p-5">
                <p className="font-medium">
                  {r.name}
                  {r.founder && (
                    <span className="ml-2 align-middle text-xs font-normal text-brand">Gründerin</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{r.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
