import { expect, test } from "@playwright/test";

test("hero mounts the 3D wordmark and keeps the h1 in the document", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#hero-title")).toHaveAttribute("aria-label", "Brickwater");
  await expect(page.locator('[data-hero-stage] canvas')).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('[data-hero-stage]')).toHaveAttribute("data-canvas", "ready", { timeout: 10_000 });
  await expect(page.locator("#hero-title")).toHaveCount(1);
  await page.mouse.move(400, 250);
  await page.mouse.move(700, 260);
});

test("reduced motion skips the 3D chunk and shows the typeset wordmark", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.waitForTimeout(2500);
  await expect(page.locator('[data-hero-stage] canvas')).toHaveCount(0);
  await expect(page.locator("#hero-title")).toBeVisible();
  await context.close();
});

test("YouTube loads only after a click, in privacy mode", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("iframe")).toHaveCount(0);
  const play = page.locator(".video-poster").first();
  await play.scrollIntoViewIfNeeded();
  await play.click();
  const frame = page.locator("iframe").first();
  await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
});

test("Bandcamp player loads only after a click", async ({ page }) => {
  await page.goto("/musik/season-one/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Player laden" }).click();
  await expect(page.locator("iframe").first()).toHaveAttribute("src", /bandcamp\.com\/EmbeddedPlayer\/album=1535730410/);
});

test("lyrics open as an accordion", async ({ page }) => {
  await page.goto("/musik/season-one/");
  const first = page.locator("details.lyric-track").first();
  await expect(first.locator(".lyric-body")).toBeHidden();
  await first.locator("summary").click();
  await expect(first.locator(".lyric-body")).toBeVisible();
  await expect(first.locator(".lyric-body")).toContainText("forgotten ones");
});
