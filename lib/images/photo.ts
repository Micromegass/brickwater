import manifest from "./manifest.json";
import { loadImages } from "@/lib/content/load";
import type { Locale } from "@/i18n/routing";
import { resolveImage, type ImageManifest } from "./resolve";

export interface PhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  credit?: string;
}

/** Server-side lookup of everything next/image needs for a content image. */
export function photoProps(id: string, locale: Locale): PhotoProps {
  const entry = (manifest as ImageManifest)[id];
  const meta = loadImages()[id];
  if (!entry || !meta) throw new Error(`Unknown image "${id}"`);
  return {
    src: `/images/${id}`,
    alt: meta.alt[locale],
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
    credit: meta.credit,
  };
}

/** Absolute URL of the largest generated variant, for OG images and JSON-LD. */
export function photoUrl(id: string, width = 1600): string {
  return resolveImage(manifest as ImageManifest, id, width);
}
