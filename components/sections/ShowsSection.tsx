import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ShowsList } from "@/components/shows/ShowsList";
import { loadShows, loadSite } from "@/lib/content/load";
import { splitShows } from "@/lib/shows";
import { Stain } from "@/components/ui/Stain";

export async function ShowsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "shows" });
  const site = loadSite();
  const { upcoming } = splitShows(loadShows(), new Date());
  return (
    <section className="section" id="konzerte" aria-labelledby="shows-title">
      <Stain shape="clay" className="right-0 top-4 h-[20rem] w-[28rem]" opacity={0.2} />
      <div className="container">
        <h2 id="shows-title" className="text-h2 font-semibold">
          {t("heading")}
        </h2>
        <p className="measure mt-4 text-ink-soft">{t("intro")}</p>
        <div className="mt-10 rule pt-2">
          <ShowsList locale={locale} upcoming={upcoming} limit={5} />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          {upcoming.length > 5 ? (
            <Link href="/shows" className="sticker sticker-paper">
              {t("allShows")}
            </Link>
          ) : null}
          <p className="text-ink-soft">
            {t("bookingHint")}{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline">
              {t("bookingCta")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
