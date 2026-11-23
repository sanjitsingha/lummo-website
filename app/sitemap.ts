import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** The landing page, changelog and privacy policy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/changelog`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
