// Everything the site paints with, mixed from the sleeves themselves.
//
// 1. The wash that fills the wordmark, from the Season One painting.
// 2. Watercolour stains: the same paint with the paper dissolved away, so the
//    page can carry real pigment marks instead of drawn shapes.
// 3. A palette per release, sampled from that record's own cover, so every
//    album page wears its own record while keeping the site's structure.
//
// Every colour that ends up behind or under text is contrast-checked here, and
// the script exits non-zero rather than shipping something unreadable.
//
// Run: npm run gen:pigments
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SLEEVE = path.join(ROOT, "assets/source/old-site/cover2.png");
const OUT = path.join(ROOT, "public/images");
const PALETTE_FILE = path.join(ROOT, "lib/releases/palette.json");
const PAPER = "#f3f2f0";

const COVERS = {
  "season-one": "assets/source/old-site/cover2.png",
  "jumping-just-to-fall": "assets/source/covers/jumping-just-to-fall.jpg",
  "against-couragefalls": "assets/source/covers/against-couragefalls.jpg",
  "aloah-from-brickwater": "assets/source/covers/aloah-from-brickwater.jpg",
};

// The painted animals sit in the middle band of the square sleeve.
const CROP = { left: 0.09, top: 0.19, width: 0.82, height: 0.57 };
const GRID = { width: 9, height: 6 };
const LIGHT = { min: 0.24, max: 0.39 };
// The painting mixes two pigment families and nothing else. Hues snap onto them
// so a nearly colourless cell cannot be amplified into a colour nobody painted.
const ANCHORS = [
  { hue: 0.042, sat: { min: 0.34, max: 0.5 } },
  { hue: 0.284, sat: { min: 0.09, max: 0.2 } },
];
const ANCHOR_SPREAD = 0.022;

/* ---------- colour helpers ---------- */

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(h + 1 / 3), channel(h), channel(h - 1 / 3)].map((v) => Math.round(v * 255));
}

const toHex = ([r, g, b]) =>
  `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

const fromHex = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const relativeLuminance = (rgb) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);

function contrast(a, b) {
  const [x, y] = [relativeLuminance(typeof a === "string" ? fromHex(a) : a),
    relativeLuminance(typeof b === "string" ? fromHex(b) : b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const hueDistance = (a, b) => {
  const d = Math.abs(a - b) % 1;
  return Math.min(d, 1 - d);
};

/** Pulls a cell onto the nearer pigment family, keeping a little of its own drift. */
function snapPigment(hue, saturation) {
  const family = ANCHORS.reduce((best, candidate) =>
    hueDistance(hue, candidate.hue) < hueDistance(hue, best.hue) ? candidate : best,
  );
  const strength = lerp(family.sat.min, family.sat.max, Math.min(1, saturation / 0.45));
  if (saturation < 0.1) return [family.hue, family.sat.min];
  let drift = hue - family.hue;
  if (drift > 0.5) drift -= 1;
  if (drift < -0.5) drift += 1;
  return [(family.hue + clamp(drift, -ANCHOR_SPREAD, ANCHOR_SPREAD) + 1) % 1, strength];
}

/* ---------- 1. the wordmark wash ---------- */

async function buildWash() {
  const meta = await sharp(SLEEVE).metadata();
  const region = {
    left: Math.round(CROP.left * meta.width),
    top: Math.round(CROP.top * meta.height),
    width: Math.round(CROP.width * meta.width),
    height: Math.round(CROP.height * meta.height),
  };

  const { data: cells } = await sharp(SLEEVE)
    .extract(region)
    .resize(GRID.width, GRID.height, { fit: "fill", kernel: "cubic" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pigment = Buffer.alloc(GRID.width * GRID.height * 3);
  let palest = Infinity;
  let deepest = 0;
  for (let i = 0; i < cells.length; i += 3) {
    const [h, s, l] = rgbToHsl(cells[i], cells[i + 1], cells[i + 2]);
    const [hue, saturation] = snapPigment(h, s);
    const lightness = lerp(LIGHT.max, LIGHT.min, clamp((0.95 - l) / 0.6, 0, 1));
    const rgb = hslToRgb(hue, saturation, lightness);
    const ratio = contrast(rgb, PAPER);
    palest = Math.min(palest, ratio);
    deepest = Math.max(deepest, ratio);
    pigment.set(rgb, i);
  }

  const write = async (width, height, blur, file) => {
    await sharp(pigment, { raw: { width: GRID.width, height: GRID.height, channels: 3 } })
      .resize(width, height, { fit: "fill", kernel: "lanczos3" })
      .blur(blur)
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(OUT, file));
  };
  await write(1400, 900, 26, "wash-wordmark.webp");
  await write(512, 512, 12, "wash-icon.webp");

  console.log(
    `wash: ${palest.toFixed(2)}:1 at the palest, ${deepest.toFixed(2)}:1 at the deepest`,
  );
  if (palest < 3) {
    console.error("wash is too pale for large text (needs 3:1); lower LIGHT.max");
    process.exit(1);
  }
}

/* ---------- 2. the stains ---------- */

// Regions of the sleeve whose paint becomes a mark on the page. Each keeps the
// brush edges of the original; only the paper is dissolved away.
const STAINS = [
  { name: "clay", region: { left: 0.42, top: 0.28, width: 0.32, height: 0.24 }, tint: "#a8563c" },
  { name: "sage", region: { left: 0.6, top: 0.13, width: 0.32, height: 0.28 }, tint: "#5b6a55" },
  { name: "ink", region: { left: 0.18, top: 0.5, width: 0.34, height: 0.26 }, tint: "#4a423b" },
];

async function buildStains() {
  const meta = await sharp(SLEEVE).metadata();
  for (const stain of STAINS) {
    const region = {
      left: Math.round(stain.region.left * meta.width),
      top: Math.round(stain.region.top * meta.height),
      width: Math.round(stain.region.width * meta.width),
      height: Math.round(stain.region.height * meta.height),
    };
    const size = { width: 900, height: Math.round((900 * region.height) / region.width) };

    // The paint's own density becomes the alpha: white paper disappears,
    // pigment stays, and the brush edge survives as a soft boundary.
    const { data, info } = await sharp(SLEEVE)
      .extract(region)
      .resize(size.width, size.height, { fit: "fill" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const alpha = Buffer.alloc(info.width * info.height);
    for (let i = 0, p = 0; i < data.length; i += info.channels, p += 1) {
      const luminance = relativeLuminance([data[i], data[i + 1], data[i + 2]]);
      const x = (p % info.width) / info.width;
      const y = Math.floor(p / info.width) / info.height;
      // A crop cuts through paint and would leave a rectangle with hard sides.
      // Fading every edge, and the corners hardest, keeps the mark a mark.
      const edge =
        smoothstep(0, 0.3, x) *
        smoothstep(0, 0.3, 1 - x) *
        smoothstep(0, 0.3, y) *
        smoothstep(0, 0.3, 1 - y);
      const radius = Math.hypot((x - 0.5) * 2, (y - 0.5) * 2) / Math.SQRT2;
      const round = 1 - smoothstep(0.5, 1, radius);
      alpha[p] = Math.round(clamp((1 - luminance) ** 1.2 * 1.35, 0, 1) * edge * round * 255);
    }
    const softAlpha = await sharp(alpha, {
      raw: { width: info.width, height: info.height, channels: 1 },
    })
      .blur(9)
      // sharp promotes a single band to sRGB unless told otherwise, and a
      // three-channel buffer read back as one stripes the mask.
      .toColourspace("b-w")
      .raw()
      .toBuffer();

    const [r, g, b] = fromHex(stain.tint);
    await sharp({
      create: { width: info.width, height: info.height, channels: 3, background: { r, g, b } },
    })
      .joinChannel(softAlpha, { raw: { width: info.width, height: info.height, channels: 1 } })
      .webp({ quality: 82, effort: 6, alphaQuality: 90 })
      .toFile(path.join(OUT, `stain-${stain.name}.webp`));
    console.log(`stain-${stain.name}.webp: ${info.width}x${info.height}`);
  }
}

/* ---------- 3. a palette per release ---------- */

/** The most present painted colour on a sleeve, ignoring paper and near-neutrals. */
async function dominantHue(file) {
  const { data, info } = await sharp(file)
    .resize(120, 120, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    if (s < 0.16 || l > 0.93 || l < 0.06) continue;
    const key = Math.round(h * 36);
    const entry = buckets.get(key) ?? { n: 0, h: 0, s: 0 };
    entry.n += 1;
    entry.h += h;
    entry.s += s;
    buckets.set(key, entry);
  }
  if (buckets.size === 0) return [0.042, 0.4];
  const top = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  return [top.h / top.n, top.s / top.n];
}

async function buildReleasePalettes() {
  const palette = {};
  for (const [slug, file] of Object.entries(COVERS)) {
    if (!existsSync(path.join(ROOT, file))) {
      console.error(`missing cover for ${slug}: ${file}`);
      process.exit(1);
    }
    const [hue, saturation] = await dominantHue(path.join(ROOT, file));
    const strength = clamp(saturation, 0.24, 0.52);

    // Deepen until the accent carries body text on paper, then keep going no further.
    let accent = null;
    for (let lightness = 0.42; lightness >= 0.16; lightness -= 0.01) {
      const candidate = hslToRgb(hue, strength, lightness);
      if (contrast(candidate, PAPER) >= 4.6) {
        accent = candidate;
        break;
      }
    }
    if (!accent) accent = hslToRgb(hue, strength, 0.2);
    const [, , accentLightness] = rgbToHsl(...accent);

    const entry = {
      accent: toHex(accent),
      accentDeep: toHex(hslToRgb(hue, strength, Math.max(0.12, accentLightness - 0.07))),
      wash: toHex(hslToRgb(hue, Math.min(0.3, strength), 0.945)),
      stain: toHex(hslToRgb(hue, strength, 0.42)),
      contrast: Number(contrast(accent, PAPER).toFixed(2)),
    };
    palette[slug] = entry;
    console.log(
      `${slug.padEnd(22)} accent ${entry.accent} (${entry.contrast}:1)  wash ${entry.wash}  stain ${entry.stain}`,
    );
    if (entry.contrast < 4.5) {
      console.error(`${slug}: accent does not carry text on paper`);
      process.exit(1);
    }
    if (contrast(entry.wash, "#222222") < 12) {
      console.error(`${slug}: wash is too dark to sit under ink`);
      process.exit(1);
    }
  }
  mkdirSync(path.dirname(PALETTE_FILE), { recursive: true });
  writeFileSync(PALETTE_FILE, `${JSON.stringify(palette, null, 2)}\n`);
}

/* ---------- run ---------- */

if (!existsSync(SLEEVE)) {
  console.error(`missing ${SLEEVE}; keep the original sleeve in assets/source/old-site/`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

await buildWash();
await buildStains();
await buildReleasePalettes();
