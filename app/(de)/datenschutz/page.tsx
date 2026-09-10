import { setRequestLocale } from "next-intl/server";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "de", pathname: "/privacy", key: "privacy" });
}

export default function Page() {
  setRequestLocale("de");
  return <PrivacyPage locale="de" />;
}
