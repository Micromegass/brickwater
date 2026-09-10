import { CalendarPlus, MapPin, Ticket } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import type { Show } from "@/lib/content/schema";
import { berlinDateTime } from "@/lib/dates";

export interface ShowLabels {
  tickets: string;
  info: string;
  calendar: string;
  calendarLabel: string;
  map: string;
  mapLabel: string;
  doors?: string;
  status?: string;
}

export function ShowCard({ show, locale, labels, past }: { show: Show; locale: Locale; labels: ShowLabels; past?: boolean }) {
  const date = berlinDateTime(show.date, "12:00");
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "Europe/Berlin" }).format(date);
  const note = typeof show.note === "string" ? show.note : show.note?.[locale];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${show.venue}, ${show.address ?? show.city}`)}`;
  const icsFile = locale === "de" ? `/ics/${show.id}.ics` : `/ics/${show.id}.${locale}.ics`;
  const cancelled = show.status === "cancelled";

  return (
    <li className={`show-row${cancelled ? " show-row-cancelled" : ""}`}>
      <time dateTime={show.date} className="show-date">
        <span className="show-day">{fmt({ day: "2-digit" })}</span>
        <span className="show-month">
          {fmt({ month: "short" })} {fmt({ year: "numeric" })}
        </span>
      </time>
      <div className="show-body">
        <p className="show-venue">
          {show.venue}
          {labels.status ? <span className="show-status">{labels.status}</span> : null}
        </p>
        <p className="show-meta">
          {fmt({ weekday: "long" })}
          {show.time && labels.doors ? `, ${labels.doors}` : ""}. {show.city}
          {note ? `. ${note}` : ""}
        </p>
      </div>
      {!past ? (
        <div className="show-actions">
          {show.ticketUrl && !cancelled ? (
            <a href={show.ticketUrl} className="sticker sticker-brick" rel="noopener">
              <Ticket size={18} weight="bold" aria-hidden="true" />
              {labels.tickets}
            </a>
          ) : null}
          {show.eventUrl ? (
            <a href={show.eventUrl} className="sticker sticker-paper" rel="noopener">
              {labels.info}
            </a>
          ) : null}
          <a href={icsFile} className="sticker sticker-paper" download aria-label={labels.calendarLabel}>
            <CalendarPlus size={18} aria-hidden="true" />
            {labels.calendar}
          </a>
          <a href={mapUrl} className="sticker sticker-paper" rel="noopener" aria-label={labels.mapLabel}>
            <MapPin size={18} aria-hidden="true" />
            {labels.map}
          </a>
        </div>
      ) : null}
    </li>
  );
}
