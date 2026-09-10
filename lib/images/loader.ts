"use client";

import manifest from "./manifest.json";
import { resolveImage, type ImageManifest } from "./resolve";

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return resolveImage(manifest as ImageManifest, src, width);
}
