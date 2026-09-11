// The tab icon: the wolf from the Season One sleeve, reduced to a silhouette.
//
// The painting itself is too pale and too detailed to survive at sixteen
// pixels, so the paint's own density becomes an alpha channel and the head is
// printed as one clay mass on the paper ground. The outline keeps the brush's
// character; the interior is filled so the mark does not dissolve into speckle
// when a browser scales it down.
//
// Run: npm run gen:icons
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SLEEVE = path.join(ROOT, "assets/source/old-site/cover2.png");
const PAPER = { r: 0xf3, g: 0xf2, b: 0xf0, alpha: 1 };
const CLAY = { r: 0x8c, g: 0x42, b: 0x2c };
// The standing wolf's head, in profile: one ear, the muzzle, the line of the jaw.
const HEAD = { left: 0.105, top: 0.155, width: 0.3, height: 0.29 };
const SIZE = 512;

if (!existsSync(SLEEVE)) {
  console.error(`missing ${SLEEVE}; keep the original sleeve in assets/source/old-site/`);
  process.exit(1);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const meta = await sharp(SLEEVE).metadata();
const region = {
  left: Math.round(HEAD.left * meta.width),
  top: Math.round(HEAD.top * meta.height),
  width: Math.round(HEAD.width * meta.width),
  height: Math.round(HEAD.height * meta.height),
};

const { data, info } = await sharp(SLEEVE)
  .extract(region)
  .resize(SIZE, SIZE, { fit: "cover" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const raw = Buffer.alloc(SIZE * SIZE);
for (let i = 0, p = 0; i < data.length; i += info.channels, p += 1) {
  const luminance = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  raw[p] = Math.round(smoothstep(0.02, 0.26, 1 - luminance) * 255);
}

// Soften, then push the midtones up: the watercolour's dry-brush flecks would
// otherwise read as noise once the icon is 32 pixels across.
const softened = await sharp(raw, { raw: { width: SIZE, height: SIZE, channels: 1 } })
  .blur(2.2)
  .toColourspace("b-w")
  .raw()
  .toBuffer();
const alpha = Buffer.from(softened.map((v) => Math.round(smoothstep(0.12, 0.46, v / 255) * 255)));

const mark = await sharp({ create: { width: SIZE, height: SIZE, channels: 3, background: CLAY } })
  .joinChannel(alpha, { raw: { width: SIZE, height: SIZE, channels: 1 } })
  .png()
  .toBuffer();

const master = await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: PAPER } })
  .composite([{ input: mark }])
  .png()
  .toBuffer();

const at = (size) => sharp(master).resize(size, size).png().toBuffer();

writeFileSync(path.join(ROOT, "app/icon.png"), await at(512));
writeFileSync(path.join(ROOT, "app/apple-icon.png"), await at(180));

const png32 = await at(32);
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

console.log("icons: app/icon.png, app/apple-icon.png, public/favicon.ico");
