import { setRequestLocale } from "next-intl/server";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "de", pathname: "/gallery", key: "gallery" });
}

export default function Page() {
  setRequestLocale("de");
  return <GalleryPage locale="de" />;
}
