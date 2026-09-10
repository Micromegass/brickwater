import { readdirSync } from "node:fs";

export interface Route {
  path: string;
  lang: "de" | "en";
  counterpart: string;
  h1?: string;
}

const releases = readdirSync("content/releases").map((f) => f.replace(/\.json$/, ""));

export const ROUTES: Route[] = [
  { path: "/", lang: "de", counterpart: "/en/" },
  { path: "/konzerte/", lang: "de", counterpart: "/en/shows/" },
  { path: "/musik/", lang: "de", counterpart: "/en/music/" },
  { path: "/impressum/", lang: "de", counterpart: "/en/legal-notice/" },
  { path: "/datenschutz/", lang: "de", counterpart: "/en/privacy/" },
  { path: "/en/", lang: "en", counterpart: "/" },
  { path: "/en/shows/", lang: "en", counterpart: "/konzerte/" },
  { path: "/en/music/", lang: "en", counterpart: "/musik/" },
  { path: "/en/legal-notice/", lang: "en", counterpart: "/impressum/" },
  { path: "/en/privacy/", lang: "en", counterpart: "/datenschutz/" },
  ...releases.flatMap((slug): Route[] => [
    { path: `/musik/${slug}/`, lang: "de", counterpart: `/en/music/${slug}/` },
    { path: `/en/music/${slug}/`, lang: "en", counterpart: `/musik/${slug}/` },
  ]),
];

export const SITE = "https://www.brickwater.de";
