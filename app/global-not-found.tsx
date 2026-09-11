import type { Metadata } from "next";
import Link from "next/link";
import { Stain } from "@/components/ui/Stain";
import { assetVars } from "@/lib/assets";
import { bricolage } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Brickwater",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de" className={bricolage.variable} style={assetVars()}>
      <body>
        <main id="main" className="section">
          <Stain shape="clay" drift="a" className="right-0 top-0 h-[26rem] w-[30rem]" opacity={0.24} />
          <Stain shape="sage" drift="c" className="bottom-0 left-0 h-[22rem] w-[26rem]" opacity={0.18} />
          <div className="container">
            <p className="brand">Brickwater</p>
            <h1 className="mt-10 text-display font-semibold">Seite nicht gefunden</h1>
            <p className="measure mt-5 text-h3 text-ink-soft">Diese Seite gibt es nicht oder nicht mehr.</p>
            <p className="mt-8">
              <Link href="/" className="sticker sticker-clay">
                Zur Startseite
              </Link>
            </p>
            <section lang="en" className="mt-16 rule pt-10">
              <h2 className="text-h2 font-semibold">Page not found</h2>
              <p className="measure mt-4 text-ink-soft">This page does not exist, or not any more.</p>
              <p className="mt-6">
                <Link href="/en/" className="sticker sticker-paper">
                  Back to the start page
                </Link>
              </p>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
