import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";

/* Hausschrift, entschieden am 01.09.2026 - Begruendung in docs/design-regeln.md.
   Poppins fuer Ueberschriften, Inter fuer Fliesstext. Beide sind bereits ihre:
   Elementor fuehrt Inter als globale Typografie, gerendert wird auf der
   Live-Seite ueberwiegend Poppins. Montserrat kommt nicht mit - drei Schriften
   sind keine Marke, sondern ein Unfall.

   next/font bettet zur BAUZEIT ein. Vom Browser der Besucherin geht kein
   Request an Google. Das ist ein Datenschutzpunkt, nicht nur ein
   Performancepunkt - und auf einer Seite ohne Datenschutzerklaerung zaehlt
   jeder Auftragsverarbeiter, den es gar nicht erst gibt.

   Nur die Schnitte laden, die verwendet werden: Poppins 500/600 fuer
   Ueberschriften, Inter variabel fuer alles andere. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: site.claim,
  // Solange Platzhalter drinstehen, darf nichts davon in den Index.
  // Vor dem Launch entfernen - das ist ein bewusster Schalter, kein Versehen.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
