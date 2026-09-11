import { defineRouting } from "next-intl/routing";

/**
 * German lives at the root (no prefix), English under /en.
 * The filesystem under app/ already mirrors these localized paths
 * (app/(de)/konzerte, app/(en)/en/shows, ...), so no middleware is needed:
 * `pathnames` only feeds Link/getPathname.
 */
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeCookie: false,
  localeDetection: false,
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/shows": { de: "/konzerte", en: "/shows" },
    "/music": { de: "/musik", en: "/music" },
    "/music/[slug]": { de: "/musik/[slug]", en: "/music/[slug]" },
    "/gallery": { de: "/galerie", en: "/gallery" },
    "/legal-notice": { de: "/impressum", en: "/legal-notice" },
    "/privacy": { de: "/datenschutz", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
