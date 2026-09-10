import { describe, expect, it } from "vitest";
import desktop from "@/lib/hero/wordmark-desktop.json";
import mobile from "@/lib/hero/wordmark-mobile.json";
import type { WordmarkLayout } from "@/lib/hero/types";

function check(layout: WordmarkLayout, maxBricks: number) {
  expect(layout.bricks.length).toBeGreaterThan(100);
  expect(layout.bricks.length).toBeLessThanOrEqual(maxBricks);
  for (const [x, y] of layout.bricks) {
    expect(x).toBeGreaterThanOrEqual(-0.5);
    expect(x).toBeLessThanOrEqual(layout.cols);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(layout.rows);
    // running bond: odd rows are offset by half a brick
    expect(Math.abs((x % 1) - (y % 2 === 1 ? 0.5 : 0))).toBeLessThan(1e-6);
  }
}

describe("wordmark layouts", () => {
  it("desktop stays within the 1500 brick budget", () => {
    check(desktop as WordmarkLayout, 1500);
  });

  it("mobile stays within the 600 brick budget", () => {
    check(mobile as WordmarkLayout, 600);
  });

  it("layouts are wider than tall", () => {
    expect((desktop as WordmarkLayout).cols).toBeGreaterThan((desktop as WordmarkLayout).rows * 2);
  });
});
