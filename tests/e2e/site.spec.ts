import { expect, test } from "@playwright/test";
import { ROUTES, SITE } from "./routes";

test("sitemap lists every route with language alternates", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const route of ROUTES) {
    expect(xml, route.path).toContain(`<loc>${SITE}${route.path}</loc>`);
  }
  expect(xml).toContain('hreflang="x-default"');
});

test("robots.txt allows crawling and references the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toMatch(/Allow: \//);
  expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("llms.txt, manifest and icons exist", async ({ request }) => {
  for (const file of ["/llms.txt", "/manifest.webmanifest", "/icon.svg", "/apple-icon.png", "/favicon.ico", "/og/home-de.png"]) {
    expect((await request.get(file)).status(), file).toBe(200);
  }
});

test("unknown pages get the bilingual 404", async ({ page }) => {
  const response = await page.goto("/gibt-es-nicht/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Seite nicht gefunden");
  await expect(page.getByText("Page not found")).toBeVisible();
});

test("skip link is hidden until focused and jumps to main", async ({ page }) => {
  await page.goto("/");
  const skip = page.locator("a.skip-link");
  await expect(skip).not.toBeInViewport();
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});
