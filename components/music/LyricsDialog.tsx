"use client";

import { X } from "@phosphor-icons/react";
import { useCallback, useRef, type ReactNode } from "react";

interface Props {
  /** The song title, which is also the trigger. */
  title: string;
  /** Screen-reader name for the panel, e.g. "Songtext: Starving". */
  label: string;
  closeLabel: string;
  duration?: string;
  number: number;
  /** The lyrics, rendered on the server so they stay in the HTML. */
  children: ReactNode;
}

/**
 * A song opens its lyrics in a panel over the page, typeset like an inner sleeve.
 * The native dialog gives the focus trap, Escape and focus return for free; the
 * only thing worth writing is closing on a click outside the sheet.
 */
export function LyricsDialog({ title, label, closeLabel, duration, number, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const closeOnBackdrop = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) ref.current?.close();
  }, []);

  return (
    <>
      <button type="button" className="track-row track-row-open" onClick={() => ref.current?.showModal()}>
        <span className="tracklist-n">{number}</span>
        <span className="track-title">{title}</span>
        {duration ? <span className="tracklist-dur">{duration}</span> : null}
        <span className="track-hint" aria-hidden="true">
          ♪
        </span>
      </button>
      <dialog ref={ref} className="lyrics-dialog" aria-label={label} onClick={closeOnBackdrop}>
        <article className="lyrics-sheet">
          <header className="lyrics-head">
            <p className="etch lyrics-eyebrow">{number}</p>
            <h2 className="lyrics-title">{title}</h2>
          </header>
          <div className="lyrics-body prose-lyrics" lang="en">
            {children}
          </div>
          <button type="button" className="sticker sticker-paper lyrics-close" onClick={() => ref.current?.close()}>
            <X size={16} weight="bold" aria-hidden="true" />
            {closeLabel}
          </button>
        </article>
      </dialog>
    </>
  );
}
