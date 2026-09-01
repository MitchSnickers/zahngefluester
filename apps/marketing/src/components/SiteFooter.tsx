import Link from "next/link";
import { Container } from "./Container";
import { footerLegal, nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-alt py-12">
      <Container className="grid gap-10 sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{site.tagline}</p>
          <p className="mt-4 text-sm text-ink-muted">{site.email}</p>
        </div>

        <nav aria-label="Seiten">
          <p className="text-sm font-medium">Seiten</p>
          {/* py-1 macht aus 20 px Zeilenhoehe 28 px Trefferflaeche -
              WCAG 2.2 / 2.5.8 verlangt mindestens 24x24. */}
          <ul className="mt-3 space-y-1 text-sm text-ink-muted">
            {nav.slice(1).map((i) => (
              <li key={i.href}><Link href={i.href} className="inline-block py-1 hover:text-ink">{i.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rechtliches">
          <p className="text-sm font-medium">Rechtliches</p>
          {/* py-1 macht aus 20 px Zeilenhoehe 28 px Trefferflaeche -
              WCAG 2.2 / 2.5.8 verlangt mindestens 24x24. */}
          <ul className="mt-3 space-y-1 text-sm text-ink-muted">
            {footerLegal.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="inline-block py-1 hover:text-ink" {...("external" in i ? { rel: "noopener" } : {})}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
