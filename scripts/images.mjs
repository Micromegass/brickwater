// Image pipeline: assets/source/* -> public/images/<key>.<hash>-<w>.webp + lib/images/manifest.json
// Idempotent: unchanged sources (same content hash) are skipped.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/source");
const OUT = path.join(ROOT, "public/images");
const MANIFEST = path.join(ROOT, "lib/images/manifest.json");
const WIDTHS = [640, 1024, 1600, 2400];
const QUALITY = 82;

/** [source relative to assets/source, output key, options] */
const SOURCES = [
  ["20260908_133140.jpg", "brickwater-bricky-waters-park-stairs"],
  ["20260908_133337.jpg", "brickwater-bricky-waters-fence-standing-01"],
  ["20260908_133410.jpg", "brickwater-bricky-waters-fence-standing-02"],
  ["20260908_133446.jpg", "brickwater-bricky-waters-fence-sitting-01"],
  ["20260908_133747.jpg", "brickwater-bricky-waters-fence-sitting-02"],
  ["20260908_133844.jpg", "brickwater-bricky-waters-fence-sitting-03"],
  ["20260908_143017.jpg", "brickwater-biergarten-guitar-01"],
  ["20260908_143126.jpg", "brickwater-biergarten-guitar-02"],
  ["20260908_144549.jpg", "brickwater-bricky-waters-stage-portrait-01"],
  ["20260908_145018.jpg", "brickwater-bricky-waters-stage-portrait-02"],
  ["signal-2026-08-03-08-09-41-001.jpg", "folks-worst-nightmare-bricky-waters-and-friend"],
  ["folks-worst-nightmare-logo.png", "folks-worst-nightmare-logo"],
  ["fwn_logo-invert.jpg", "folks-worst-nightmare-logo-inverted"],
  ["InShot_20191205_123750774.jpg", "brickwater-live-red-light-2019", { trim: true }],
  ["InShot_20191224_143117271.jpg", "bricky-waters-portrait-bw-2019", { trim: true }],
  ["InShot_20200221_131538509.jpg", "brickwater-harmonica-live-2020"],
  ["InShot_20200305_172149317.jpg", "bricky-waters-cat-mural-2020"],
  ["InShot_20210512_084810614.jpg", "brickwater-live-brick-wall-2021", { trim: true }],
  ["old-site/slider3.jpg", "brickwater-band-live-stage-lights-bw"],
  ["old-site/slider5.jpg", "brickwater-band-live-stage-banner-bw"],
  ["old-site/cover2.png", "brickwater-season-one-album-cover"],
  ["covers/against-couragefalls.jpg", "brickwater-against-couragefalls-album-cover"],
  ["covers/aloah-from-brickwater.jpg", "brickwater-aloah-from-brickwater-ep-cover"],
  ["covers/jumping-just-to-fall.jpg", "brickwater-jumping-just-to-fall-single-cover"],
  ["video/ugmcmAWwCs8.jpg", "video-starving-poster"],
  ["video/fHqmfA3HigQ.jpg", "video-jumping-just-to-fall-poster"],
  ["video/xkvlwDs2us8.jpg", "video-medicine-acoustic-poster"],
  ["video/XdVo2prR4Iw.jpg", "video-lower-the-blinds-poster"],
  ["video/mS8wLzoCRVE.jpg", "video-one-more-night-of-heavy-drinking-poster"],
  ["video/MR0gtfG36Vc.jpg", "video-stuck-in-the-rocknroll-office-poster"],
];

mkdirSync(OUT, { recursive: true });
mkdirSync(path.dirname(MANIFEST), { recursive: true });
const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const manifest = {};
const keep = new Set();

for (const [rel, key, options = {}] of SOURCES) {
  const file = path.join(SRC, rel);
  if (!existsSync(file)) {
    console.warn(`skip ${key}: missing source ${rel}`);
    continue;
  }
  const buffer = readFileSync(file);
  const hash = createHash("sha1").update(buffer).update(JSON.stringify(options)).digest("hex").slice(0, 8);

  let base = sharp(buffer, { failOn: "none" }).rotate();
  if (options.trim) base = base.trim({ threshold: 40 });
  const meta = await base.clone().toBuffer({ resolveWithObject: true });
  const { width, height } = meta.info;
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, 2400));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  const outputs = unique.map((w) => path.join(OUT, `${key}.${hash}-${w}.webp`));
  outputs.forEach((f) => keep.add(path.basename(f)));

  const prev = previous[key];
  const upToDate = prev && prev.hash === hash && outputs.every((f) => existsSync(f));
  if (!upToDate) {
    await Promise.all(
      unique.map((w, i) =>
        sharp(meta.data)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 5 })
          .toFile(outputs[i]),
      ),
    );
    console.log(`built ${key} (${width}x${height}) -> ${unique.join("/")}`);
  }

  const blur = await sharp(meta.data).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  manifest[key] = {
    hash,
    width,
    height,
    widths: unique,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

// remove stale outputs
for (const f of readdirSync(OUT)) {
  if (f.endsWith(".webp") && !keep.has(f)) {
    unlinkSync(path.join(OUT, f));
    console.log(`removed stale ${f}`);
  }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest: ${Object.keys(manifest).length} images`);
