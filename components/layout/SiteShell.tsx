import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { bodyFont, displayFont } from "@/lib/fonts";
import type { Locale } from "@/i18n/routing";
import "@/app/globals.css";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
