import type { MetadataRoute } from "next";
import { routing, type Pathname } from "@/i18n/routing";
import { loadReleases } from "@/lib/content/load";
import { absoluteUrl, localizedPath } from "@/lib/i18n/paths";

export const dynamic = "force-static";

const STATIC_PATHS: Pathname[] = ["/", "/shows", "/music", "/gallery", "/legal-notice", "/privacy"];

function entry(pathname: Pathname, params?: Record<string, string>, priority = 0.7): MetadataRoute.Sitemap {
  const de = absoluteUrl(localizedPath("de", pathname, params));
  const en = absoluteUrl(localizedPath("en", pathname, params));
  const alternates = { languages: { de, en, "x-default": de } };
  return [
    { url: de, alternates, priority, changeFrequency: "weekly" },
    { url: en, alternates, priority, changeFrequency: "weekly" },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Partial<Record<Pathname, number>> = {
    "/": 1,
    "/shows": 0.9,
    "/music": 0.8,
    "/gallery": 0.6,
    "/legal-notice": 0.2,
    "/privacy": 0.2,
  };
  const entries = STATIC_PATHS.flatMap((p) => entry(p, undefined, priorities[p]));
  const releases = loadReleases().flatMap((r) => entry("/music/[slug]", { slug: r.slug }, 0.6));
  void routing;
  return [...entries, ...releases];
}
