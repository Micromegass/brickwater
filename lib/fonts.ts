import localFont from "next/font/local";

export const displayFont = localFont({
  src: "../app/fonts/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../app/fonts/instrument-sans-latin-wght-normal.woff2",
      style: "normal",
      weight: "400 700",
    },
    {
      path: "../app/fonts/instrument-sans-latin-wght-italic.woff2",
      style: "italic",
      weight: "400 700",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
