import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { CtaLink } from "./CtaLink";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Bildmarke plus Wortmarke. Das Logo ist eine Rastergrafik mit 500 px
            (Datei: Kopie-von-Blue-minimalist-tooth-love-logo.webp) - fuer diese
            Groesse ausreichend, fuer alles Groessere nicht. Ein Vektorlogo steht
            auf der Anforderungsliste. */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/marke/logo.webp"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        {/* Navigation ohne JavaScript. Auf schmalen Schirmen scrollt sie horizontal.
            Bewusst kein Burger-Menue: das waere die erste Client-Komponente auf einer
            Seite, die sonst komplett statisch ist. */}
        <nav aria-label="Hauptnavigation" className="-mx-2 flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1 px-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block whitespace-nowrap rounded px-2.5 py-1.5 text-ink-muted hover:bg-surface-alt hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Immer sichtbar, auch auf dem Telefon. Das ist der einzige Weg, auf dem
            eine Bestandskundin von hier zu ihrem gekauften Kurs kommt - er darf
            nicht hinter einem Umbruch verschwinden. */}
        <div className="shrink-0">
          <CtaLink href={`${site.educationUrl}/login/`} variant="secondary">
            Login
          </CtaLink>
        </div>
      </Container>
    </div>
  );
}
