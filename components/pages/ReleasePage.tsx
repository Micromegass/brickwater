import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { BandcampFacade } from "@/components/embeds/BandcampFacade";
import { StreamingLinks } from "@/components/music/StreamingLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { getRelease, loadImages, loadReleases } from "@/lib/content/load";
import { absoluteUrl, localizedPath } from "@/lib/i18n/paths";
import { breadcrumbs, graph, musicAlbum } from "@/lib/seo/jsonld";

export async function ReleasePage({ locale, slug }: { locale: Locale; slug: string }) {
  const release = getRelease(slug);
  if (!release) notFound();
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const images = loadImages();
  const others = loadReleases().filter((r) => r.slug !== release.slug);
  const serviceLabels = {
    listenOn: t("music.listenOn"),
    bandcamp: t("social.bandcamp"),
    spotify: t("social.spotify"),
    appleMusic: t("social.appleMusic"),
    deezer: t("social.deezer"),
    youtube: t("social.youtube"),
  };
  const hasLyrics = release.tracks.some((track) => track.lyrics);
  const jsonLd = graph([
    breadcrumbs([
      { name: "Brickwater", url: absoluteUrl(localizedPath(locale, "/")) },
      { name: t("music.heading"), url: absoluteUrl(localizedPath(locale, "/music")) },
      { name: release.title, url: absoluteUrl(localizedPath(locale, "/music/[slug]", { slug: release.slug })) },
    ]),
    musicAlbum(release, locale),
  ]);

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <article>
        <section className="section pt-12 md:pt-16">
          <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Photo id={release.cover} locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" className="sleeve-cover" priority />
                {images[release.cover].credit ? <p className="etch mt-3 text-ink-soft">{images[release.cover].credit}</p> : null}
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-ink-soft">
                {t(`music.types.${release.type}`)}. {t("music.released", { date: format.dateTime(new Date(`${release.date}T12:00:00Z`), { day: "numeric", month: "long", year: "numeric" }) })}
                {release.label ? `. ${release.label}` : ""}
              </p>
              <h1 className="mt-3 text-display font-extrabold">{release.title}</h1>
              {release.description ? <p className="measure mt-6 text-h3 font-medium">{release.description[locale]}</p> : null}
              <div className="mt-8">
                <StreamingLinks links={release.links} labels={serviceLabels} buyLabel={t("music.buy")} />
              </div>
              {release.bandcampAlbumId || release.bandcampTrackId ? (
                <div className="mt-8">
                  <BandcampFacade
                    albumId={release.bandcampAlbumId}
                    trackId={release.bandcampTrackId}
                    trackCount={release.tracks.length}
                    title={t("music.player", { title: release.title })}
                    loadLabel={t("embeds.load")}
                    hint={t("embeds.bandcampHint")}
                    iframeTitle={t("embeds.iframeTitle", { title: release.title, provider: "Bandcamp" })}
                  />
                </div>
              ) : null}

              <h2 className="mt-14 text-h2 font-extrabold">{hasLyrics ? t("music.lyrics") : t("music.tracklist")}</h2>
              <ol className="mt-6 lyric-sheet">
                {release.tracks.map((track) =>
                  track.lyrics ? (
                    <li key={track.n}>
                      <details className="lyric-track" name="lyrics">
                        <summary>
                          <span className="tracklist-n">{track.n}</span>
                          <span className="lyric-title">{track.title}</span>
                          {track.duration ? <span className="tracklist-dur">{track.duration}</span> : null}
                        </summary>
                        <div className="lyric-body prose-lyrics" lang="en">
                          {track.lyrics.split(/\n{2,}/).map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </details>
                    </li>
                  ) : (
                    <li key={track.n} className="lyric-track lyric-track-static">
                      <span className="tracklist-n">{track.n}</span>
                      <span className="lyric-title">{track.title}</span>
                      {track.duration ? <span className="tracklist-dur">{track.duration}</span> : null}
                    </li>
                  ),
                )}
              </ol>

              {release.credits?.length ? (
                <>
                  <h2 className="mt-14 text-h3 font-extrabold">{t("music.credits")}</h2>
                  <ul className="mt-4 space-y-1 text-small text-ink-soft">
                    {release.credits.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {release.slug === "season-one" ? (
          <section className="section pt-0">
            <div className="container grid gap-6 md:grid-cols-2">
              {["brickwater-band-live-stage-lights-bw", "brickwater-band-live-stage-banner-bw"].map((id) => (
                <figure key={id}>
                  <Photo id={id} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" className="sleeve-photo" />
                  <figcaption className="etch mt-3 text-ink-soft">{images[id].credit}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section pt-0">
          <div className="container">
            <h2 className="text-h2 font-extrabold">{t("music.allReleases")}</h2>
            <ul className="release-row mt-8">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={{ pathname: "/music/[slug]", params: { slug: other.slug } }} className="release-tile">
                    <Photo id={other.cover} locale={locale} sizes="(min-width: 768px) 22vw, 45vw" className="sleeve-cover" />
                    <span className="mt-3 block font-semibold leading-tight">{other.title}</span>
                    <span className="block text-caption text-ink-soft">
                      {t(`music.types.${other.type}`)}, {other.year}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}
