import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadSite } from "@/lib/content/load";
import { localizedPath } from "@/lib/i18n/paths";
import { SocialIcon, type SocialKey } from "@/components/ui/SocialIcon";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SOCIALS: SocialKey[] = ["instagram", "bandcamp", "spotify", "appleMusic", "youtube"];

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const site = loadSite();
  const home = localizedPath(locale, "/");
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {t("nav.skipToContent")}
      </a>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={t("nav.homeLink")}>
          Brickwater
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
