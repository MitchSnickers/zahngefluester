import type { MetadataRoute } from "next";
import { kurse } from "@/content/kurse";
import { referentinnen } from "@/content/referentinnen";
import { site } from "@/content/site";

const statisch = ["/", "/ueber-uns/", "/referentinnen/", "/kurse/", "/praxen/", "/kontakt/", "/faq/", "/impressum/", "/datenschutz/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...statisch.map((p) => ({ url: `${site.url}${p}` })),
    ...kurse.map((k) => ({ url: `${site.url}/kurse/${k.slug}/` })),
    ...referentinnen.map((r) => ({ url: `${site.url}/referentinnen/${r.slug}/` })),
  ];
}
