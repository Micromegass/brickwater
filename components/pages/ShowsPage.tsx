import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { loadShows } from "@/lib/content/load";
import { splitShows } from "@/lib/shows";

export async function ShowsPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "shows" });
  const { upcoming } = splitShows(loadShows(), new Date());
  return (
    <main id="main">
      <h1>{t("heading")}</h1>
      {upcoming.length === 0 ? <p>{t("empty")}</p> : null}
    </main>
  );
}
