import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { loadBio } from "@/lib/content/load";
import { Stain } from "@/components/ui/Stain";

const STRIP: { id: string; position?: string }[] = [
  // The frame is square: three of these photos are square, so they show whole.
  // The tall stage portrait still says where the face sits.
  { id: "brickwater-live-red-light-2019" },
  { id: "brickwater-harmonica-live-2020" },
  { id: "brickwater-bricky-waters-stage-portrait-01", position: "object-[50%_10%]" },
  // Fourth slot: the client asked for InShot20200226_221538321.jpg, which is not
  // in assets/source. Standing in with the 2021 live shot until that file lands.
  { id: "brickwater-live-brick-wall-2021" },
];

export async function BioSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  const bio = loadBio(locale);
  return (
    <section className="section" aria-labelledby="bio-title">
      <Stain shape="sage" drift="c" className="left-0 top-8 h-[28rem] w-[24rem]" opacity={0.3} />
      <Stain shape="clay" drift="a" className="right-0 bottom-0 h-[24rem] w-[28rem]" opacity={0.18} />
      <div className="container">
        <div className="max-w-[46rem] reveal">
          <h2 id="bio-title" className="text-h2 font-semibold">
            {t("heading")}{" "}
            <span className="bio-heart" aria-hidden="true">
              ♡
            </span>
          </h2>
          <div className="mt-6 space-y-5 text-body">
            {bio.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="measure">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <ul className="photo-strip reveal mt-14 lg:mt-20" aria-label={t("photos")} tabIndex={0}>
          {STRIP.map((item) => (
            <li key={item.id}>
              <Photo
                id={item.id}
                locale={locale}
                sizes="(min-width: 1024px) 25vw, 70vw"
                className={`sleeve-photo aspect-square object-cover ${item.position ?? "object-center"}`}
              />
            </li>
          ))}
        </ul>
        <p className="mt-8 reveal">
          <Link href="/gallery" className="sticker sticker-paper">
            {t("allPhotos")}
          </Link>
        </p>
      </div>
    </section>
  );
}
