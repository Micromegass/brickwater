import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadSite } from "@/lib/content/load";
import { withBase } from "@/lib/base-path";
import { localizedPath } from "@/lib/i18n/paths";
import { SocialIcon, type SocialKey } from "@/components/ui/SocialIcon";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SOCIALS: SocialKey[] = ["instagram", "bandcamp", "spotify", "appleMusic", "youtube"];

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  // Plain anchors, because they carry a fragment; they need the base path.
  const home = withBase(localizedPath(locale, "/"));
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {t("nav.skipToContent")}
      </a>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={t("nav.homeLink")}>
          {/*
            Decorative: the link already says Brickwater, in text and in its label.
            A plain img on purpose. next/image here would buy nothing: the mark is
            a fixed 26px asset that is never the largest paint, and it is generated
            by scripts/icons.mjs rather than the photo pipeline, so it has no entry
            in the manifest the custom loader resolves against.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/images/logo-mark.webp")}
            alt=""
            aria-hidden="true"
            width={26}
            height={26}
            className="brand-mark"
          />
          <span className="brand-text">Brickwater</span>
        </Link>
        <nav aria-label={t("nav.mainNavigation")} className="site-nav">
          <Link href="/shows">{t("nav.shows")}</Link>
          <Link href="/music">{t("nav.music")}</Link>
          <Link href="/gallery" className="hidden sm:inline">
            {t("nav.gallery")}
          </Link>
          <a href={`${home}#videos`} className="hidden sm:inline">
            {t("nav.videos")}
          </a>
          <a href={`${home}#kontakt`} className="hidden sm:inline">
            {t("nav.contact")}
          </a>
          <ul className="header-socials" aria-label={t("contact.follow")}>
            {SOCIALS.map((key) => (
              <li key={key}>
                <a href={site.socials[key]} rel="me noopener" aria-label={t(`social.${key}`)}>
                  <SocialIcon name={key} size={17} />
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher
            label={t("nav.switchLanguage")}
            short={t("nav.switchLanguageShort")}
          />
        </nav>
      </div>
    </header>
  );
}
