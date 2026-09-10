import type { CSSProperties } from "react";

export type StainShape = "clay" | "sage" | "ink";

interface Props {
  /** Which brush mark from the sleeve to use. */
  shape: StainShape;
  /** Placement and size, as Tailwind classes on the section's positioning context. */
  className: string;
  /** Any colour token or a release's own pigment. Defaults to the shape's pigment. */
  color?: string;
  opacity?: number;
}

const DEFAULT_COLOR: Record<StainShape, string> = {
  clay: "var(--color-clay)",
  sage: "var(--color-sage)",
  ink: "var(--color-ink-soft)",
};

/**
 * A mancha: paint lifted off the record sleeve with the paper dissolved away.
 * The file carries only the shape, so the colour stays a token and a release
 * page can stain itself in its own record's pigment. Decorative throughout.
 */
export function Stain({ shape, className, color, opacity }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`stain ${className}`}
      style={
        {
          "--stain-shape": `url(/images/stain-${shape}.webp)`,
          "--stain-color": color ?? DEFAULT_COLOR[shape],
          ...(opacity === undefined ? {} : { "--stain-opacity": String(opacity) }),
        } as CSSProperties
      }
    />
  );
}
