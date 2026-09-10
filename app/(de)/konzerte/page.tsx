import { setRequestLocale } from "next-intl/server";
import { ShowsPage } from "@/components/pages/ShowsPage";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return pageMetadata({ locale: "de", pathname: "/shows", key: "shows" });
}

export default function Page() {
  setRequestLocale("de");
  return <ShowsPage locale="de" />;
}
