import { setRequestLocale } from "next-intl/server";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "en", pathname: "/gallery", key: "gallery" });
}

export default function Page() {
  setRequestLocale("en");
  return <GalleryPage locale="en" />;
}
