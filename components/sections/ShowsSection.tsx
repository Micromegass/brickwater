import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ShowsList } from "@/components/shows/ShowsList";
import { loadShows } from "@/lib/content/load";
import { splitShows } from "@/lib/shows";
import { Stain } from "@/components/ui/Stain";

export async function ShowsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "shows" });
  const { upcoming } = splitShows(loadShows(), new Date());
  return (
    <section className="section" id="konzerte" aria-labelledby="shows-title">
      <Stain shape="clay" drift="b" className="right-0 top-4 h-[22rem] w-[30rem]" opacity={0.26} />
      <Stain shape="sage" drift="a" className="left-0 bottom-0 h-[18rem] w-[22rem]" opacity={0.18} />
      <div className="container">
        <h2 id="shows-title" className="text-h2 font-semibold reveal">
          {t("heading")}
        </h2>
        <div className="mt-8 rule pt-2 reveal">
          <ShowsList locale={locale} upcoming={upcoming} limit={5} />
        </div>
        {upcoming.length > 5 ? (
          <div className="mt-10">
            <Link href="/shows" className="sticker sticker-paper">
              {t("allShows")}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
