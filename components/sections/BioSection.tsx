import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/Photo";
import { loadBio, loadImages } from "@/lib/content/load";
import { Stain } from "@/components/ui/Stain";

const STRIP = [
  "brickwater-live-red-light-2019",
  "brickwater-harmonica-live-2020",
  "brickwater-bricky-waters-stage-portrait-01",
  // Fourth slot: the client asked for InShot20200226_221538321.jpg, which is not
  // in assets/source. Standing in with the 2021 live shot until that file lands.
  "brickwater-live-brick-wall-2021",
];

export async function BioSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  const bio = loadBio(locale);
  const images = loadImages();
  return (
    <section className="section" aria-labelledby="bio-title">
      <Stain shape="sage" className="left-0 top-12 h-[26rem] w-[22rem]" opacity={0.26} />
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="lg:col-span-6">
            <Photo
              id="bricky-waters-cat-mural-2020"
              locale={locale}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="sleeve-photo aspect-[4/5] object-cover object-center"
            />
            <figcaption className="etch mt-3 text-ink-soft">
              {images["bricky-waters-cat-mural-2020"].credit}
            </figcaption>
          </figure>
          <div className="lg:col-span-6 lg:pt-6">
            <h2 id="bio-title" className="text-h2 font-semibold">
              {t("heading")}
            </h2>
            <div className="mt-8 space-y-5 text-body">
              {bio.paragraphs.map((paragraph, i) =>
                paragraph === "♡" ? (
                  <p key={i} className="text-clay text-2xl" aria-hidden="true">
                    ♡
                  </p>
                ) : (
                  <p key={i} className="measure">
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
        <ul className="photo-strip mt-14 lg:mt-20" aria-label={t("photos")} tabIndex={0}>
          {STRIP.map((id) => (
            <li key={id}>
              <Photo id={id} locale={locale} sizes="(min-width: 1024px) 25vw, 70vw" className="sleeve-photo aspect-[4/3] object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
