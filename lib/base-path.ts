/**
 * Where the site is served from.
 *
 * Empty by default, which is the real deployment: brickwater.de serves from the
 * root and every path in this codebase is written for that. A GitHub Pages
 * project page serves under /<repo>/ instead, so the build sets these two
 * values and everything that emits a URL reads them from here.
 *
 * `next/link` and `next-intl`'s Link prepend the base path themselves. Anything
 * that builds an href or an asset path by hand has to call `withBase`, which is
 * the whole reason this module is one line of state and no imports: the image
 * loader is a client module and must not drag the routing table in with it.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a root-relative path with the base path, for plain anchors and assets. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Set on preview deployments so they never compete with the real domain. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";
