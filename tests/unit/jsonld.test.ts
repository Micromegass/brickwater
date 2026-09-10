import { describe, expect, it } from "vitest";
import type { Release, Show } from "@/lib/content/schema";
import { musicAlbum, musicEvent, musicGroup, videoObject, webSite } from "@/lib/seo/jsonld";

const show: Show = {
  id: "2026-10-03-nuernberg-z-bau",
  date: "2026-10-03",
  time: "20:00",
  city: "Nürnberg",
  venue: "Z-Bau",
  address: "Frankenstraße 200, 90461 Nürnberg",
  country: "DE",
  status: "scheduled",
  ticketUrl: "https://tickets.example/brickwater",
};

const release: Release = {
  slug: "season-one",
  title: "Season One",
  date: "2018-11-02",
  year: 2018,
  type: "album",
  cover: "brickwater-season-one-album-cover",
  tracks: [
    { n: 1, title: "Starving", duration: "3:10", lyrics: "Starving in abundance" },
    { n: 2, title: "Medicine" },
  ],
  links: { bandcamp: "https://brickwater.bandcamp.com/album/season-one" },
};

describe("musicGroup", () => {
  const group = musicGroup("de");
  it("identifies Brickwater with its frontperson and profiles", () => {
    expect(group["@type"]).toBe("MusicGroup");
    expect(group.name).toBe("Brickwater");
    expect(group["@id"]).toBe("https://www.brickwater.de/#artist");
    expect(group.member).toMatchObject({ "@type": "Person", name: "Bricky Waters" });
    expect(group.sameAs).toContain("https://brickwater.bandcamp.com/");
    expect(group.sameAs.some((u: string) => u.includes("facebook"))).toBe(false);
  });
});

describe("musicEvent", () => {
  it("builds a schema.org MusicEvent with Berlin offset and ticket offer", () => {
    const event = musicEvent(show, "de");
    expect(event["@type"]).toBe("MusicEvent");
    expect(event.startDate).toBe("2026-10-03T20:00:00+02:00");
    expect(event.location).toMatchObject({
      "@type": "Place",
      name: "Z-Bau",
      address: { "@type": "PostalAddress", addressLocality: "Nürnberg", addressCountry: "DE" },
    });
    expect(event.offers).toMatchObject({ "@type": "Offer", url: "https://tickets.example/brickwater" });
    expect(event.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(event.performer).toMatchObject({ "@id": "https://www.brickwater.de/#artist" });
  });

  it("maps cancelled shows and omits offers without a ticket link", () => {
    const event = musicEvent({ ...show, status: "cancelled", ticketUrl: undefined }, "en");
    expect(event.eventStatus).toBe("https://schema.org/EventCancelled");
    expect(event).not.toHaveProperty("offers");
  });

  it("uses a date-only start for shows without a time", () => {
    expect(musicEvent({ ...show, time: undefined }, "de").startDate).toBe("2026-10-03");
  });
});

describe("musicAlbum", () => {
  it("lists tracks as MusicRecordings and keeps lyrics", () => {
    const album = musicAlbum(release, "de");
    expect(album["@type"]).toBe("MusicAlbum");
    expect(album.url).toBe("https://www.brickwater.de/musik/season-one/");
    expect(album.numTracks).toBe(2);
    expect(album.track[0]).toMatchObject({
      "@type": "MusicRecording",
      name: "Starving",
      position: 1,
      duration: "PT3M10S",
    });
    expect(album.track[0].recordingOf).toMatchObject({
      "@type": "MusicComposition",
      lyrics: { "@type": "CreativeWork", text: "Starving in abundance" },
    });
    expect(album.track[1]).not.toHaveProperty("duration");
  });
});

describe("videoObject and webSite", () => {
  it("describes a YouTube video without loading it", () => {
    const video = videoObject({ id: "ugmcmAWwCs8", title: "Starving", kind: "official", year: 2019, poster: "video-starving-poster" }, "en");
    expect(video.embedUrl).toBe("https://www.youtube-nocookie.com/embed/ugmcmAWwCs8");
    expect(video.thumbnailUrl).toMatch(/^https:\/\/www\.brickwater\.de\/images\/video-starving-poster/);
  });

  it("marks the site language", () => {
    expect(webSite("en").inLanguage).toBe("en");
    expect(webSite("de").url).toBe("https://www.brickwater.de/");
  });
});
