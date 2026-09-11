import { getFormatter, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getRelease, loadShows, loadSite } from "@/lib/content/load";
import { berlinDateTime } from "@/lib/dates";
import { localizedPath } from "@/lib/i18n/paths";
import { splitShows } from "@/lib/shows";
import { Photo } from "@/components/ui/Photo";
import { Stain } from "@/components/ui/Stain";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { HeroPlayer } from "@/components/music/HeroPlayer";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const site = loadSite();
  const { upcoming } = splitShows(loadShows(), new Date());
  // The song he leads with, named in content/site.json and checked at build
  // against that record's tracklist.
  const heroTrack = site.heroTrack;
  const heroRelease = getRelease(heroTrack.release);
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
        opacity={0.16}
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
      <Stain
        shape="sage"
        drift="c"
        phase={-9}
        className="-right-10 bottom-0 h-[22rem] w-[28rem] sm:h-[28rem] sm:w-[34rem]"
        opacity={0.2}
      />
      <Stain
        shape="ink"
        drift="a"
        phase={-15}
        color="var(--color-clay)"
        className="left-1/4 -top-16 h-[20rem] w-[26rem] sm:h-[26rem] sm:w-[34rem]"
        opacity={0.14}
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
            {heroRelease ? (
              <HeroPlayer
                trackId={heroTrack.bandcampTrackId}
                title={heroTrack.title}
                meta={`${t(`music.types.${heroRelease.type}`)}, ${heroRelease.year} · ${heroRelease.title}`}
                ariaLabel={t("hero.heroTrackLabel", { title: heroTrack.title, release: heroRelease.title })}
                hint={t("embeds.bandcampHintShort")}
                privacyHref={localizedPath(locale, "/privacy")}
                privacyLabel={t("embeds.privacyLink")}
                iframeTitle={t("embeds.iframeTitle", { title: heroTrack.title, provider: "Bandcamp" })}
              />
            ) : null}
          </div>
          <figure className="hero-photo sleeve-print">
            <Photo
              id="brickwater-harmonica-live-2020"
              locale={locale}
              sizes="(min-width: 768px) 46vw, 100vw"
              className="sleeve-print-img"
              priority
            />
            <span className="sleeve-print-plate" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  );
}
