import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  ImagesSchema,
  ReleasesSchema,
  ShowsSchema,
  SiteSchema,
  type Release,
  type Show,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson(relativePath: string): unknown {
  return JSON.parse(readFileSync(path.join(CONTENT_DIR, relativePath), "utf8"));
}

let showsCache: Show[] | undefined;
let releasesCache: Release[] | undefined;

export function loadShows(): Show[] {
  showsCache ??= ShowsSchema.parse(readJson("shows.json"));
  return showsCache;
}

export function loadReleases(): Release[] {
  if (!releasesCache) {
    const dir = path.join(CONTENT_DIR, "releases");
    const raw = readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .sort()
      .map((file) => readJson(path.join("releases", file)));
    releasesCache = ReleasesSchema.parse(raw).sort((a, b) =>
      b.date.localeCompare(a.date),
    );
  }
  return releasesCache;
}

export function getRelease(slug: string): Release | undefined {
  return loadReleases().find((release) => release.slug === slug);
}

export function loadImages() {
  return ImagesSchema.parse(readJson("images.json"));
}

export function loadSite() {
  return SiteSchema.parse(readJson("site.json"));
}

export function loadBio(locale: "de" | "en") {
  return readJson(`bio/${locale}.json`) as {
    paragraphs: string[];
    short: string;
    fwn: string;
  };
}
