import type { MetadataRoute } from "next";
import { NOINDEX } from "@/lib/base-path";
import { SITE_URL } from "@/lib/i18n/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: NOINDEX ? [{ userAgent: "*", disallow: "/" }] : [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
