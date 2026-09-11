import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Lightbox } from "@/components/ui/Lightbox";
import { Photo } from "@/components/ui/Photo";
import { Stain } from "@/components/ui/Stain";
import { loadImages, loadSite } from "@/lib/content/load";
import { absoluteUrl, localizedPath } from "@/lib/i18n/paths";
import { breadcrumbs, graph } from "@/lib/seo/jsonld";

export async function GalleryPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  const images = loadImages();
  const jsonLd = graph([
    breadcrumbs([
      { name: "Brickwater", url: absoluteUrl(localizedPath(locale, "/")) },
      { name: t("gallery.heading"), url: absoluteUrl(localizedPath(locale, "/gallery")) },
    ]),
  ]);

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <section className="section pt-10 md:pt-14" aria-labelledby="gallery-title">
        <Stain shape="clay" drift="b" className="right-0 top-0 h-[26rem] w-[30rem]" opacity={0.24} />
        <Stain shape="sage" drift="c" className="bottom-0 left-0 h-[24rem] w-[26rem]" opacity={0.22} />
        <div className="container">
          <h1 id="gallery-title" className="text-display font-semibold reveal">
            {t("gallery.heading")}
          </h1>
          <p className="measure mt-4 text-lead text-ink-soft reveal">{t("gallery.intro")}</p>
          <div className="gallery mt-12">
            {site.gallery.map((id) => {
              const meta = images[id];
              const foreignCredit = meta.credit && !meta.credit.includes(site.name);
              return (
                <div key={id} className="gallery-cell reveal">
                  <Lightbox
                    label={t("gallery.open", { title: meta.alt[locale] })}
                    closeLabel={t("gallery.close")}
                    credit={meta.credit}
                    thumbnail={
                      <Photo
                        id={id}
                        locale={locale}
                        alt=""
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
                        className="sleeve-photo"
                      />
                    }
                    full={
                      <Photo
                        id={id}
                        locale={locale}
                        sizes="(min-width: 1280px) 70vw, 92vw"
                        className="lightbox-photo"
                      />
                    }
                  />
                  {foreignCredit ? <p className="etch mt-2 text-ink-soft">{meta.credit}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
