"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import { otherLocale } from "@/lib/i18n/paths";

export function LanguageSwitcher({ label, short }: { label: string; short: string }) {
  const locale = useLocale() as "de" | "en";
  const pathname = usePathname();
  const params = useParams();
  const target = otherLocale(locale);
  // usePathname returns the internal template (e.g. "/music/[slug]"); params fill it.
  const raw = getPathname({
    locale: target,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: { pathname, params } as any,
  });
  const href = raw.endsWith("/") ? raw : `${raw}/`;
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className="sticker sticker-paper !px-3 !py-2 text-small"
    >
      {short}
    </a>
  );
}
