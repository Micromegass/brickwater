import { getFormatter, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadShows, loadSite } from "@/lib/content/load";
import { berlinDateTime } from "@/lib/dates";
import { splitShows } from "@/lib/shows";
import { Photo } from "@/components/ui/Photo";
import { Stain } from "@/components/ui/Stain";
import { SocialIcon } from "@/components/ui/SocialIcon";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const site = loadSite();
  const { upcoming } = splitShows(loadShows(), new Date());
  const next = upcoming[0];
  const nextDate = next
    ? format.dateTime(berlinDateTime(next.date, "12:00"), { day: "numeric", month: "short" })
    : null;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Stain
        shape="wolves"
        ghost
        className="left-1/2 top-1/2 h-[34rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 sm:h-[42rem] sm:w-[58rem]"
        opacity={0.12}
      />
      <Stain
        shape="clay"
        drift="a"
        className="right-0 top-0 h-[24rem] w-[30rem] sm:h-[30rem] sm:w-[40rem]"
        opacity={0.28}
      />
      <Stain
        shape="clay"
        drift="b"
        color="var(--color-sage-paint)"
        className="-bottom-10 left-0 h-[26rem] w-[30rem] -scale-x-100 sm:h-[32rem] sm:w-[38rem]"
        opacity={0.3}
      />
      <div className="hero-inner">
        <div className="wordmark-stage">
          <h1 id="hero-title" className="wordmark" aria-label="Brickwater">
            <span aria-hidden="true">
              <span className="wordmark-part">Brick</span>
              <span className="wordmark-part">water</span>
            </span>
          </h1>
        </div>
        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-claim">{t("site.tagline")}</p>
            <div className="hero-actions">
              <Link href="/shows" className="sticker sticker-clay">
                {t("hero.ctaShows")}
              </Link>
              <Link href="/music" className="sticker sticker-paper">
                {t("hero.ctaListen")}
              </Link>
              <a
                href={site.socials.instagram}
                className="sticker sticker-ink"
                rel="me noopener"
                aria-label={`${t("hero.ctaFollow")}: Instagram`}
              >
                <SocialIcon name="instagram" size={17} />
                {t("hero.ctaFollow")}
              </a>
            </div>
            <Link
              href="/shows"
              className="hype"
              aria-label={
                next
                  ? `${t("hero.nextShow")}: ${nextDate}, ${next.city}`
                  : `${t("hero.nextShow")}: ${t("hero.badgeEmpty")}`
              }
            >
              <span className="hype-text">
                <span className="hype-label">{t("hero.nextShow")}</span>
                {next ? (
                  <>
                    <span className="hype-value">
                      {nextDate}, {next.city}
                    </span>
                    <span className="hype-meta">{next.venue}</span>
                  </>
                ) : (
                  <span className="hype-value">{t("hero.badgeEmpty")}</span>
                )}
              </span>
            </Link>
          </div>
          <figure className="hero-photo">
            <Photo
              id="bricky-waters-cat-mural-2020"
              locale={locale}
              sizes="(min-width: 768px) 46vw, 100vw"
              className="sleeve-photo"
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
