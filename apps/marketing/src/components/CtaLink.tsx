import Link from "next/link";

/** Jeder Kaufweg verlaesst .com. Diese Komponente ist die einzige Stelle, an der
 *  das passiert - damit man per Suche belegen kann, dass .com selbst nichts
 *  verkauft und keine Konten kennt. */
export function CtaLink({ href, children, variant = "primary" }: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base = "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors";
  const styles = variant === "primary"
    ? "bg-brand text-white hover:bg-brand-dark"
    // WCAG 2.2 / 1.4.11: dieser Knopf ist NUR durch seinen Rand als Knopf
    // erkennbar - also line-strong (3,09:1) statt der Zierlinie (1,30:1).
    : "border border-line-strong bg-white text-ink hover:bg-surface-alt";
  const external = href.startsWith("http");
  return (
    <Link href={href} className={`${base} ${styles}`} {...(external ? { rel: "noopener" } : {})}>
      {children}
    </Link>
  );
}
