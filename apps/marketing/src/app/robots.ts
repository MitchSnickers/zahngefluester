import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Solange Platzhalter drinstehen: nichts indexieren. Beim Launch auf allow
  // umstellen - zusammen mit dem robots-Feld in app/layout.tsx.
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
