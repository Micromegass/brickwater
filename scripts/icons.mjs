// Builds the PNG icons from the watercolour wash: a painted disc on the paper ground.
// The SVG at app/icon.svg is the flat, scalable version of the same mark.
// Run: npm run gen:icons (after npm run gen:wash)
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const WASH = path.join(ROOT, "public/images/wash-icon.webp");
const PAPER = { r: 0xf3, g: 0xf2, b: 0xf0, alpha: 1 };

if (!existsSync(WASH)) {
  console.error("missing public/images/wash-icon.webp; run npm run gen:wash first");
  process.exit(1);
}

/** The wash, cut to a circle and set on the paper ground. */
async function icon(size) {
  const inset = Math.round(size * 0.09);
  const disc = size - inset * 2;
  const mask = Buffer.from(
    `<svg width="${disc}" height="${disc}"><circle cx="${disc / 2}" cy="${disc / 2}" r="${disc / 2}" fill="#fff"/></svg>`,
  );
  const painted = await sharp(WASH)
    .resize(disc, disc, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: PAPER },
  })
    .composite([{ input: painted, top: inset, left: inset }])
    .png()
    .toBuffer();
}

writeFileSync(path.join(ROOT, "app/apple-icon.png"), await icon(180));

const png32 = await icon(32);
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

console.log("icons: app/apple-icon.png, public/favicon.ico");
