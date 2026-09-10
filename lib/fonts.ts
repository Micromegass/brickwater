import localFont from "next/font/local";

/**
 * One family for everything: Bricolage Grotesque (OFL), variable axes
 * opsz 12-96, wdth 75-100, wght 200-800. Text sizes use opsz 12-14,
 * headings opsz 96; see globals.css.
 */
export const bricolage = localFont({
  src: "../app/fonts/bricolage-grotesque-variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});
