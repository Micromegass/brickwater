import type { Show } from "./content/schema";
import { berlinDateTime } from "./dates";

/** Start instant used for ordering; shows without a time sort at the start of their day. */
export function showSortKey(show: Show): number {
  return berlinDateTime(show.date, show.time ?? "00:00").getTime();
}

/** A show counts as upcoming until midnight (Europe/Berlin) at the end of its date. */
export function isUpcoming(show: Show, now: Date): boolean {
  return berlinDateTime(show.date).getTime() >= now.getTime();
}

export function splitShows(
  shows: Show[],
  now: Date,
): { upcoming: Show[]; past: Show[] } {
  const upcoming = shows
    .filter((show) => isUpcoming(show, now))
    .sort((a, b) => showSortKey(a) - showSortKey(b));
  const past = shows
    .filter((show) => !isUpcoming(show, now))
    .sort((a, b) => showSortKey(b) - showSortKey(a));
  return { upcoming, past };
}
