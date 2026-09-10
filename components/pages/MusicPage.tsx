import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadReleases } from "@/lib/content/load";

export async function MusicPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "music" });
  return (
    <main id="main">
      <h1>{t("heading")}</h1>
      <ul>
        {loadReleases().map((release) => (
          <li key={release.slug}>
            <Link href={{ pathname: "/music/[slug]", params: { slug: release.slug } }}>
              {release.title} ({release.year})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
