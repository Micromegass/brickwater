import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { YouTubeFacade } from "@/components/embeds/YouTubeFacade";
import { loadSite } from "@/lib/content/load";
import { photoProps } from "@/lib/images/photo";
import { localizedPath } from "@/lib/i18n/paths";
import { Stain } from "@/components/ui/Stain";

export async function VideosSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  return (
    <section className="section" id="videos" aria-labelledby="videos-title">
      <Stain shape="ink" drift="b" className="right-0 bottom-0 h-[22rem] w-[28rem]" opacity={0.16} />
      <Stain shape="clay" drift="c" className="left-0 top-0 h-[20rem] w-[24rem]" opacity={0.16} />
      <div className="container">
        <h2 id="videos-title" className="text-h2 font-semibold reveal">
          {t("videos.heading")}
        </h2>
        <p className="measure mt-4 text-ink-soft reveal">{t("videos.intro")}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3 reveal">
          {site.videos.map((video) => (
            <YouTubeFacade
              key={video.id}
              id={video.id}
              title={`${video.title} (${video.year})`}
              poster={photoProps(video.poster, locale)}
              playLabel={t("videos.play", { title: video.title })}
              iframeTitle={t("embeds.iframeTitle", { title: video.title, provider: "YouTube" })}
            />
          ))}
        </div>
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
