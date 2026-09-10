import type { Metadata } from "next";
import Link from "next/link";
import { bricolage } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Brickwater",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de" className={bricolage.variable}>
      <body>
        <main id="main">
          <h1 className="font-display">Seite nicht gefunden</h1>
          <p>Diese Seite gibt es nicht oder nicht mehr.</p>
          <p>
            <Link href="/">Zur Startseite</Link>
          </p>
          <section lang="en">
            <h2>Page not found</h2>
            <p>This page does not exist, or not any more.</p>
            <p>
              <Link href="/en/">Back to the start page</Link>
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
