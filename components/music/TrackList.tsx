import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Track } from "@/lib/content/schema";
import { LyricsDialog } from "./LyricsDialog";

interface Props {
  locale: Locale;
  tracks: Track[];
  /** Two columns on the home page, one on a release page. */
  columns?: 1 | 2;
}

/**
 * One track list for the whole site. A song with lyrics opens them in a panel;
 * a song without stays plain text, so nothing pretends to be clickable.
 */
export async function TrackList({ locale, tracks, columns = 1 }: Props) {
  const t = await getTranslations({ locale, namespace: "music" });
  return (
    <ol className={`tracklist ${columns === 2 ? "tracklist-two" : ""}`} aria-label={t("tracklist")}>
      {tracks.map((track) => (
        <li key={track.n}>
          {track.lyrics ? (
            <LyricsDialog
              number={track.n}
              title={track.title}
              duration={track.duration}
              label={t("lyricsOf", { title: track.title })}
              closeLabel={t("closeLyrics")}
            >
              {track.lyrics.split(/\n{2,}/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </LyricsDialog>
          ) : (
            <div className="track-row">
              <span className="tracklist-n">{track.n}</span>
              <span className="track-title">{track.title}</span>
              {track.duration ? <span className="tracklist-dur">{track.duration}</span> : null}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
