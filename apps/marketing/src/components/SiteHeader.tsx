import Link from "next/link";
import { Container } from "./Container";
import { CtaLink } from "./CtaLink";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {site.name}
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

        <div className="hidden shrink-0 sm:block">
          <CtaLink href={`${site.educationUrl}/login/`} variant="secondary">
            Login
          </CtaLink>
        </div>
      </Container>
    </div>
  );
}
