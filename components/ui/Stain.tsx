import type { CSSProperties } from "react";

export type StainShape = "clay" | "sage" | "ink";
/** Which of the three wave paths this mark travels on. */
export type StainDrift = "a" | "b" | "c";

interface Props {
  /** Which brush mark from the sleeve to use. */
  shape: StainShape;
  drift?: StainDrift;
  /** Placement and size, as Tailwind classes on the section's positioning context. */
  className: string;
  /** Any colour token or a release's own pigment. Defaults to the shape's pigment. */
  color?: string;
  opacity?: number;
}

const DEFAULT_COLOR: Record<StainShape, string> = {
  clay: "var(--color-clay)",
  sage: "var(--color-sage-paint)",
  ink: "var(--color-ink-soft)",
};

/**
 * A mancha: paint lifted off the record sleeve with the paper dissolved away.
 * The file carries only the shape, so the colour stays a token and a release
 * page can stain itself in its own record's pigment. Decorative throughout.
 * Each mark travels one of three slow wave paths, and stands still for anyone
 * who asks for reduced motion.
 */
export function Stain({ shape, className, color, opacity, drift = "a" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`stain stain-drift-${drift} ${className}`}
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
