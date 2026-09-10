import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { StreamingLinks } from "@/components/music/StreamingLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { loadReleases, loadSite } from "@/lib/content/load";
import { absoluteUrl, localizedPath } from "@/lib/i18n/paths";
import { breadcrumbs, graph, musicAlbum } from "@/lib/seo/jsonld";

export async function MusicPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const releases = loadReleases();
  const site = loadSite();
  const serviceLabels = {
    listenOn: t("music.listenOn"),
    bandcamp: t("social.bandcamp"),
    spotify: t("social.spotify"),
    appleMusic: t("social.appleMusic"),
    deezer: t("social.deezer"),
    youtube: t("social.youtube"),
  };
  const jsonLd = graph([
    breadcrumbs([
      { name: "Brickwater", url: absoluteUrl(localizedPath(locale, "/")) },
      { name: t("music.heading"), url: absoluteUrl(localizedPath(locale, "/music")) },
    ]),
    ...releases.map((release) => musicAlbum(release, locale)),
  ]);
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <h1 className="text-display font-semibold">{t("music.heading")}</h1>
          <p className="measure mt-5 text-h3 text-ink-soft">{t("music.intro")}</p>
          <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {releases.map((release) => (
              <li key={release.slug} className="grid gap-6 sm:grid-cols-12">
                <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }} className="sm:col-span-5">
                  <Photo id={release.cover} locale={locale} sizes="(min-width: 768px) 20vw, (min-width: 640px) 40vw, 100vw" className="sleeve-cover" />
                </Link>
                <div className="sm:col-span-7">
                  <h2 className="text-h3 font-semibold">
                    <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }} className="no-underline hover:underline">
                      {release.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-ink-soft">
                    {t(`music.types.${release.type}`)}, {release.year}. {t("music.tracks", { count: release.tracks.length })}.
                  </p>
                  {release.description ? <p className="mt-3 text-small">{release.description[locale]}</p> : null}
                  <div className="mt-4">
                    <StreamingLinks links={release.links} labels={serviceLabels} />
                  </div>
                  <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }} className="mt-4 inline-block font-semibold underline">
                    {t("music.detail")}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container">
          <h2 className="text-h2 font-semibold">{t("music.appearsOn")}</h2>
          <ul className="mt-8 max-w-3xl">
            {site.appearsOn.map((item) => (
              <li key={item.url} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="text-ink-soft tabular-nums">{item.year}</span>
                <span>
                  <a href={item.url} className="font-semibold underline" rel="noopener">
                    {item.title}
                  </a>
                  <span className="block text-small text-ink-soft">{item.track}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
