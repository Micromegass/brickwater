import { setRequestLocale } from "next-intl/server";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "en", pathname: "/privacy", key: "privacy" });
}

export default function Page() {
  setRequestLocale("en");
  return <PrivacyPage locale="en" />;
}
