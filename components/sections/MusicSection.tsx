import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { StreamingLinks } from "@/components/music/StreamingLinks";
import { TrackList } from "@/components/music/TrackList";
import { Photo } from "@/components/ui/Photo";
import { loadReleases } from "@/lib/content/load";
import { Stain } from "@/components/ui/Stain";

export async function MusicSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "music" });
  const [latest, ...others] = loadReleases();
  const serviceLabels = {
    listenOn: t("listenOn"),
    bandcamp: t("services.bandcamp"),
    spotify: t("services.spotify"),
    appleMusic: t("services.appleMusic"),
    deezer: t("services.deezer"),
    youtube: t("services.youtube"),
  };
  return (
    <section className="section section-sage" id="musik" aria-labelledby="music-title">
      <Stain
        shape="wolves"
        ghost
        color="var(--color-sage-paint)"
        className="left-1/2 top-1/2 h-[32rem] w-[44rem] -translate-x-1/2 -translate-y-1/2"
        opacity={0.1}
      />
      <Stain shape="sage" drift="a" className="right-0 top-0 h-[28rem] w-[26rem]" opacity={0.34} />
      <Stain shape="clay" drift="c" className="left-0 bottom-0 h-[24rem] w-[30rem]" opacity={0.22} />
      <div className="container">
        <h2 id="music-title" className="text-h2 font-semibold reveal">
          {t("heading")}
        </h2>
        <p className="measure mt-4 text-ink-soft reveal">{t("intro")}</p>

        <article className="mt-12 grid gap-8 md:grid-cols-12 md:gap-12 reveal">
          <div className="md:col-span-5">
            <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }} className="block">
              <Photo id={latest.cover} locale={locale} sizes="(min-width: 768px) 40vw, 100vw" className="sleeve-cover" priority={false} />
            </Link>
          </div>
          <div className="md:col-span-7">
            <h3 className="text-h2 font-semibold">
              <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }} className="no-underline hover:underline">
                {latest.title}
              </Link>
            </h3>
            <p className="mt-3 text-ink-soft">
              {t("latest")}: {t(`types.${latest.type}`)}, {latest.year}. {t("tracks", { count: latest.tracks.length })}.
            </p>
            <div className="mt-6">
              <TrackList locale={locale} tracks={latest.tracks} columns={2} />
            </div>
            <div className="mt-8">
              <StreamingLinks links={latest.links} labels={serviceLabels} buyLabel={t("buy")} />
            </div>
          </div>
        </article>

        <ul className="release-row reveal mt-16" aria-label={t("allReleases")}>
          {others.map((release) => (
            <li key={release.slug}>
              <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }} className="release-tile">
                <Photo id={release.cover} locale={locale} sizes="(min-width: 768px) 22vw, 45vw" className="sleeve-cover" />
                <span className="mt-3 block font-semibold leading-tight">{release.title}</span>
                <span className="block text-caption text-ink-soft">
                  {t(`types.${release.type}`)}, {release.year}
                </span>
              </Link>
            </li>
          ))}
          <li className="release-tile-more">
            <Link href="/music" className="sticker sticker-paper">
              {t("allReleases")}
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
