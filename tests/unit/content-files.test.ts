import { describe, expect, it } from "vitest";
import {
  getRelease,
  loadImages,
  loadReleases,
  loadShows,
  loadSite,
} from "@/lib/content/load";

describe("content files", () => {
  it("shows.json validates", () => {
    expect(Array.isArray(loadShows())).toBe(true);
  });

  it("releases validate and are sorted newest first", () => {
    const releases = loadReleases();
    expect(releases.length).toBeGreaterThanOrEqual(4);
    const dates = releases.map((r) => r.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("Season One carries lyrics for all eight tracks", () => {
    const seasonOne = getRelease("season-one");
    expect(seasonOne?.tracks).toHaveLength(8);
    for (const track of seasonOne?.tracks ?? []) {
      expect(track.lyrics?.length ?? 0).toBeGreaterThan(200);
    }
  });

  it("returns undefined for an unknown release", () => {
    expect(getRelease("nope")).toBeUndefined();
  });

  it("every release cover and video poster has an alt text entry", () => {
    const images = loadImages();
    for (const release of loadReleases()) {
      expect(images[release.cover]).toBeDefined();
    }
    for (const video of loadSite().videos) {
      expect(images[video.poster]).toBeDefined();
    }
  });

  it("alt texts exist in both languages", () => {
    for (const [key, entry] of Object.entries(loadImages())) {
      expect(entry.alt.de, key).not.toBe("");
      expect(entry.alt.en, key).not.toBe("");
    }
  });
});
