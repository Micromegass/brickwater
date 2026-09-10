import { expect, test } from "@playwright/test";

test("the wordmark is real text filled with the painted wash", async ({ page }) => {
  await page.goto("/");
  const wordmark = page.locator("h1.wordmark");
  await expect(wordmark).toHaveCount(1);
  await expect(wordmark).toHaveAttribute("aria-label", "Brickwater");
  await expect(wordmark).toBeVisible();
  const fill = await wordmark.evaluate((el) => getComputedStyle(el).backgroundImage);
  expect(fill).toContain("wash-wordmark");
  // No WebGL canvas anywhere on the page any more.
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("reduced motion gets the finished wash and no animation", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const wordmark = page.locator("h1.wordmark");
  await expect(wordmark).toBeVisible();
  const styles = await wordmark.evaluate((el) => {
    const computed = getComputedStyle(el);
    return { animation: computed.animationName, opacity: computed.opacity };
  });
  expect(styles.animation).toBe("none");
  expect(Number(styles.opacity)).toBe(1);
  await context.close();
});

test("the videos section shows exactly the three chosen videos", async ({ page }) => {
  await page.goto("/");
  const posters = page.locator("#videos .video-poster");
  await expect(posters).toHaveCount(3);
  await expect(posters.nth(0)).toContainText("Starving");
  await expect(posters.nth(1)).toContainText("Jumping just to fall");
  await expect(posters.nth(2)).toContainText("Loft Lo-Fi");
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
  await expect(page.locator("iframe").first()).toHaveAttribute(
    "src",
    /bandcamp\.com\/EmbeddedPlayer\/album=1535730410/,
  );
});

test("lyrics open as an accordion", async ({ page }) => {
  await page.goto("/musik/season-one/");
  const first = page.locator("details.lyric-track").first();
  await expect(first.locator(".lyric-body")).toBeHidden();
  await first.locator("summary").click();
  await expect(first.locator(".lyric-body")).toBeVisible();
  await expect(first.locator(".lyric-body")).toContainText("forgotten ones");
});

test("the home page runs in the order the artist asked for", async ({ page }) => {
  await page.goto("/");
  const order = await page.evaluate(() =>
    [...document.querySelectorAll("main section[aria-labelledby]")].map((s) =>
      s.getAttribute("aria-labelledby"),
    ),
  );
  expect(order).toEqual([
    "hero-title",
    "bio-title",
    "videos-title",
    "music-title",
    "fwn-title",
    "shows-title",
    "contact-title",
  ]);
});
