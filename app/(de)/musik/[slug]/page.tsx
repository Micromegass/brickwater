import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReleasePage } from "@/components/pages/ReleasePage";
import { getRelease, loadReleases } from "@/lib/content/load";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return loadReleases().map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const release = getRelease(slug);
  const t = await getTranslations({ locale: "de", namespace: "meta" });
  const type = (await getTranslations({ locale: "de", namespace: "music.types" }))(
    release?.type ?? "album",
  );
  return pageMetadata({
    locale: "de",
    pathname: "/music/[slug]",
    params: { slug },
    ogKey: `release-${slug}`,
    title: t("release.title", { title: release?.title ?? slug, type, year: release?.year ?? "" }),
    description: t("release.description", { title: release?.title ?? slug, type, year: release?.year ?? "" }),
  });
}

export default async function Page({ params }: Props) {
  setRequestLocale("de");
  const { slug } = await params;
  return <ReleasePage locale="de" slug={slug} />;
}
