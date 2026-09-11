import type { CSSProperties } from "react";
import { withBase } from "@/lib/base-path";

export type StainShape = "clay" | "sage" | "ink" | "wolves";
/** Which of the three wave paths this mark travels on. */
export type StainDrift = "a" | "b" | "c";

interface Props {
  /** Which brush mark from the sleeve to use. */
  shape: StainShape;
  drift?: StainDrift;
  /** A ghost gathers out of the haze and dissolves again instead of only drifting. */
  ghost?: boolean;
  /** Placement and size, as Tailwind classes on the section's positioning context. */
  className: string;
  /** Any colour token or a release's own pigment. Defaults to the shape's pigment. */
  color?: string;
  opacity?: number;
  /** Seconds to offset this mark inside its lane, so two marks sharing a lane
   *  do not travel as one body. Negative advances it. */
  phase?: number;
}

const DEFAULT_COLOR: Record<StainShape, string> = {
  wolves: "var(--color-clay)",
  clay: "var(--color-clay)",
  sage: "var(--color-sage-paint)",
  ink: "var(--color-ink-soft)",
};

/**
 * A mancha: paint lifted off the record sleeve with the paper dissolved away.
 * The file carries only the shape, so the colour stays a token and a release
 * page can stain itself in its own record's pigment. Decorative throughout.
 * Each mark travels one of three closed paths while its density breathes on a
 * different period, so overlapping marks read as smoke rather than as shapes
 * sliding. Everything stands still for anyone who asks for reduced motion.
 */
export function Stain({ shape, className, color, opacity, ghost, phase, drift = "a" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`stain ${ghost ? "stain-ghost" : `stain-drift-${drift}`} ${className}`}
      style={
        {
          "--stain-shape": `url(${withBase(`/images/stain-${shape}.webp`)})`,
          "--stain-color": color ?? DEFAULT_COLOR[shape],
          ...(opacity === undefined ? {} : { "--stain-opacity": String(opacity) }),
          ...(phase === undefined ? {} : { "--stain-phase": `${phase}s` }),
        } as CSSProperties
      }
    />
  );
}
