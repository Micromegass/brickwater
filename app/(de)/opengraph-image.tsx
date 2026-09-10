import { getTranslations } from "next-intl/server";
import { OG_SIZE, renderOgImage } from "@/lib/seo/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Brickwater";

export default async function Image() {
  const t = await getTranslations({ locale: "de", namespace: "site" });
  return renderOgImage({ title: "Brickwater", subtitle: t("tagline") });
}
