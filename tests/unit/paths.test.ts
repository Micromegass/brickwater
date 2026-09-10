import { describe, expect, it } from "vitest";
import { absoluteUrl, localizedPath, pageAlternates } from "@/lib/i18n/paths";

describe("localizedPath", () => {
  it("keeps German at the root without a prefix", () => {
    expect(localizedPath("de", "/")).toBe("/");
    expect(localizedPath("de", "/shows")).toBe("/konzerte/");
    expect(localizedPath("de", "/privacy")).toBe("/datenschutz/");
  });

  it("prefixes English and uses the English slug", () => {
    expect(localizedPath("en", "/")).toBe("/en/");
    expect(localizedPath("en", "/shows")).toBe("/en/shows/");
    expect(localizedPath("en", "/legal-notice")).toBe("/en/legal-notice/");
  });

  it("fills dynamic segments", () => {
    expect(localizedPath("de", "/music/[slug]", { slug: "season-one" })).toBe(
      "/musik/season-one/",
    );
    expect(localizedPath("en", "/music/[slug]", { slug: "season-one" })).toBe(
      "/en/music/season-one/",
    );
  });

  it("throws when a dynamic segment is missing", () => {
    expect(() => localizedPath("de", "/music/[slug]")).toThrow(/slug/);
  });
});

describe("pageAlternates", () => {
  it("returns canonical plus reciprocal hreflang targets with x-default on German", () => {
    expect(pageAlternates("en", "/music/[slug]", { slug: "season-one" })).toEqual({
      canonical: "https://www.brickwater.de/en/music/season-one/",
      languages: {
        de: "https://www.brickwater.de/musik/season-one/",
        en: "https://www.brickwater.de/en/music/season-one/",
        "x-default": "https://www.brickwater.de/musik/season-one/",
      },
    });
  });
});

describe("absoluteUrl", () => {
  it("joins the site origin and a path", () => {
    expect(absoluteUrl("/konzerte/")).toBe("https://www.brickwater.de/konzerte/");
  });
});
