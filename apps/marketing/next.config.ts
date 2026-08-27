import type { NextConfig } from "next";
import { COM_LEGACY_REDIRECTS } from "@zg/redirects";

const nextConfig: NextConfig = {
  // Die Altseite fuhr durchgehend Slugs mit abschliessendem Slash, und der
  // Seitenbaum in Notion ebenso. Wechselt man das, wird jede indexierte URL
  // zusaetzlich umgeleitet - ohne Gegenwert.
  trailingSlash: true,

  // Kein Bild-Optimierungsdienst, solange keine echten Bilder da sind.
  images: { remotePatterns: [] },

  async redirects() {
    // Einzige Quelle ist packages/redirects. Hier wird nichts ergaenzt.
    return COM_LEGACY_REDIRECTS.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
