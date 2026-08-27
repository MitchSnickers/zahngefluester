/** Markiert unfertige Inhalte sichtbar. Sinn: beim Durchklicken faellt sofort auf,
 *  was noch Fuellmaterial ist. Vor dem Launch muss `rg Placeholder src` leer sein. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-line bg-surface-alt px-4 py-3 text-sm text-ink-muted">
      {children}
    </p>
  );
}
