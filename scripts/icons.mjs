// Rasterizes app/icon.svg into the PNG icons Next serves (apple-icon.png) and public/favicon.ico fallback.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("app/icon.svg");
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile("app/apple-icon.png");
const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
// Minimal ICO container with one 32x32 PNG entry.
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync("public/favicon.ico", Buffer.concat([header, png32]));
console.log("icons: app/apple-icon.png, public/favicon.ico");
