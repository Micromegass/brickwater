import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="etch">{t("footer.rights", { year })}</p>
        <p className="etch">
          {t("footer.photoCredits")}: Arne Marenda Fotografie, Barham Ismail, Brickwater
        </p>
        <nav aria-label={t("footer.legal")} className="site-footer-nav etch">
          <Link href="/legal-notice">{t("footer.legal")}</Link>
          <Link href="/privacy">{t("footer.privacy")}</Link>
        </nav>
      </div>
    </footer>
  );
}
