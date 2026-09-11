"use client";

import { X } from "@phosphor-icons/react";
import { useCallback, useRef, type ReactNode } from "react";

interface Props {
  /** Screen-reader name for both the trigger and the panel. */
  label: string;
  closeLabel: string;
  credit?: string;
  /** The thumbnail, rendered on the server. */
  thumbnail: ReactNode;
  /** The same photograph at full width, also server-rendered so it is in the HTML. */
  full: ReactNode;
}

/**
 * A photograph opens over the page at full width. Same native dialog as the
 * lyrics panel: the browser gives the focus trap, Escape and focus return, and
 * the only thing worth writing is closing on a click outside the picture.
 */
export function Lightbox({ label, closeLabel, credit, thumbnail, full }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const closeOnBackdrop = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) ref.current?.close();
  }, []);

  return (
    <>
      <button
        type="button"
        className="gallery-item"
        aria-label={label}
        onClick={() => ref.current?.showModal()}
      >
        {thumbnail}
      </button>
      <dialog ref={ref} className="lightbox" aria-label={label} onClick={closeOnBackdrop}>
        <figure className="lightbox-figure">
          {full}
          <figcaption className="lightbox-caption">
            <span className="etch">{credit ?? ""}</span>
            <button type="button" className="sticker lightbox-close" onClick={() => ref.current?.close()}>
              <X size={16} weight="bold" aria-hidden="true" />
              {closeLabel}
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
