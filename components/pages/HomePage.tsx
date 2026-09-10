import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { loadBio, loadReleases } from "@/lib/content/load";

export async function HomePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const bio = loadBio(locale);
  const latest = loadReleases()[0];
  return (
    <main id="main">
      <h1 className="font-display text-6xl font-extrabold">Brickwater</h1>
      <p>{t("site.tagline")}</p>
      <nav aria-label={t("nav.mainNavigation")}>
        <Link href="/shows">{t("nav.shows")}</Link>{" "}
        <Link href="/music">{t("nav.music")}</Link>{" "}
        <Link href={{ pathname: "/music/[slug]", params: { slug: latest.slug } }}>
          {latest.title}
        </Link>{" "}
        <Link href="/legal-notice">{t("footer.legal")}</Link>{" "}
        <Link href="/privacy">{t("footer.privacy")}</Link>
      </nav>
      {bio.paragraphs.map((p) => (
        <p key={p.slice(0, 20)}>{p}</p>
      ))}
    </main>
  );
}
