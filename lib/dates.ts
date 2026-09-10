export const TIME_ZONE = "Europe/Berlin";

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Offset of Europe/Berlin from UTC, in minutes, at the given instant. */
export function berlinOffsetMinutes(instant: Date): number {
  const parts = Object.fromEntries(
    partsFormatter
      .formatToParts(instant)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, Number(p.value)]),
  );
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return Math.round((asUtc - instant.getTime()) / 60_000);
}

function splitDate(date: string): [number, number, number] {
  const [y, m, d] = date.split("-").map(Number);
  return [y, m, d];
}

function splitTime(time?: string): [number, number, number] {
  if (!time) return [23, 59, 59];
  const [h, m, s = 0] = time.split(":").map(Number);
  return [h, m, s];
}

/**
 * The instant corresponding to a wall-clock date and time in Europe/Berlin.
 * Without a time, the end of that day (23:59:59) is returned.
 */
export function berlinDateTime(date: string, time?: string): Date {
  const [y, mo, d] = splitDate(date);
  const [h, mi, s] = splitTime(time);
  const wall = Date.UTC(y, mo - 1, d, h, mi, s);
  let guess = wall;
  for (let i = 0; i < 2; i += 1) {
    guess = wall - berlinOffsetMinutes(new Date(guess)) * 60_000;
  }
  return new Date(guess);
}

function formatOffset(minutes: number): string {
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `${sign}${hh}:${mm}`;
}

/** ISO 8601 with the Berlin UTC offset, as schema.org expects: 2026-10-03T20:00:00+02:00 */
export function toBerlinIsoString(date: string, time: string): string {
  const instant = berlinDateTime(date, time);
  const [h, m, s] = splitTime(time);
  const hhmmss = [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  return `${date}T${hhmmss}${formatOffset(berlinOffsetMinutes(instant))}`;
}

/** iCalendar UTC timestamp: 20261003T180000Z */
export function toIcsUtc(instant: Date): string {
  return instant
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z")
    .replace(/[-:]/g, "");
}
