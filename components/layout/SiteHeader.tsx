import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { localizedPath } from "@/lib/i18n/paths";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const home = localizedPath(locale, "/");
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {t("skipToContent")}
      </a>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={t("homeLink")}>
          Brickwater
        </Link>
        <nav aria-label={t("mainNavigation")} className="site-nav">
          <Link href="/shows">{t("shows")}</Link>
          <Link href="/music">{t("music")}</Link>
          <a href={`${home}#videos`} className="hidden sm:inline">
            {t("videos")}
          </a>
          <a href={`${home}#kontakt`} className="hidden sm:inline">
            {t("contact")}
          </a>
          <LanguageSwitcher label={t("switchLanguage")} short={t("switchLanguageShort")} />
        </nav>
      </div>
    </header>
  );
}
