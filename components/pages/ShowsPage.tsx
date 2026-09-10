import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShowsList } from "@/components/shows/ShowsList";
import { Photo } from "@/components/ui/Photo";
import { loadShows, loadSite } from "@/lib/content/load";
import { absoluteUrl, localizedPath } from "@/lib/i18n/paths";
import { breadcrumbs, graph, musicEvent } from "@/lib/seo/jsonld";
import { splitShows } from "@/lib/shows";

const INLAY_QUOTE = {
  de: "All people are equal. Immigrants and refugees are welcome. Diversity is celebrated. Stop deportation now. Love wins.",
  en: "All people are equal. Immigrants and refugees are welcome. Diversity is celebrated. Stop deportation now. Love wins.",
};

export async function ShowsPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  const { upcoming, past } = splitShows(loadShows(), new Date());
  const jsonLd = graph([
    breadcrumbs([
      { name: "Brickwater", url: absoluteUrl(localizedPath(locale, "/")) },
      { name: t("shows.heading"), url: absoluteUrl(localizedPath(locale, "/shows")) },
    ]),
    ...upcoming.map((show) => musicEvent(show, locale)),
  ]);
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <h1 className="text-display font-semibold">{t("shows.heading")}</h1>
          <p className="measure mt-5 text-h3 text-ink-soft">{t("shows.intro")}</p>
          <div className="mt-12 rule pt-2">
            <ShowsList locale={locale} upcoming={upcoming} past={past.slice(0, 12)} />
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container grid gap-12 lg:grid-cols-12 lg:items-center">
          <figure className="lg:col-span-5">
            <Photo id="brickwater-harmonica-live-2020" locale={locale} sizes="(min-width: 1024px) 38vw, 100vw" className="sleeve-photo" />
          </figure>
          <div className="lg:col-span-7">
            <blockquote className="text-h2 font-semibold text-balance">
              <p>{INLAY_QUOTE[locale]}</p>
            </blockquote>
            <p className="etch mt-4 text-ink-soft uppercase">
              {locale === "de" ? "Aus der Beilage der Season One LP" : "From the Season One LP inlay"}
            </p>
            <p className="measure mt-10 text-ink-soft">
              {t("shows.bookingHint")}{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink underline">
                {t("shows.bookingCta")}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
