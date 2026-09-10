import { routing, type Locale, type Pathname } from "@/i18n/routing";

export const SITE_URL = "https://www.brickwater.de";

type Params = Record<string, string>;

/** Localized, trailing-slash URL path for a route: DE unprefixed, EN under /en. */
export function localizedPath(
  locale: Locale,
  pathname: Pathname,
  params?: Params,
): string {
  const entry = routing.pathnames[pathname];
  const template = typeof entry === "string" ? entry : entry[locale];
  const filled = template.replace(/\[(\w+)\]/g, (_match, key: string) => {
    const value = params?.[key];
    if (!value) throw new Error(`Missing param "${key}" for ${pathname}`);
    return value;
  });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const path = filled === "/" ? "" : filled;
  return `${prefix}${path}/` || "/";
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function pageAlternates(
  locale: Locale,
  pathname: Pathname,
  params?: Params,
) {
  const de = absoluteUrl(localizedPath("de", pathname, params));
  const en = absoluteUrl(localizedPath("en", pathname, params));
  return {
    canonical: locale === "de" ? de : en,
    languages: { de, en, "x-default": de },
  };
}

export function otherLocale(locale: Locale): Locale {
  return locale === "de" ? "en" : "de";
}
