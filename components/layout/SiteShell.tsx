import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { bricolage } from "@/lib/fonts";
import type { Locale } from "@/i18n/routing";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import "@/app/globals.css";

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={bricolage.variable}>
      <body className="flex min-h-[100dvh] flex-col">
        {/*
          THESIS: Brickwater's site is the record package itself, not a dark full-bleed band poster: sleeve, inner sleeve, hype sticker, sticker sheet, label roundel, runout etching.
          OWN-WORLD: paper ground, ink type in Bricolage Grotesque, brick as the one accent and the hero material, water as the inner-sleeve field; die-cut pills for anything pressable, square paper for everything printed.
          STORY: a fan or booker sees the sound (video), the next show, the latest record and the booking email within one scroll, and reads the artist's own words.
          FIRST VIEWPORT: the wordmark BRICKWATER assembled from bricks across the full width, one round hype sticker overlapping its top right, tagline and two CTAs beneath.
          FORM: LP record package, candidate 3 of the grounded list, seed a250cd55.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <NextIntlClientProvider>
          <SiteHeader locale={locale} />
          <div className="flex-1">{children}</div>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
