import { describe, expect, it } from "vitest";
import type { Show } from "@/lib/content/schema";
import { splitShows } from "@/lib/shows";

function show(id: string, date: string, time?: string): Show {
  return {
    id,
    date,
    time,
    city: "Nürnberg",
    venue: "Somewhere",
    country: "DE",
    status: "scheduled",
  };
}

describe("splitShows", () => {
  const shows = [
    show("c", "2026-12-05", "20:00"),
    show("a", "2026-10-03", "20:00"),
    show("b", "2026-10-10"),
    show("old", "2025-06-01", "21:00"),
  ];

  it("sorts upcoming shows ascending and past shows descending", () => {
    const now = new Date("2026-09-10T12:00:00Z");
    const { upcoming, past } = splitShows(shows, now);
    expect(upcoming.map((s) => s.id)).toEqual(["a", "b", "c"]);
    expect(past.map((s) => s.id)).toEqual(["old"]);
  });

  it("keeps a show upcoming until midnight Berlin time on its date", () => {
    // 23:30 Berlin (CEST) on the show day
    const stillToday = new Date("2026-10-03T21:30:00Z");
    expect(splitShows(shows, stillToday).upcoming.map((s) => s.id)).toContain(
      "a",
    );
    // 00:30 Berlin on the following day
    const nextDay = new Date("2026-10-03T22:30:00Z");
    expect(splitShows(shows, nextDay).past.map((s) => s.id)).toContain("a");
  });

  it("returns empty lists for no shows", () => {
    expect(splitShows([], new Date())).toEqual({ upcoming: [], past: [] });
  });
});
