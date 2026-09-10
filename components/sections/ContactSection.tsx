import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Photo } from "@/components/ui/Photo";
import { SocialIcon, type SocialKey } from "@/components/ui/SocialIcon";
import { loadSite } from "@/lib/content/load";

const SOCIAL_ORDER: SocialKey[] = ["instagram", "bandcamp", "spotify", "appleMusic", "youtube", "deezer"];

export async function ContactSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  return (
    <section className="section" id="kontakt" aria-labelledby="contact-title">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="text-h2 font-extrabold">
            {t("contact.heading")}
          </h2>
          <p className="measure mt-4 text-ink-soft">{t("contact.text")}</p>
          <a href={`mailto:${site.email}`} className="contact-email">
            {site.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="sticker sticker-clay">
              {t("contact.email")}
            </a>
            <CopyEmail email={site.email} label={t("contact.copy")} done={t("contact.copied")} />
          </div>
          <ul className="sticker-sheet mt-12" aria-label={t("contact.follow")}>
            {SOCIAL_ORDER.map((key) => (
              <li key={key}>
                <a href={site.socials[key]} className="sticker sticker-paper" rel="me noopener">
                  <SocialIcon name={key} />
                  {t(`social.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <figure className="lg:col-span-5">
          <Photo id="brickwater-bricky-waters-stage-portrait-02" locale={locale} sizes="(min-width: 1024px) 38vw, 100vw" className="sleeve-photo" />
        </figure>
      </div>
    </section>
  );
}
