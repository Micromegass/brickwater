import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { StreamingLinks } from "@/components/music/StreamingLinks";
import { Photo } from "@/components/ui/Photo";
import { loadReleases } from "@/lib/content/load";

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
    <section className="section section-water" id="musik" aria-labelledby="music-title">
      <div className="container">
        <h2 id="music-title" className="text-h2 font-extrabold">
          {t("heading")}
        </h2>
        <p className="measure mt-4 text-water-wash">{t("intro")}</p>

        <article className="mt-12 grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }} className="block">
              <Photo id={latest.cover} locale={locale} sizes="(min-width: 768px) 40vw, 100vw" className="sleeve-cover" priority={false} />
            </Link>
          </div>
          <div className="md:col-span-7">
            <p className="text-caption font-semibold text-water-wash">
              {t("latest")}
            </p>
            <h3 className="mt-2 text-h2 font-extrabold">
              <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }} className="no-underline hover:underline">
                {latest.title}
              </Link>
            </h3>
            <p className="mt-2 text-water-wash">
              {t(`types.${latest.type}`)}, {latest.year}. {t("tracks", { count: latest.tracks.length })}.
            </p>
            <ol className="tracklist mt-6" aria-label={t("tracklist")}>
              {latest.tracks.map((track) => (
                <li key={track.n}>
                  <span className="tracklist-n">{track.n}</span>
                  <span className="tracklist-title">{track.title}</span>
                  {track.duration ? <span className="tracklist-dur">{track.duration}</span> : null}
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <StreamingLinks links={latest.links} labels={serviceLabels} buyLabel={t("buy")} variant="outline" />
            </div>
          </div>
        </article>

        <ul className="release-row mt-16" aria-label={t("allReleases")}>
          {others.map((release) => (
            <li key={release.slug}>
              <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }} className="release-tile">
                <Photo id={release.cover} locale={locale} sizes="(min-width: 768px) 22vw, 45vw" className="sleeve-cover" />
                <span className="mt-3 block font-semibold leading-tight">{release.title}</span>
                <span className="block text-caption text-water-wash">
                  {t(`types.${release.type}`)}, {release.year}
                </span>
              </Link>
            </li>
          ))}
          <li className="release-tile-more">
            <Link href="/music" className="sticker sticker-outline-paper">
              {t("allReleases")}
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
