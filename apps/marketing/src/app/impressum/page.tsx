import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Impressum" };

/** Jede Domain braucht ein eigenes Impressum. Der Text wird NICHT hier erfunden -
 *  er wird 1:1 aus der geprueften Fassung uebernommen. */
export default function Impressum() {
  return (
    <>
      <PageHeader title="Impressum" />
      <Container className="py-14">
        <div className="max-w-2xl space-y-4">
          <Placeholder>
            Text 1:1 aus der bestehenden, geprüften Fassung übernehmen. Nicht neu
            formulieren und nicht aus Bausteinen zusammensetzen.
          </Placeholder>
          <Placeholder>
            ⚠️ Vor dem Launch klären: Die Widerrufsadresse enthält heute nur einen
            Domain-String statt einer ladungsfähigen Anschrift. Abmahnfähig.
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
