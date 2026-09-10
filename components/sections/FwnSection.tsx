import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Photo } from "@/components/ui/Photo";
import { loadBio, loadImages, loadSite } from "@/lib/content/load";

export async function FwnSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "fwn" });
  const site = loadSite();
  const bio = loadBio(locale);
  const images = loadImages();
  return (
    <section className="section" aria-labelledby="fwn-title">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="lg:col-span-5">
            <Photo
              id="folks-worst-nightmare-illustration"
              locale={locale}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="sleeve-photo"
            />
            <figcaption className="etch mt-3 text-ink-soft">
              {images["folks-worst-nightmare-illustration"].credit}
            </figcaption>
          </figure>
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
          </div>
        </div>
        <figure className="mt-12 lg:mt-16">
          <Photo
            id="folks-worst-nightmare-collective"
            locale={locale}
            sizes="100vw"
            className="sleeve-photo"
          />
        </figure>
      </div>
    </section>
  );
}
