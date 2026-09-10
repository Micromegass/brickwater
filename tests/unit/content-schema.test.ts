import { describe, expect, it } from "vitest";
import {
  ReleasesSchema,
  ShowSchema,
  ShowsSchema,
} from "@/lib/content/schema";

const validShow = {
  id: "2026-10-03-nuernberg-z-bau",
  date: "2026-10-03",
  time: "20:00",
  city: "Nürnberg",
  venue: "Z-Bau",
  address: "Frankenstraße 200, 90461 Nürnberg",
};

describe("ShowSchema", () => {
  it("parses a minimal show and applies defaults", () => {
    const show = ShowSchema.parse(validShow);
    expect(show.country).toBe("DE");
    expect(show.status).toBe("scheduled");
  });

  it("treats an empty ticketUrl as absent", () => {
    const show = ShowSchema.parse({ ...validShow, ticketUrl: "" });
    expect(show.ticketUrl).toBeUndefined();
  });

  it("rejects a German-formatted date", () => {
    const result = ShowSchema.safeParse({ ...validShow, date: "03.10.2026" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-https ticket link", () => {
    const result = ShowSchema.safeParse({
      ...validShow,
      ticketUrl: "ftp://tickets.example",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a bilingual note", () => {
    const show = ShowSchema.parse({
      ...validShow,
      note: { de: "solo", en: "solo" },
    });
    expect(show.note).toEqual({ de: "solo", en: "solo" });
  });
});

describe("ShowsSchema", () => {
  it("rejects duplicate ids", () => {
    const result = ShowsSchema.safeParse([validShow, validShow]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/duplicate/i);
    }
  });
});

const validRelease = {
  slug: "season-one",
  title: "Season One",
  date: "2018-11-02",
  type: "album",
  cover: "brickwater-season-one-album-cover",
  tracks: [{ n: 1, title: "The Coming Up Whatever", duration: "3:45" }],
  links: { bandcamp: "https://brickwater.bandcamp.com/album/season-one" },
};

describe("ReleasesSchema", () => {
  it("derives the year from the release date", () => {
    const [release] = ReleasesSchema.parse([validRelease]);
    expect(release.year).toBe(2018);
  });

  it("rejects duplicate slugs", () => {
    const result = ReleasesSchema.safeParse([validRelease, validRelease]);
    expect(result.success).toBe(false);
  });

  it("requires at least one track", () => {
    const result = ReleasesSchema.safeParse([{ ...validRelease, tracks: [] }]);
    expect(result.success).toBe(false);
  });

  it("rejects an unknown release type", () => {
    const result = ReleasesSchema.safeParse([
      { ...validRelease, type: "mixtape" },
    ]);
    expect(result.success).toBe(false);
  });
});
