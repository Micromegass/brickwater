import { siApplemusic, siBandcamp, siDeezer, siInstagram, siSpotify, siYoutube } from "simple-icons";

const ICONS = {
  instagram: siInstagram,
  bandcamp: siBandcamp,
  spotify: siSpotify,
  appleMusic: siApplemusic,
  youtube: siYoutube,
  deezer: siDeezer,
} as const;

export type SocialKey = keyof typeof ICONS;

export function SocialIcon({ name, size = 18 }: { name: SocialKey; size?: number }) {
  const icon = ICONS[name];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
