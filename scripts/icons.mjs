// The artist's own logo, prepared for the two places it appears: the browser
// tab and the header beside the wordmark.
//
// The original is black line art on a white square. White is not the same
// colour as this site's paper, so pasting it in would show a pale square on a
// warm ground. Instead the paint's own density becomes an alpha channel, the
// way every other generated asset here is made: the ink survives, the white
// disappears, and because the emblem is circular the corners crop themselves.
//
// The tab icon keeps an opaque paper ground behind the ink. A transparent
// favicon vanishes on a dark tab strip, which is the one place we cannot
// choose the background.
//
// Run: npm run gen:icons
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGO = path.join(ROOT, "assets/source/logo.png");
const PAPER = { r: 0xf3, g: 0xf2, b: 0xf0, alpha: 1 };
const INK = { r: 0x22, g: 0x22, b: 0x22 };
const MASTER = 1024;

if (!existsSync(LOGO)) {
  console.error(`missing ${LOGO}; keep the logo in assets/source/logo.png`);
  process.exit(1);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** The logo as ink with a real alpha channel: white paper dissolved away. */
async function inkLayer(size) {
  const { data, info } = await sharp(LOGO)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(size * size);
  for (let i = 0, p = 0; i < data.length; i += info.channels, p += 1) {
    const luminance = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    // Paper is not pure white once it has been through a scanner, so the floor
    // sits a little above zero; the ceiling keeps the line work fully opaque.
    alpha[p] = Math.round(smoothstep(0.06, 0.62, 1 - luminance) * 255);
  }

  return sharp({ create: { width: size, height: size, channels: 3, background: INK } })
    .joinChannel(alpha, { raw: { width: size, height: size, channels: 1 } })
    .png()
    .toBuffer();
}

/** Ink on the site's paper, for the tab. */
async function onPaper(size) {
  const ink = await inkLayer(size);
  return sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: ink }])
    .png()
    .toBuffer();
}

// The header mark: transparent, so it sits on whatever ground it lands on.
const mark = await inkLayer(MASTER);
await sharp(mark)
  .resize(256, 256)
  .webp({ quality: 92, effort: 6, alphaQuality: 100 })
  .toFile(path.join(ROOT, "public/images/logo-mark.webp"));

writeFileSync(path.join(ROOT, "app/icon.png"), await onPaper(512));
writeFileSync(path.join(ROOT, "app/apple-icon.png"), await onPaper(180));

const png32 = await onPaper(32);
// Minimal ICO container with one 32x32 PNG entry.
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(path.join(ROOT, "public/favicon.ico"), Buffer.concat([header, png32]));

console.log("icons: public/images/logo-mark.webp, app/icon.png, app/apple-icon.png, public/favicon.ico");
