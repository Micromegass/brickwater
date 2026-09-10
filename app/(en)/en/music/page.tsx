import { setRequestLocale } from "next-intl/server";
import { MusicPage } from "@/components/pages/MusicPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "en", pathname: "/music", key: "music" });
}

export default function Page() {
  setRequestLocale("en");
  return <MusicPage locale="en" />;
}
