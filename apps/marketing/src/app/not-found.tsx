import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-sm font-medium uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Diese Seite gibt es nicht</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Möglicherweise hat sich die Adresse geändert. Die Kursübersicht ist ein guter
        Startpunkt.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <Link href="/" className="text-brand hover:text-brand-dark">Startseite</Link>
        <Link href="/kurse/" className="text-brand hover:text-brand-dark">Kurse</Link>
        <Link href="/kontakt/" className="text-brand hover:text-brand-dark">Kontakt</Link>
      </div>
    </Container>
  );
}
