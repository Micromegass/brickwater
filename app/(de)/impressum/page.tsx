import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "de", pathname: "/legal-notice", key: "legal" });
}

export default function Page() {
  setRequestLocale("de");
  return <LegalPage locale="de" />;
}
