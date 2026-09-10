import type { Show } from "./content/schema";
import { berlinDateTime, toIcsUtc } from "./dates";

const MAX_OCTETS = 75;
const CRLF = "\r\n";

export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 §3.1 line folding at 75 octets, never splitting a code point. */
export function foldIcsLine(line: string): string {
  const out: string[] = [];
  let current = "";
  let currentBytes = 0;
  let limit = MAX_OCTETS;
  for (const char of line) {
    const bytes = Buffer.byteLength(char, "utf8");
    if (currentBytes + bytes > limit) {
      out.push(current);
      current = " ";
      currentBytes = 1;
      limit = MAX_OCTETS;
    }
    current += char;
    currentBytes += bytes;
  }
  out.push(current);
  return out.join(CRLF);
}

export interface ShowIcsOptions {
  siteUrl: string;
  summary: string;
  description?: string;
  /** Page the event links back to; defaults to the German shows page. */
  url?: string;
}

function icsDate(date: string): string {
  return date.replace(/-/g, "");
}

function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function buildShowIcs(show: Show, options: ShowIcsOptions): string {
  const location = show.address
    ? `${show.venue}, ${show.address}`
    : `${show.venue}, ${show.city}`;
  const url = options.url ?? `${options.siteUrl}/konzerte/`;

  const timing: string[] = [];
  if (show.time) {
    const start = berlinDateTime(show.date, show.time);
    const end = new Date(start.getTime() + 3 * 60 * 60_000);
    timing.push(`DTSTART:${toIcsUtc(start)}`, `DTEND:${toIcsUtc(end)}`);
  } else {
    timing.push(
      `DTSTART;VALUE=DATE:${icsDate(show.date)}`,
      `DTEND;VALUE=DATE:${icsDate(nextDay(show.date))}`,
    );
  }

  const stamp = toIcsUtc(berlinDateTime(show.date, "00:00"));
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Brickwater//brickwater.de//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${show.id}@brickwater.de`,
    `DTSTAMP:${stamp}`,
    ...timing,
    `SUMMARY:${escapeIcsText(options.summary)}`,
    ...(options.description
      ? [`DESCRIPTION:${escapeIcsText(options.description)}`]
      : []),
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${url}`,
    `STATUS:${show.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldIcsLine).join(CRLF) + CRLF;
}
