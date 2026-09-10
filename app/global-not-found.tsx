import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Brickwater",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <main id="main">
          <h1 className="font-display">Seite nicht gefunden</h1>
          <p>Diese Seite gibt es nicht oder nicht mehr.</p>
          <p>
            <a href="/">Zur Startseite</a>
          </p>
          <section lang="en">
            <h2>Page not found</h2>
            <p>This page does not exist, or not any more.</p>
            <p>
              <a href="/en/">Back to the start page</a>
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
