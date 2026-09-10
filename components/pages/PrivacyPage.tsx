import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function PrivacyPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  return (
    <main id="main">
      <h1>{t("privacy.title")}</h1>
    </main>
  );
}
