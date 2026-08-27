import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";

/* Schriftart: bewusst System-Stack als Platzhalter. Die Markenschrift ist nicht
   gewaehlt. Wenn sie feststeht: next/font/google oder next/font/local - beide
   betten zur Bauzeit ein, es geht also kein Request vom Nutzerbrowser zu Google. */

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
    <html lang="de">
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
