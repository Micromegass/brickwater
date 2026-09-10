import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "de", pathname: "/", key: "home" });
}

export default function Page() {
  setRequestLocale("de");
  return <HomePage locale="de" />;
}
