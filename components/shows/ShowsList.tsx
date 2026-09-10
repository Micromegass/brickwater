import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Show } from "@/lib/content/schema";
import { loadSite } from "@/lib/content/load";
import { ShowCard } from "./ShowCard";

interface Props {
  locale: Locale;
  upcoming: Show[];
  past?: Show[];
  limit?: number;
}

export async function ShowsList({ locale, upcoming, past = [], limit }: Props) {
  const t = await getTranslations({ locale, namespace: "shows" });
  const site = loadSite();
  const shown = limit ? upcoming.slice(0, limit) : upcoming;
  const labelsFor = (show: Show) => ({
    tickets: t("tickets"),
    info: t("info"),
    calendar: t("calendar"),
    calendarLabel: t("calendarLabel", { venue: show.venue }),
    map: t("map"),
    mapLabel: t("mapLabel", { venue: show.venue }),
    doors: show.time ? t("doors", { time: show.time }) : undefined,
    status: show.status !== "scheduled" ? t(`status.${show.status}`) : undefined,
  });

  if (upcoming.length === 0) {
    return (
      <div className="shows-empty">
        <p className="text-h3 font-semibold text-balance">{t("empty")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.socials.instagram} className="sticker sticker-ink" rel="me noopener">
            {t("emptyFollow")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="show-list">
        {shown.map((show) => (
          <ShowCard key={show.id} show={show} locale={locale} labels={labelsFor(show)} />
        ))}
      </ul>
      {past.length > 0 ? (
        <>
          <h3 className="mt-16 text-h3 font-semibold">{t("past")}</h3>
          <ul className="show-list mt-4">
            {past.map((show) => (
              <ShowCard key={show.id} show={show} locale={locale} labels={labelsFor(show)} past />
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
