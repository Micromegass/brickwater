import type { CSSProperties } from "react";
import { withBase } from "@/lib/base-path";

/**
 * The painted assets that stylesheets reach for by URL.
 *
 * A stylesheet cannot read the base path: it is a static file, and the prefix is
 * only known at build time. So the URLs are handed to CSS as custom properties
 * set on the root element, where everything inherits them, and `app/globals.css`
 * refers to them by name. The literal paths that remain in that file are inside
 * `@supports` tests, which check syntax and never fetch anything.
 */
export function assetVars(): CSSProperties {
  return {
    "--asset-wash-wordmark": `url(${withBase("/images/wash-wordmark.webp")})`,
    "--asset-rule-brush": `url(${withBase("/images/rule-brush.webp")})`,
    "--asset-edge-deckle": `url(${withBase("/images/edge-deckle.webp")})`,
    "--asset-edge-deckle-flip": `url(${withBase("/images/edge-deckle-flip.webp")})`,
  } as CSSProperties;
}
