/** Die 15 Referentinnen-Slugs stammen aus der Live-Sitemap von www.zahngefluester.com
 *  (gezogen 27.08.2026). Jede hatte dort eine eigene, indexierte Seite auf oberster
 *  Ebene. Die Slugs bleiben identisch, nur eine Ebene tiefer - siehe
 *  packages/redirects.
 *
 *  Namen und Bios sind PLATZHALTER, abgeleitet aus dem Slug. Vor dem Launch aus den
 *  Live-Seiten oder von Jasmin/Lina uebernehmen. Spaeter kommt das aus der
 *  instructors-Tabelle in Supabase. */
export type Referentin = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export const referentinnen: Referentin[] = [
  { slug: "jasmin-matthes", name: "Jasmin Matthes", role: "Gründerin", bio: "PLATZHALTER" },
  { slug: "dr-lina-dinse", name: "Dr. Lina Dinse", role: "Gründerin", bio: "PLATZHALTER" },
  { slug: "dr-marion-kauderer", name: "Dr. Marion Kauderer", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "professor-dr-georg-gassmann", name: "Prof. Dr. Georg Gassmann", role: "Referent", bio: "PLATZHALTER" },
  { slug: "pd-dr-dr-matthias-troeltzsch", name: "PD Dr. Dr. Matthias Tröltzsch", role: "Referent", bio: "PLATZHALTER" },
  { slug: "katrin-kersting", name: "Katrin Kersting", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "tatjana-bejta", name: "Tatjana Bejta", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "sanella-blatt", name: "Sanella Blatt", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "thea-wittling", name: "Thea Wittling", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "sonja-steinert", name: "Sonja Steinert", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "martina-schaale", name: "Martina Schaale", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "katja-piecuch", name: "Katja Piecuch", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "nicole-graw", name: "Nicole Graw", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "ann-kathrin-giglberger", name: "Ann-Kathrin Giglberger", role: "Referentin", bio: "PLATZHALTER" },
  { slug: "claudia-bastian", name: "Claudia Bastian", role: "Referentin", bio: "PLATZHALTER" },
];

export function referentinBySlug(slug: string) {
  return referentinnen.find((r) => r.slug === slug);
}
