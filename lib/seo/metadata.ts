import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale, Pathname } from "@/i18n/routing";
import { pageAlternates } from "@/lib/i18n/paths";

interface PageMetadataInput {
  locale: Locale;
  pathname: Pathname;
  params?: Record<string, string>;
  /** Key under `meta.*` in the message files, or explicit strings. */
  key?: "home" | "shows" | "music" | "legal" | "privacy";
  title?: string;
  description?: string;
  ogImage?: string;
}

export const SITE_NAME = "Brickwater";

export async function pageMetadata(input: PageMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale: input.locale, namespace: "meta" });
  const title = input.title ?? t(`${input.key ?? "home"}.title`);
  const description =
    input.description ?? t(`${input.key ?? "home"}.description`);
  const alternates = pageAlternates(input.locale, input.pathname, input.params);
  const isHome = input.pathname === "/";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: input.locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: input.locale === "de" ? ["en_GB"] : ["de_DE"],
      type: "website",
      ...(input.ogImage ? { images: [input.ogImage] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
