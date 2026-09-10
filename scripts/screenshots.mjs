// Serves out/ and captures desktop + mobile screenshots of every route, logging console errors.
// Usage: node scripts/screenshots.mjs [outDir] [route ...]
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const PORT = 4173;
const outDir = process.argv[2] ?? path.join(process.cwd(), "test-results/screens");
const routes = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["/", "/konzerte/", "/musik/", "/musik/season-one/", "/impressum/", "/datenschutz/", "/en/", "/en/shows/", "/en/music/aloah-from-brickwater/", "/nope/"];
mkdirSync(outDir, { recursive: true });

const server = spawn("npx", ["serve", "out", "-l", String(PORT), "-n"], { stdio: "ignore" });
const waitFor = async () => {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("server did not start");
};

try {
  await waitFor();
  const browser = await chromium.launch();
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: name === "mobile", hasTouch: name === "mobile" });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(`${m.text()}`); });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    for (const route of routes) {
      const slug = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-");
      const res = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
      if (route === "/" || route === "/en/") {
        await page.waitForSelector(".wordmark", { timeout: 8000 }).catch(() => errors.push(`${route}: wordmark missing`));
        await page.waitForTimeout(650);
        await page.screenshot({ path: path.join(outDir, `${slug}-${name}-hero-soaking.png`) });
        await page.waitForTimeout(2600);
        await page.screenshot({ path: path.join(outDir, `${slug}-${name}-hero.png`) });
      }
      // trigger lazy images before the full-page capture
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.screenshot({ path: path.join(outDir, `${slug}-${name}.png`), fullPage: true });
      console.log(`${name} ${route} -> ${res?.status()}`);
    }
    if (errors.length) console.log(`${name} console errors:\n  ${errors.join("\n  ")}`);
    await context.close();
  }
  await browser.close();
} finally {
  server.kill();
}
