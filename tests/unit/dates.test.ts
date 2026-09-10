import { describe, expect, it } from "vitest";
import {
  berlinDateTime,
  toBerlinIsoString,
  toIcsUtc,
} from "@/lib/dates";

describe("berlinDateTime", () => {
  it("converts a summer-time Berlin date and time to the right instant", () => {
    expect(berlinDateTime("2026-10-03", "20:00").toISOString()).toBe(
      "2026-10-03T18:00:00.000Z",
    );
  });

  it("converts a winter-time Berlin date and time to the right instant", () => {
    expect(berlinDateTime("2026-12-05", "20:00").toISOString()).toBe(
      "2026-12-05T19:00:00.000Z",
    );
  });

  it("handles the DST switch night correctly", () => {
    // 2026-10-25 03:00 Berlin is already CET (+1) after clocks fell back.
    expect(berlinDateTime("2026-10-25", "03:00").toISOString()).toBe(
      "2026-10-25T02:00:00.000Z",
    );
  });

  it("defaults to the end of the day when no time is given", () => {
    expect(berlinDateTime("2026-10-03").toISOString()).toBe(
      "2026-10-03T21:59:59.000Z",
    );
  });
});

describe("toBerlinIsoString", () => {
  it("renders the local time with its UTC offset for schema.org", () => {
    expect(toBerlinIsoString("2026-10-03", "20:00")).toBe(
      "2026-10-03T20:00:00+02:00",
    );
    expect(toBerlinIsoString("2026-12-05", "20:00")).toBe(
      "2026-12-05T20:00:00+01:00",
    );
  });
});

describe("toIcsUtc", () => {
  it("renders an ICS UTC timestamp", () => {
    expect(toIcsUtc(new Date("2026-10-03T18:00:00.000Z"))).toBe(
      "20261003T180000Z",
    );
  });
});
