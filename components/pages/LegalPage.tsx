import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function LegalPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  return (
    <main id="main">
      <h1>{t("legal.title")}</h1>
    </main>
  );
}
