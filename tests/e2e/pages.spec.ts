import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES, SITE } from "./routes";

for (const route of ROUTES) {
  test.describe(route.path, () => {
    test("renders with correct language, one h1, canonical and reciprocal hreflang", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${route.path}`);
      const alternates = page.locator('link[rel="alternate"][hreflang]');
      const de = route.lang === "de" ? route.path : route.counterpart;
      const en = route.lang === "en" ? route.path : route.counterpart;
      await expect(alternates.filter({ has: page.locator('[hreflang="de"]') }).or(page.locator('link[hreflang="de"]'))).toHaveAttribute("href", `${SITE}${de}`);
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", `${SITE}${en}`);
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", `${SITE}${de}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\/.+\.png/);
      expect(errors, "console errors").toEqual([]);
    });

    test("language switcher points to the counterpart page", async ({ page }) => {
      await page.goto(route.path);
      const switcher = page.locator('a[hreflang]:not([rel="alternate"])').first();
      await expect(switcher).toHaveAttribute("href", route.counterpart);
      const res = await page.request.get(route.counterpart);
      expect(res.status()).toBe(200);
    });

    test("has no accessibility violations (axe, WCAG 2.2 AA)", async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  });
}

test("JSON-LD on every content page parses and names the artist", async ({ page }) => {
  for (const route of ROUTES.filter((r) => !/impressum|datenschutz|legal-notice|privacy/.test(r.path))) {
    await page.goto(route.path);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, route.path).toBeGreaterThan(0);
    for (const block of blocks) {
      const data = JSON.parse(block);
      expect(data["@context"]).toBe("https://schema.org");
      expect(JSON.stringify(data)).toContain("Brickwater");
    }
  }
});
