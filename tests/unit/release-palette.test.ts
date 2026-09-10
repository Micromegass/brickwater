import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { allReleasePalettes, releasePalette } from "@/lib/releases/palette";

const PAPER = "#f3f2f0";
const INK = "#222222";

function luminance(hex: string): number {
  return [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const slugs = readdirSync("content/releases").map((file) => file.replace(/\.json$/, ""));

describe("release palettes", () => {
  it("covers every release", () => {
    expect(Object.keys(allReleasePalettes).sort()).toEqual(slugs.sort());
  });

  it.each(slugs)("%s carries text on paper and stays readable under ink", (slug) => {
    const pigment = releasePalette(slug);
    expect(contrast(pigment.accent, PAPER)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(pigment.accentDeep, PAPER)).toBeGreaterThanOrEqual(4.5);
    // paper text sits on the accent when it is a button
    expect(contrast(pigment.accent, PAPER)).toBeGreaterThanOrEqual(4.5);
    // the wash is a page ground, so ink must sit comfortably on it
    expect(contrast(pigment.wash, INK)).toBeGreaterThanOrEqual(12);
  });

  it("gives each record a pigment of its own", () => {
    const accents = Object.values(allReleasePalettes).map((p) => p.accent);
    expect(new Set(accents).size).toBeGreaterThan(1);
  });

  it("falls back to the house pigment for an unknown release", () => {
    expect(releasePalette("nope").accent).toBe("#a8563c");
  });
});
