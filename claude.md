# Brickwater website (brickwater.de)

Relaunch of the site of Brickwater, indie/folk/punk solo project of Bricky Waters (Roman Deska), Nürnberg. Built 2026-09-10 for Axel's friend; replaces a 2018 single-page Bootstrap site (Axel's repo github.com/Micromegass/Brickwater-Responsive). Old site reference: https://www.brickwater.de/.

## Status (2026-09-10)

Feature-complete and running locally; all quality gates green (47 unit tests, 130 Playwright/axe checks, lint, typecheck, impeccable detector, Lighthouse CI). Not yet pushed to GitHub or deployed. See "Next steps".

## Stack and architecture

- **Next.js 16.3** App Router, `output: 'export'` (fully static, `out/`), `trailingSlash: true`, Turbopack. React pinned **19.2.8** (19.3 breaks `@react-three/fiber` peer range), TypeScript **5.9** (7.x unsupported by typescript-eslint), three **0.185** (0.186 has no types yet).
- **i18n**: next-intl 4 without middleware. German at the root, English under `/en`, localized slugs (`/konzerte` ↔ `/en/shows`, `/musik/[slug]` ↔ `/en/music/[slug]`, `/impressum` ↔ `/en/legal-notice`, `/datenschutz` ↔ `/en/privacy`). Two root layouts via route groups `app/(de)` and `app/(en)/en`; every layout and page calls `setRequestLocale`. Route files are thin wrappers around `components/pages/*`. `i18n/routing.ts` is the single source of the URL map; `lib/i18n/paths.ts` derives hreflang/sitemap/switcher URLs from it. The language switcher uses `getPathname` + a plain `<a>` (never `<Link locale>`; that needs middleware).
- **Content** in `content/`: `shows.json`, `releases/*.json` (tracklists, lyrics, links), `bio/{de,en}.json`, `images.json` (alt texts + credits), `site.json` (links, videos, appears-on). Validated with zod (`lib/content/schema.ts`) at build (`npm run validate:content`). Editing guide for the artist: `content/README.md`.
- **Images**: originals in `assets/source/` (gitignored, on Axel's Mac; includes the old-site photos, Bandcamp covers and YouTube posters). `scripts/images.mjs` (sharp) writes hashed WebP variants to `public/images/` (committed) and `lib/images/manifest.json`; `next/image` uses the custom loader `lib/images/loader.ts`. The FWN logo BMP was converted with `sips` first (sharp cannot read BMP).
- **Hero**: `components/hero/*`. `scripts/wordmark.ts` rasterizes BRICKWATER (desktop) and BRICK/WATER (mobile) into running-bond brick grids (`lib/hero/wordmark-*.json`, budgets ≤1500/≤600). `BrickWall.tsx` renders one `instancedMesh` with a `MeshStandardMaterial` extended via `onBeforeCompile`: per-instance assembly (easeOutExpo from scattered start positions) and up to 8 pointer ripples in the vertex shader; `frameloop="demand"`. `HeroClient.tsx` loads the chunk only after idle and only without reduced motion / with WebGL / without save-data; the typeset `<h1>` stays in the DOM (LCP element) and fades when the canvas signals ready (`data-canvas="ready"`).
- **Embeds**: YouTube (`youtube-nocookie.com`) and Bandcamp load only after a click; nothing is stored (each click is a consent). Fonts self-hosted (Bricolage Grotesque variable, OFL, `app/fonts/`).
- **SEO**: `lib/seo/metadata.ts` (titles, canonical, hreflang, OG), `lib/seo/jsonld.ts` (MusicGroup, MusicAlbum/MusicRecording with lyrics, MusicEvent, VideoObject, BreadcrumbList), `app/sitemap.ts` (alternates), `app/robots.ts`, `app/manifest.ts`, `public/llms.txt`, OG PNGs pre-rendered by `scripts/og.tsx` into `public/og/` (committed; Next's `opengraph-image` route emits extension-less files that Cloudflare would mis-type).
- **Design**: world = the LP record package (sleeve, inner sleeve, hype sticker, sticker sheet, label roundel). Tokens in `app/globals.css` (`@theme`): paper, ink, brick (single accent, hero material), water (inner-sleeve field for the music section). Direction contract is the HTML comment at the top of `<body>` in `components/layout/SiteShell.tsx`. Product truth: `PRODUCT.md`; visual system: `DESIGN.md`; impeccable surface brief: `.impeccable/surfaces/`.
- **Hosting**: Cloudflare Pages. `public/_headers` (CSP with `'unsafe-inline'` scripts because static export inlines RSC payloads; HSTS; caching), `public/_redirects`. Weekly rebuild via deploy hook (`.github/workflows/weekly-rebuild.yml`, secret `CF_PAGES_DEPLOY_HOOK_URL`) so past shows retire. Runbook: `GO-LIVE.md`.

## Commands

```
npm run dev            # http://localhost:3100 (port 4321 is taken on this Mac)
npm run build          # prebuild: validate content + generate ics; postbuild: link check, 404 fallback
npm run preview        # serve out/ on :4173
npm run images         # regenerate WebP variants + manifest from assets/source
npm run gen:wordmark   # regenerate brick layouts (after changing the display font)
npm run gen:og         # regenerate OG PNGs (needs assets/source/covers); --force to overwrite
npm run gen:icons      # apple-icon.png + favicon.ico from app/icon.svg
npm run check          # validate:content + typecheck + lint + unit tests
npm run test:e2e       # Playwright + axe against out/ (build first)
npm run lh:seo         # Lighthouse CI against out/
node scripts/screenshots.mjs [dir] [routes…]   # desktop + mobile screenshots incl. hero frames
```

## Decisions and why

- Next.js static export instead of Astro (Axel's choice from three options), Cloudflare Pages hosting, no analytics, no cookies, no consent banner.
- Shows are self-managed in `content/shows.json`; the Songkick widget (artist 8613194) listed zero shows and is gone. Facebook link dropped. Old Raptor Records shop links are dead (404), purchases point to Bandcamp.
- Only the two B&W full-band stage photos from the old site are kept (Arne Marenda Fotografie, Barham Ismail; credits must stay). The photo-filled old wordmark is retired.
- OG images are pre-rendered PNGs (see above). ICS files are generated at build into `public/ics/` (gitignored) rather than by route handlers (which emit extension-less files).
- Legal pages target § 5 DDG, § 18 (2) MStV, DSGVO and § 25 TDDDG; the EU ODR platform is deliberately not referenced (discontinued July 2025).

## Known gaps / open questions

- No upcoming shows were supplied; the shows section shows an honest empty state.
- Spotify album ID for the "Jumping just to fall" single unresolved (Bandcamp/Apple/YouTube linked instead).
- Client to confirm: English bio wording, USt-IdNr. (Impressum), photo credits for the 2026 shoot, any remaining physical merch.
- Impeccable reports a newer version (v4.3.1 vs installed 4.0.4); update with `npx impeccable update` if wanted.

## Next steps

1. Show the client the local build; collect feedback and the first show dates.
2. Create the GitHub repo, push, connect Cloudflare Pages (see `GO-LIVE.md`), add the deploy-hook secret, move the domain.
3. After go-live: Search Console + Bing sitemap submission, Rich Results test on the live URL, securityheaders.com check.
