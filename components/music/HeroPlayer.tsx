"use client";

import { Play } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  /** Bandcamp's own id for this track, verified against the album. */
  trackId: string;
  title: string;
  /** "Album, 2018 · Season One" */
  meta: string;
  /** Full sentence for screen readers, e.g. "Listen to Starving, from Season One". */
  ariaLabel: string;
  hint: string;
  /** Where the privacy policy lives, and what to call it. */
  privacyHref: string;
  privacyLabel: string;
  iframeTitle: string;
}

/**
 * The one song the hero plays, set like the centre label of a seven inch: a
 * clay disc, the title, the record it came off. Nothing reaches Bandcamp until
 * the label is pressed, and afterwards the title stays put so the player still
 * belongs to the page.
 */
export function HeroPlayer({ trackId, title, meta, ariaLabel, hint, privacyHref, privacyLabel, iframeTitle }: Props) {
  const [active, setActive] = useState(false);
  const src = `https://bandcamp.com/EmbeddedPlayer/track=${trackId}/size=small/bgcol=f3f2f0/linkcol=a8563c/artwork=none/transparent=true/`;

  return (
    <div className="hero-player">
      {active ? (
        <div className="hero-player-card">
          <p className="hero-player-title">{title}</p>
          <p className="hero-player-meta">{meta}</p>
          <iframe
            className="hero-player-frame"
            src={src}
            title={iframeTitle}
            seamless
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <button type="button" className="hero-player-button" aria-label={ariaLabel} onClick={() => setActive(true)}>
          <span className="hero-player-disc" aria-hidden="true">
            <Play size={19} weight="fill" />
          </span>
          <span className="hero-player-text">
            <span className="hero-player-title">{title}</span>
            <span className="hero-player-meta">{meta}</span>
          </span>
        </button>
      )}
      <p className="hero-player-hint">
        {hint}{" "}
        <a href={privacyHref} className="underline">
          {privacyLabel}
        </a>
      </p>
    </div>
  );
}
