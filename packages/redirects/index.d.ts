export interface LegacyRedirect {
  /** Alter Pfad OHNE abschliessenden Slash. Next normalisiert vorher. */
  source: string;
  /** Zielpfad oder absolute URL bei Domainwechsel. */
  destination: string;
  /** true = 308/301 dauerhaft. Immer true, ausser bei bewusst temporaeren Faellen. */
  permanent: boolean;
  /** Warum. Steht im Diff, wenn jemand die Zeile spaeter loeschen will. */
  note?: string;
}

export const COM_LEGACY_REDIRECTS: LegacyRedirect[];
export const EDUCATION_LEGACY_REDIRECTS: LegacyRedirect[];
export const COM_GONE_PATHS: string[];
export const EDUCATION_GONE_PATHS: string[];
export const REFERENTINNEN_SLUGS: string[];
export const UNRESOLVED: { source: string; problem: string }[];
