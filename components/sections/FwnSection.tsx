import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Photo } from "@/components/ui/Photo";
import { loadBio, loadImages, loadSite } from "@/lib/content/load";

export async function FwnSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "fwn" });
  const site = loadSite();
  const bio = loadBio(locale);
  const images = loadImages();
  const ringText = "FOLK'S WORST NIGHTMARE      NÜRNBERG      ";
  return (
    <section className="section" aria-labelledby="fwn-title">
      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="roundel" aria-hidden="true">
            <svg className="roundel-ring" viewBox="0 0 200 200">
              <defs>
                <path id="fwn-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="roundel-text">
                <textPath href="#fwn-ring" startOffset="0">
                  {ringText}
                </textPath>
              </text>
            </svg>
            <div className="roundel-center">
              <Photo id="folks-worst-nightmare-logo" locale={locale} sizes="200px" className="roundel-logo" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 id="fwn-title" className="text-h2 font-extrabold">
            {t("heading")}
          </h2>
          <p className="measure mt-6">{bio.fwn}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.fwn.youtube} className="sticker sticker-ink" rel="noopener">
              {t("cta")}
            </a>
            <a href={site.fwn.bandcamp} className="sticker sticker-paper" rel="noopener">
              {t("bandcamp")}
            </a>
          </div>
          <figure className="mt-10 max-w-sm">
            <Photo id="folks-worst-nightmare-bricky-waters-and-friend" locale={locale} sizes="(min-width: 1024px) 24vw, 70vw" className="sleeve-photo" />
            <figcaption className="etch mt-3 text-ink-soft">
              {images["folks-worst-nightmare-bricky-waters-and-friend"].credit}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
