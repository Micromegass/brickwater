// Screenshots one element of the built site, for checking a crop or a component
// without hunting for offsets in a full-page capture.
//   node scripts/shot.mjs ".photo-strip" out.png [/route/] [click-selector] [width]
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";
const [, , selector, out, route = "/", click, width = "1440"] = process.argv;
const server = spawn("npx", ["serve", "out", "-l", "4173", "-n"], { stdio: "ignore" });
for (let i = 0; i < 60; i++) { try { if ((await fetch("http://localhost:4173/")).ok) break; } catch {} await new Promise(r => setTimeout(r, 250)); }
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(width) < 700 ? 844 : 900 } });
await page.goto(`http://localhost:4173${route}`, { waitUntil: "networkidle" });
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); });
await page.waitForTimeout(800);
if (click) { await page.locator(click).first().click(); await page.waitForTimeout(500); }
await page.locator(selector).first().screenshot({ path: out });
console.log("shot", selector, "->", out);
await browser.close();
server.kill();
