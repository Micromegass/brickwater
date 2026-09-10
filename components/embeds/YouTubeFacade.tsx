"use client";

import { Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import type { PhotoProps } from "@/lib/images/photo";

interface Props {
  id: string;
  title: string;
  poster: PhotoProps;
  playLabel: string;
  iframeTitle: string;
  large?: boolean;
}

export function YouTubeFacade({ id, title, poster, playLabel, iframeTitle, large }: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className="video-facade">
      {active ? (
        <iframe
          className="video-frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={iframeTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setActive(true)} aria-label={playLabel}>
          <Image
            src={poster.src}
            alt=""
            fill
            sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            placeholder="blur"
            blurDataURL={poster.blurDataURL}
            className="video-poster-img"
          />
          <span className="video-play" aria-hidden="true">
            <Play weight="fill" size={large ? 28 : 22} />
          </span>
          <span className="video-title">{title}</span>
        </button>
      )}
    </div>
  );
}
