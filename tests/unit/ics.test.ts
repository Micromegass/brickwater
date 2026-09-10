import { describe, expect, it } from "vitest";
import type { Show } from "@/lib/content/schema";
import { buildShowIcs, foldIcsLine } from "@/lib/ics";

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

const options = {
  siteUrl: "https://www.brickwater.de",
  summary: "Brickwater live: Z-Bau, Nürnberg",
  description:
    "Brickwater spielt solo im Z-Bau. Tickets: https://tickets.example/brickwater; Infos auf www.brickwater.de",
};

describe("buildShowIcs", () => {
  const ics = buildShowIcs(show, options);
  const lines = ics.split("\r\n");

  it("uses CRLF line endings only", () => {
    expect(ics).not.toMatch(/[^\r]\n/);
    expect(ics.endsWith("\r\n")).toBe(true);
  });

  it("wraps a single event in a calendar", () => {
    expect(lines[0]).toBe("BEGIN:VCALENDAR");
    expect(lines).toContain("BEGIN:VEVENT");
    expect(lines).toContain("END:VEVENT");
    expect(lines[lines.length - 2]).toBe("END:VCALENDAR");
  });

  it("writes the start time in UTC and a stable UID", () => {
    expect(lines).toContain("DTSTART:20261003T180000Z");
    expect(lines).toContain("UID:2026-10-03-nuernberg-z-bau@brickwater.de");
    expect(lines).toContain("URL:https://www.brickwater.de/konzerte/");
  });

  it("escapes commas and semicolons in text fields", () => {
    expect(lines).toContain(
      "LOCATION:Z-Bau\\, Frankenstraße 200\\, 90461 Nürnberg",
    );
    expect(ics).toContain(
      "DESCRIPTION:Brickwater spielt solo im Z-Bau. Tickets: https://tickets.exam",
    );
  });

  it("keeps every physical line within 75 octets", () => {
    for (const line of lines) {
      expect(Buffer.byteLength(line, "utf8")).toBeLessThanOrEqual(75);
    }
  });
});

describe("foldIcsLine", () => {
  it("never splits a multi-byte character", () => {
    const line = "DESCRIPTION:" + "ä".repeat(60);
    const folded = foldIcsLine(line);
    const physical = folded.split("\r\n");
    for (const part of physical) {
      expect(Buffer.byteLength(part, "utf8")).toBeLessThanOrEqual(75);
    }
    const unfolded = folded.replace(/\r\n /g, "");
    expect(unfolded).toBe(line);
  });

  it("leaves short lines untouched", () => {
    expect(foldIcsLine("SUMMARY:Short")).toBe("SUMMARY:Short");
  });
});

describe("buildShowIcs without a time", () => {
  it("writes an all-day event", () => {
    const allDay = buildShowIcs({ ...show, time: undefined }, options);
    expect(allDay).toContain("DTSTART;VALUE=DATE:20261003\r\n");
    expect(allDay).toContain("DTEND;VALUE=DATE:20261004\r\n");
  });
});
