import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Über uns" };

export default function UeberUns() {
  return (
    <>
      <PageHeader
        kicker="Über uns"
        title="Jasmin Matthes und Dr. Lina Dinse"
        lead="PLATZHALTER. Ein Absatz darüber, warum es Zahngeflüster gibt."
      />
      <Container className="py-14">
        <div className="max-w-2xl space-y-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">Wie es angefangen hat</h2>
            <div className="mt-3"><Placeholder>Gründungsgeschichte – von Jasmin/Lina.</Placeholder></div>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight">Was uns wichtig ist</h2>
            <div className="mt-3"><Placeholder>Mission, Haltung, Anspruch an die Inhalte.</Placeholder></div>
          </section>
        </div>
      </Container>
    </>
  );
}
