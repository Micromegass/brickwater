import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { YouTubeFacade } from "@/components/embeds/YouTubeFacade";
import { loadSite } from "@/lib/content/load";
import { photoProps } from "@/lib/images/photo";
import { localizedPath } from "@/lib/i18n/paths";

export async function VideosSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  const official = site.videos.filter((v) => v.kind === "official");
  const sessions = site.videos.filter((v) => v.kind !== "official");
  const facade = (video: (typeof site.videos)[number], large: boolean) => (
    <YouTubeFacade
      key={video.id}
      id={video.id}
      title={`${video.title} (${video.year})`}
      poster={photoProps(video.poster, locale)}
      playLabel={t("videos.play", { title: video.title })}
      iframeTitle={t("embeds.iframeTitle", { title: video.title, provider: "YouTube" })}
      large={large}
    />
  );
  return (
    <section className="section" id="videos" aria-labelledby="videos-title">
      <div className="container">
        <h2 id="videos-title" className="text-h2 font-extrabold">
          {t("videos.heading")}
        </h2>
        <p className="measure mt-4 text-ink-soft">{t("videos.intro")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{official.map((v) => facade(v, true))}</div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{sessions.map((v) => facade(v, false))}</div>
        <p className="mt-6 text-caption text-ink-soft">
          {t("embeds.youtubeHint")}{" "}
          <a href={localizedPath(locale, "/privacy")} className="underline">
            {t("embeds.privacyLink")}
          </a>
        </p>
        <a href={site.socials.youtube} className="sticker sticker-paper mt-6" rel="noopener">
          {t("videos.channel")}
        </a>
      </div>
    </section>
  );
}
