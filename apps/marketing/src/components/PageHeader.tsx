import { Container } from "./Container";

export function PageHeader({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-line bg-surface-alt py-14 sm:py-20">
      <Container>
        {kicker && <p className="mb-3 text-sm font-medium uppercase tracking-wider text-brand">{kicker}</p>}
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>}
      </Container>
    </header>
  );
}
