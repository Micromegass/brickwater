import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { assetVars } from "@/lib/assets";
import { bricolage } from "@/lib/fonts";
import type { Locale } from "@/i18n/routing";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import "@/app/globals.css";

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={bricolage.variable} style={assetVars()}>
      <body className="flex min-h-[100dvh] flex-col">
        {/*
          THESIS: Brickwater's site is the record package itself, not a dark full-bleed band poster: sleeve, inner sleeve, hype sticker, sticker sheet, runout etching. Its colour is not chosen, it is lifted from the sleeve Julia Feisleben painted.
          OWN-WORLD: the sleeve's own neutral gray paper, its printed black, clay from the salmon wolf as the single accent, sage from the green one as the one colour field; die-cut pills for anything pressable, square paper for everything printed; one type family, thin and widely spaced where the record sets its name.
          STORY: a fan or booker sees the sound (video), the record, the collective, the next show and the booking email within one scroll, and reads the artist's own words.
          FIRST VIEWPORT: BRICKWATER in thin spaced caps across the full width, filled with a wash mixed from the painting, one round hype sticker beside it, tagline and two CTAs beneath. The paint soaks in once and the page then holds still.
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
