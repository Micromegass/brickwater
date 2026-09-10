import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/hero/Hero";
import { BioSection } from "@/components/sections/BioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FwnSection } from "@/components/sections/FwnSection";
import { MusicSection } from "@/components/sections/MusicSection";
import { ShowsSection } from "@/components/sections/ShowsSection";
import { VideosSection } from "@/components/sections/VideosSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { loadShows, loadSite } from "@/lib/content/load";
import { graph, musicEvent, musicGroup, videoObject, webSite } from "@/lib/seo/jsonld";
import { splitShows } from "@/lib/shows";

export async function HomePage({ locale }: { locale: Locale }) {
  await getTranslations({ locale });
  const site = loadSite();
  const { upcoming } = splitShows(loadShows(), new Date());
  const jsonLd = graph([
    webSite(locale),
    musicGroup(locale),
    ...upcoming.map((show) => musicEvent(show, locale)),
    ...site.videos.filter((v) => v.kind === "official").map((v) => videoObject(v, locale)),
  ]);
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <Hero locale={locale} />
      <BioSection locale={locale} />
      <ShowsSection locale={locale} />
      <MusicSection locale={locale} />
      <VideosSection locale={locale} />
      <FwnSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}
