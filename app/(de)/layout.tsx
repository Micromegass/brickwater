import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL } from "@/lib/i18n/paths";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Brickwater", template: "%s | Brickwater" },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function GermanLayout({ children }: { children: ReactNode }) {
  setRequestLocale("de");
  return <SiteShell locale="de">{children}</SiteShell>;
}
