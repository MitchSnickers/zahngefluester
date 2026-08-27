import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Datenschutz() {
  return (
    <>
      <PageHeader title="Datenschutzerklärung" />
      <Container className="py-14">
        <div className="max-w-2xl space-y-4">
          <Placeholder>
            Text 1:1 aus der geprüften Fassung übernehmen und an den neuen Stack
            anpassen: Vercel als Hoster, Google Fonts werden bei Next.js zur Bauzeit
            eingebettet und nicht vom Nutzerbrowser geladen.
          </Placeholder>
          <Placeholder>
            Solange .com weder Login noch Formular noch Tracking hat, ist die
            Erklärung kurz. Jede dieser drei Ergänzungen macht sie länger – das ist
            ein Argument, .com wirklich statisch zu halten.
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
