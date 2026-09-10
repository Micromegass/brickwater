import palette from "./palette.json";

export interface ReleasePalette {
  /** Carries text on paper; contrast is asserted by scripts/pigments.mjs. */
  accent: string;
  accentDeep: string;
  /** Pale enough to sit under ink. */
  wash: string;
  stain: string;
  contrast: number;
}

const PALETTES = palette as Record<string, ReleasePalette>;

/** The record's own pigments, sampled from its cover. Falls back to the house palette. */
export function releasePalette(slug: string): ReleasePalette {
  return (
    PALETTES[slug] ?? {
      accent: "#a8563c",
      accentDeep: "#8c422c",
      wash: "#f7efea",
      stain: "#a8563c",
      contrast: 4.6,
    }
  );
}

export const allReleasePalettes = PALETTES;
