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
  // the background marks hold still as well
  const drifting = await page
    .locator(".stain")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(drifting).toBe("none");
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

test("a song opens its lyrics in a panel and Escape closes it", async ({ page }) => {
  await page.goto("/musik/season-one/");
  const panel = page.locator("dialog.lyrics-dialog").first();
  await expect(panel).toBeHidden();
  await page.locator("button.track-row-open").first().click();
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("forgotten ones");
  await expect(panel.locator(".lyrics-title")).toHaveText("The Coming Up Whatever");
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("the lyrics panel is reachable from the home page too", async ({ page }) => {
  await page.goto("/");
  await page.locator("#musik button.track-row-open").first().click();
  await expect(page.locator("dialog.lyrics-dialog[open]")).toBeVisible();
  await page.locator("dialog.lyrics-dialog[open] .lyrics-close").click();
  await expect(page.locator("dialog.lyrics-dialog[open]")).toHaveCount(0);
});

test("the hero badge points at the shows page and the header carries the socials", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .hype")).toHaveAttribute("href", "/konzerte/");
  const socials = page.locator(".header-socials a");
  await expect(socials).toHaveCount(5);
  await expect(socials.first()).toHaveAttribute("href", /instagram\.com/);
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

test("the gallery opens a photograph in a panel and Escape closes it", async ({ page }) => {
  await page.goto("/galerie/");
  const items = page.locator("button.gallery-item");
  await expect(items).toHaveCount(19);
  const panel = page.locator("dialog.lightbox").first();
  await expect(panel).toBeHidden();
  await items.first().click();
  await expect(panel).toBeVisible();
  await expect(panel.locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("the home page links into the gallery and the nav carries it", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Alle Fotos" })).toHaveAttribute("href", "/galerie/");
  await expect(page.locator(".site-nav a[href='/galerie/']")).toHaveCount(1);
});

test("reduced motion stops the reveal and the ghost as well", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const reveal = page.locator(".reveal").first();
  await expect(reveal).toBeVisible();
  const names = await page.evaluate(() => ({
    reveal: getComputedStyle(document.querySelector(".reveal")!).animationName,
    ghost: getComputedStyle(document.querySelector(".stain-ghost")!).animationName,
    ghostOpacity: getComputedStyle(document.querySelector(".stain-ghost")!).opacity,
  }));
  expect(names.reveal).toBe("none");
  expect(names.ghost).toBe("none");
  // The ghost holds at its resting strength rather than vanishing.
  expect(Number(names.ghostOpacity)).toBeGreaterThan(0);
  await context.close();
});
