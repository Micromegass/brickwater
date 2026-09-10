// Builds the watercolour wash that fills the wordmark, from the Season One painting.
//
// The painting is averaged down to a small grid, which keeps where the salmon, the
// sage and the dark animal sit without keeping their outlines. Each cell then gets
// re-pigmented: its hue survives, its saturation and lightness are pulled into a
// narrow band so the wash always reads as paint at full strength and every part of
// a letter clears WCAG large-text contrast against the paper ground. Scaling that
// grid back up with a soft kernel gives the bleed.
//
// Run: npm run gen:wash
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "assets/source/old-site/cover2.png");
const OUT = path.join(ROOT, "public/images");
const PAPER = [0xf3, 0xf2, 0xf0];

// The painted animals sit in the middle band of the square sleeve.
const CROP = { left: 0.09, top: 0.19, width: 0.82, height: 0.57 };
const GRID = { width: 9, height: 6 };
// Lightness band every cell is pulled into, which is what keeps the wash legible.
const LIGHT = { min: 0.24, max: 0.39 };
// The painting mixes two pigment families and nothing else: the salmon animal and
// the sage one. Hues are snapped to these so that a nearly colourless cell cannot
// have a hue amplified into a colour the painter never used. The families carry
// very different saturation, exactly as they do in the palette: clay is a strong
// pigment, sage is a grey-green, and flattening both to one value is what turned
// an earlier attempt into camouflage.
const ANCHORS = [
  { hue: 0.042, sat: { min: 0.34, max: 0.5 } },
  { hue: 0.284, sat: { min: 0.09, max: 0.2 } },
];
const ANCHOR_SPREAD = 0.022;

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

const relativeLuminance = ([r, g, b]) =>
  [r, g, b]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);

const contrast = (a, b) => {
  const [x, y] = [relativeLuminance(a), relativeLuminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const lerp = (a, b, t) => a + (b - a) * t;

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
  const clamped = Math.max(-ANCHOR_SPREAD, Math.min(ANCHOR_SPREAD, drift));
  return [(family.hue + clamped + 1) % 1, strength];
}

if (!existsSync(SOURCE)) {
  console.error(`missing ${SOURCE}; keep the original sleeve in assets/source/old-site/`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const meta = await sharp(SOURCE).metadata();
const region = {
  left: Math.round(CROP.left * meta.width),
  top: Math.round(CROP.top * meta.height),
  width: Math.round(CROP.width * meta.width),
  height: Math.round(CROP.height * meta.height),
};

const { data: cells } = await sharp(SOURCE)
  .extract(region)
  .resize(GRID.width, GRID.height, { fit: "fill", kernel: "cubic" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pigment = Buffer.alloc(GRID.width * GRID.height * 3);
let lowest = Infinity;
let highest = 0;
for (let i = 0; i < cells.length; i += 3) {
  const [h, s, l] = rgbToHsl(cells[i], cells[i + 1], cells[i + 2]);
  const [hue, saturation] = snapPigment(h, s);
  // Light paper areas become the lightest pigment, the dark animal the deepest.
  const lightness = lerp(LIGHT.max, LIGHT.min, Math.min(1, Math.max(0, (0.95 - l) / 0.6)));
  const rgb = hslToRgb(hue, saturation, lightness);
  const ratio = contrast(rgb, PAPER);
  lowest = Math.min(lowest, ratio);
  highest = Math.max(highest, ratio);
  pigment.set(rgb, i);
}

async function wash(width, height, blur, file) {
  await sharp(pigment, { raw: { width: GRID.width, height: GRID.height, channels: 3 } })
    .resize(width, height, { fit: "fill", kernel: "lanczos3" })
    .blur(blur)
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(OUT, file));
  console.log(`${file}: ${width}x${height}`);
}

// Wide wash for the wordmark, square one for the icons.
await wash(1400, 900, 26, "wash-wordmark.webp");
await wash(512, 512, 12, "wash-icon.webp");

console.log(
  `contrast against paper: ${lowest.toFixed(2)}:1 at the palest, ${highest.toFixed(2)}:1 at the deepest`,
);
if (lowest < 3) {
  console.error("wash is too pale for large text (needs 3:1); lower LIGHT.max");
  process.exit(1);
}
