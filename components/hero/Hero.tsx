import { getFormatter, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadReleases, loadShows } from "@/lib/content/load";
import { berlinDateTime } from "@/lib/dates";
import { splitShows } from "@/lib/shows";
import { Stain } from "@/components/ui/Stain";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const { upcoming } = splitShows(loadShows(), new Date());
  const next = upcoming[0];
  const latest = loadReleases()[0];

  const sticker = next ? (
    <Link
      href="/shows"
      className="hype"
      aria-label={`${t("hero.nextShow")}: ${format.dateTime(berlinDateTime(next.date, "12:00"), { day: "numeric", month: "short" })}, ${next.city}`}
    >
      <span className="hype-label">{t("hero.nextShow")}</span>
      <span className="hype-value">
        {format.dateTime(berlinDateTime(next.date, "12:00"), { day: "numeric", month: "short" })}
      </span>
      <span className="hype-meta">{next.city}</span>
    </Link>
  ) : (
    <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }} className="hype">
      <span className="hype-label">{t("music.latest")}</span>
      <span className="hype-value">{latest.title}</span>
      <span className="hype-meta">
        {t(`music.types.${latest.type}`)}, {latest.year}
      </span>
    </Link>
  );

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Stain shape="clay" className="right-0 top-0 h-[20rem] w-[26rem] sm:h-[24rem] sm:w-[34rem]" opacity={0.22} />
      <div className="hero-inner">
        <div className="wordmark-stage">
          <h1 id="hero-title" className="wordmark" aria-label="Brickwater">
            <span aria-hidden="true">
              <span className="wordmark-part">Brick</span>
              <span className="wordmark-part">water</span>
            </span>
          </h1>
          {sticker}
        </div>
        <div className="hero-copy">
          <p className="hero-claim">{t("site.tagline")}</p>
          <div className="hero-actions">
            <Link href="/shows" className="sticker sticker-clay">
              {t("hero.ctaShows")}
            </Link>
            <Link href="/music" className="sticker sticker-paper">
              {t("hero.ctaListen")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
