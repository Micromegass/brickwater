"use client";

import { useState } from "react";

interface Props {
  albumId?: string;
  trackId?: string;
  trackCount: number;
  title: string;
  loadLabel: string;
  hint: string;
  iframeTitle: string;
}

export function BandcampFacade({ albumId, trackId, trackCount, title, loadLabel, hint, iframeTitle }: Props) {
  const [active, setActive] = useState(false);
  const target = albumId ? `album=${albumId}` : `track=${trackId}`;
  const height = albumId ? Math.min(140 + trackCount * 33 + 40, 720) : 120;
  const src = `https://bandcamp.com/EmbeddedPlayer/${target}/size=large/bgcol=ffffff/linkcol=c2472b/artwork=none/tracklist=${albumId ? "true" : "false"}/transparent=true/`;
  return (
    <div className="bandcamp-facade">
      {active ? (
        <iframe className="w-full" style={{ height }} src={src} title={iframeTitle} seamless referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <div className="bandcamp-placeholder">
          <p className="font-semibold">{title}</p>
          <button type="button" className="sticker sticker-ink" onClick={() => setActive(true)}>
            {loadLabel}
          </button>
          <p className="text-caption text-ink-soft">{hint}</p>
        </div>
      )}
    </div>
  );
}
