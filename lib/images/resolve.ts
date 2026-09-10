export interface ImageManifestEntry {
  hash: string;
  width: number;
  height: number;
  widths: number[];
  blurDataURL: string;
}

export type ImageManifest = Record<string, ImageManifestEntry>;

export function imageKey(src: string): string {
  return src.replace(/^\/images\//, "");
}

/** Maps an image key and a requested width to a pre-generated WebP file. */
export function resolveImage(
  manifest: ImageManifest,
  src: string,
  width: number,
): string {
  const key = imageKey(src);
  const entry = manifest[key];
  if (!entry) {
    throw new Error(
      `Unknown image "${src}". Add the source to scripts/images.mjs and run npm run images.`,
    );
  }
  const chosen =
    entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  return `/images/${key}.${entry.hash}-${chosen}.webp`;
}
