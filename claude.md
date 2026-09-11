# Brickwater website (brickwater.de)

Relaunch of the site of Brickwater, indie/folk/punk solo project of Bricky Waters (Roman Deska), Nürnberg. Built 2026-09-10 for Axel's friend; replaces a 2018 single-page Bootstrap site (Axel's repo github.com/Micromegass/Brickwater-Responsive). Old site reference: https://www.brickwater.de/.

## Status (2026-09-11, after six rounds of client review)

Feature-complete and running locally; all quality gates green (61 unit tests, 158 Playwright/axe checks, lint, typecheck, impeccable detector clean, Lighthouse SEO 100 / a11y 100 / best practices 100 / perf 96-99 across five sampled routes, CLS 0). Pushed to GitHub (`github.com/Micromegass/brickwater`); Cloudflare Pages is still a dashboard step. See "Next steps".

Round 6 answered "the background looks static to me", which it was: the drift paths ran 96-138s on an eased alternation, so the marks moved about half a pixel in three seconds. They now run closed loops at 38/52/44s on linear timing and move roughly twelve pixels in three seconds; the wolves ghost gathers and dissolves in 34s instead of 128s, peaking at 0.14-0.16. Also in this round: one song plays from the hero on a record-label card (`heroTrack` in `content/site.json`, Bandcamp facade, nothing loads before a click), the hero photograph is the harmonica shot shown square and uncropped, and no divider is a straight line any more.

Round 5 made the page flow: the drift paths grew to about six percent of travel with a little rotation, a fourth mask of the two wolves gathers out of the haze and dissolves again on a 128s cycle (hero, music, collective), content arrives on a CSS view timeline (`.reveal`, transform only), the wordmark lost the indent that misaligned it from the tagline, the hero photo took the larger column and the copy now sits against its middle, an Instagram "Folgen" sticker joined the hero actions, every remaining page took the painted ground, and a gallery of all nineteen photographs opens each one in a lightbox.

Round 2 acted on the client's feedback: the palette is now sampled from the Season One sleeve, the 3D brick hero was replaced by a painted wordmark, three.js and every animation library were removed, the home page runs in his order, only three videos remain, the collective section shows two artworks he supplied, and every photo of him shows his face.

Round 4 is the design round: the hero became one full-viewport composition with the cat photo and a show badge in the flow, prints and video frames took a 14px edge, the marks grew and now travel on three slow wave paths, the socials moved into the header, and every song opens its lyrics in a panel over the page.

Round 3 answered "too big, too in your face": every type step came down (display tops out at 3.25rem, headings sit at weight 600, the wordmark at 7.2cqw), the measure narrowed to 1160px and the rhythm tightened. Colour now arrives as paint rather than blocks: the saturated sage field became paper the pigment soaked into, the collective's section took a clay-soaked ground, and the artist's own brush marks (manchas) drift at the edge of every section. Each album page wears its own record, with an accent, wash and stain sampled from that sleeve.

## Stack and architecture

- **Next.js 16.3** App Router, `output: 'export'` (fully static, `out/`), `trailingSlash: true`, Turbopack. React pinned **19.2.8** (19.3 breaks `@react-three/fiber` peer range), TypeScript **5.9** (7.x unsupported by typescript-eslint), three **0.185** (0.186 has no types yet).
- **i18n**: next-intl 4 without middleware. German at the root, English under `/en`, localized slugs (`/konzerte` ↔ `/en/shows`, `/musik/[slug]` ↔ `/en/music/[slug]`, `/impressum` ↔ `/en/legal-notice`, `/datenschutz` ↔ `/en/privacy`). Two root layouts via route groups `app/(de)` and `app/(en)/en`; every layout and page calls `setRequestLocale`. Route files are thin wrappers around `components/pages/*`. `i18n/routing.ts` is the single source of the URL map; `lib/i18n/paths.ts` derives hreflang/sitemap/switcher URLs from it. The language switcher uses `getPathname` + a plain `<a>` (never `<Link locale>`; that needs middleware).
- **Content** in `content/`: `shows.json`, `releases/*.json` (tracklists, lyrics, links), `bio/{de,en}.json`, `images.json` (alt texts + credits), `site.json` (links, videos, appears-on). Validated with zod (`lib/content/schema.ts`) at build (`npm run validate:content`). Editing guide for the artist: `content/README.md`.
- **Images**: originals in `assets/source/` (gitignored, on Axel's Mac; includes the old-site photos, Bandcamp covers and YouTube posters). `scripts/images.mjs` (sharp) writes hashed WebP variants to `public/images/` (committed) and `lib/images/manifest.json`; `next/image` uses the custom loader `lib/images/loader.ts`. The FWN logo BMP was converted with `sips` first (sharp cannot read BMP).
- **Hero**: `components/hero/Hero.tsx`, a server component with no client JavaScript. The h1 is real text in thin, widely spaced caps (the way the sleeve sets the name) filled with `background-clip: text` from `/images/wash-wordmark.webp`. `scripts/pigments.mjs` builds that wash from the Season One painting: it averages the painted band to a 9x6 grid, snaps every hue onto the two pigment families, holds saturation and lightness in a band, and exits non-zero if any part of the wash falls under 3:1 against the paper. The paint soaks in once on load (CSS keyframes, 1.9s) and never loops; reduced motion, forced colours and browsers without background-clip all have explicit fallbacks.
- **Embeds**: YouTube (`youtube-nocookie.com`) and Bandcamp load only after a click; nothing is stored (each click is a consent). Fonts self-hosted (Bricolage Grotesque variable, OFL, `app/fonts/`).
- **SEO**: `lib/seo/metadata.ts` (titles, canonical, hreflang, OG), `lib/seo/jsonld.ts` (MusicGroup, MusicAlbum/MusicRecording with lyrics, MusicEvent, VideoObject, BreadcrumbList), `app/sitemap.ts` (alternates), `app/robots.ts`, `app/manifest.ts`, `public/llms.txt`, OG PNGs pre-rendered by `scripts/og.tsx` into `public/og/` (committed; Next's `opengraph-image` route emits extension-less files that Cloudflare would mis-type).
- **Design**: world = the LP record package (sleeve, inner sleeve, hype sticker, sticker sheet, runout etching). Every colour in `app/globals.css` (`@theme`) is sampled from the Season One sleeve: paper #f3f2f0, ink #222222, clay #a8563c (the salmon wolf, the single accent), sage #5b6a55 (the green wolf). Whole sections sit on paper those pigments soaked into (#eef0ea, #f7efea), never on a saturated slab.
- **Manchas**: `components/ui/Stain.tsx` places brush marks lifted off the sleeve by `scripts/pigments.mjs`, two or three per section, each on one of three wave paths (`drift="a" | "b" | "c"`) that stop under reduced motion, plus a `ghost` variant of the `wolves` mask that gathers and dissolves on a 34s cycle in three places only, which turns the paint's own density into an alpha channel and fades every edge so a crop cannot leave a rectangle. The file carries the shape; the colour is a token, which is what lets a release page stain itself. They are `aria-hidden`, sit inside their section, and vanish under forced colours.
- **Dividers**: no straight lines. `scripts/pigments.mjs` cuts `rule-brush.webp` (one long stroke, thinned at both ends) and `edge-deckle.webp` plus its mirror (a band solid on one side, torn on the other, made tileable by cross-fading its ends). `.rule` paints the stroke in a 0.5rem band; the tinted grounds move onto a `::before` so the deckle can tile across their top and bottom. Both keep the 1px hairline as the fallback where masks are unsupported. Tracklist row rules stay hairlines on purpose.
- **Hero player**: `components/music/HeroPlayer.tsx`, the one song the hero plays, set like a seven inch centre label. The song is `heroTrack` in `content/site.json` (release, title, Bandcamp track id), validated at build against that release's own tracklist, so the artist can change it without touching code. Bandcamp loads only on click; the card keeps its frame and title afterwards.
- **Reveal**: `.reveal` in `app/globals.css` is the one scroll effect, a 14px rise on a CSS view timeline, so no JavaScript ships. Transform only, never opacity: text caught mid-fade renders at a blended colour that fails axe, and a range ending in `cover` can never complete for the last block on a page. The range ends inside `entry`.
- **Gallery**: `/galerie` and `/en/gallery` (`components/pages/GalleryPage.tsx`) list the ordered `gallery` array in `content/site.json`, validated against the image manifest so a typo fails the build. Each print opens in `components/ui/Lightbox.tsx`, a native `<dialog>` in the lyrics-panel pattern. The home photo strip links into it.
- **Lyrics**: `components/music/TrackList.tsx` is the one track list on the site; a song with lyrics renders `components/music/LyricsDialog.tsx`, a native `<dialog>` whose content is server-rendered so the words stay in the HTML and in the JSON-LD. The old `<details>` accordion is gone.
- **Album pages**: `scripts/pigments.mjs` samples each cover's dominant painted hue, deepens it until it carries body text on paper, and writes `lib/releases/palette.json`. `ReleasePage` sets those as `--release-*` custom properties, so the head band, accent, track numbers, focus ring and mancha belong to that record. The generator and `tests/unit/release-palette.test.ts` both refuse a palette that fails contrast. Direction contract is the HTML comment at the top of `<body>` in `components/layout/SiteShell.tsx`. Product truth: `PRODUCT.md`; visual system: `DESIGN.md`; impeccable surface brief: `.impeccable/surfaces/`.
- **Hosting**: Cloudflare Pages. `public/_headers` (CSP with `'unsafe-inline'` scripts because static export inlines RSC payloads; HSTS; caching), `public/_redirects`. Weekly rebuild via deploy hook (`.github/workflows/weekly-rebuild.yml`, secret `CF_PAGES_DEPLOY_HOOK_URL`) so past shows retire. Runbook: `GO-LIVE.md`.

## Commands

```
npm run dev            # http://localhost:3100 (port 4321 is taken on this Mac)
npm run build          # prebuild: validate content + generate ics; postbuild: link check, 404 fallback
npm run preview        # serve out/ on :4173
npm run images         # regenerate WebP variants + manifest from assets/source
npm run gen:pigments   # wordmark wash, watercolour stains, and a palette per album
npm run shot ".sel" out.png [/route/] [click] [width]   # screenshot one element
npm run gen:og         # regenerate OG PNGs (needs assets/source/covers); --force to overwrite
npm run gen:icons      # apple-icon.png + favicon.ico from app/icon.svg
npm run check          # validate:content + typecheck + lint + unit tests
npm run test:e2e       # Playwright + axe against out/ (build first)
npm run lh:seo         # Lighthouse CI against out/
node scripts/screenshots.mjs [dir] [routes…]   # desktop + mobile screenshots incl. hero frames
```

## Decisions and why

- Next.js static export instead of Astro (Axel's choice from three options), Cloudflare Pages hosting, no analytics, no cookies, no consent banner.
- Round 2: the client rejected the 3D brick hero as too much for a singer-songwriter and asked for the sleeve's colours. three.js, @react-three/fiber, drei, @napi-rs/canvas and motion were removed with it (58 packages); the site now ships no animation library and no canvas. The home page order (hero, bio, videos, music, collective, shows, booking) is his and is asserted by an end-to-end test.
- Videos are exactly the three he chose: Starving, Jumping just to fall, and the Loft Lo-Fi session on Franken Fernsehen's channel. VideoObject JSON-LD stays on the two official Brickwater videos only, because the third is another publisher's.
- Shows are self-managed in `content/shows.json`; the Songkick widget (artist 8613194) listed zero shows and is gone. Facebook link dropped. Old Raptor Records shop links are dead (404), purchases point to Bandcamp.
- Only the two B&W full-band stage photos from the old site are kept (Arne Marenda Fotografie, Barham Ismail; credits must stay). The photo-filled old wordmark is retired.
- OG images are pre-rendered PNGs (see above). ICS files are generated at build into `public/ics/` (gitignored) rather than by route handlers (which emit extension-less files).
- Legal pages target § 5 DDG, § 18 (2) MStV, DSGVO and § 25 TDDDG; the EU ODR platform is deliberately not referenced (discontinued July 2025).

## Known gaps / open questions

- No upcoming shows were supplied; the shows section shows an honest empty state.
- The Folk's Worst Nightmare collective photo has no known photographer; it is uncredited until the client says otherwise.
- The Season One lyrics came off the old site as one block per song, with no line breaks, so the panel shows them as prose. Adding blank lines in `content/releases/*.json` splits them into stanzas; the renderer already does that.
- The harmonica photograph is now both the hero image and the second print in the home photo strip. The strip's four images and their order were dictated by the client, so it was left alone; he may want to swap that slot.
- Two photos the client asked for never arrived: `InShot20200226_221538321.jpg` (fourth in the strip, standing in with the 2021 live shot) and `bild 4.jpg` (third in the strip).
- Spotify album ID for the "Jumping just to fall" single unresolved (Bandcamp/Apple/YouTube linked instead).
- Client to confirm: English bio wording, USt-IdNr. (Impressum), photo credits for the 2026 shoot, any remaining physical merch.
- Impeccable reports a newer version (v4.3.1 vs installed 4.0.4); update with `npx impeccable update` if wanted.

## Next steps

1. Show the client the local build; collect feedback and the first show dates.
2. Connect Cloudflare Pages to `github.com/Micromegass/brickwater` (see `GO-LIVE.md`), add the `CF_PAGES_DEPLOY_HOOK_URL` secret, move the domain.
3. After go-live: Search Console + Bing sitemap submission, Rich Results test on the live URL, securityheaders.com check.
