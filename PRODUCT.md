# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, `output: 'export'`, fully static), React 19.2, Tailwind CSS 4, next-intl for German/English, no animation library and no WebGL, deployed to Cloudflare Pages from GitHub. Chosen by the user (Axel Braunschweiger, building for the artist) from three offered options on 2026-09-10.

## Users

- Fans and casual listeners in and around Nürnberg and the German folk-punk scene who want to know when and where Brickwater plays next, hear the music, and read lyrics. They arrive from Instagram, a flyer, a festival line-up, or a search for a song title.
- Bookers, festival programmers, venue owners and journalists checking whether Brickwater is real, what it sounds like, and how to reach the artist. They need a video, a bio, releases and a booking email within one scroll.
- The artist himself (Roman Deska, "Bricky Waters"), a non-developer who will edit the show list in a JSON file through the GitHub web editor.

The interface serves German first; English is a full second language, not a stub.

## Product Purpose

The site is the artist's own home on the web: announce shows, present all releases with lyrics and streaming links, show the videos, tell the story of the solo project and the Folk's Worst Nightmare collective, and make booking contact obvious. Success means a visitor understands within seconds what Brickwater sounds like and where to hear it live, search engines surface the site for the band name and its song titles, and the artist can announce a show without a developer.

## Positioning

Brickwater is one person with a guitar case and a harmonica, playing "irgendwo in den Sphären zwischen Indie, Folk bis Punk", solo or with the Folk's Worst Nightmare collective, on cobblestones, forest clearings and festival stages. The artist's own copy frames the music as a legal drug: dopamine for the smile in between, serotonin to dull the pain, "Anwendung bei Bedarf, Unterdosierung vermeiden". The songs are in English; the voice, the humour and the scene are Franconian. No neighbouring act can copy the harmonica-and-guitar-case solo format, the FWN membership, the pharma metaphor, or the Nürnberg roots together.

## Operating Context

- Shows are announced by editing `content/shows.json` in GitHub; Cloudflare rebuilds the site on every push and once a week on a schedule so past shows retire automatically.
- Releases live as JSON files with tracklists and lyrics; covers and photos go through `npm run images`.
- Videos are hosted on YouTube (Folk's Worst Nightmare channel), music on Bandcamp, Spotify, Apple Music and Deezer; Bandcamp is the purchase channel because the former label shop is offline.
- Legal pages (Impressum, Datenschutzerklärung) are mandatory for a German operator and are part of the product, not an afterthought.
- No cookies, no analytics, no tracking; third-party players load only after a click.

## Capabilities and Constraints

- Static site, no backend, no forms, no accounts. Contact is a mailto link.
- Two languages with mirrored, localized URLs (German at the root, English under /en).
- Motion is the painted background, which moves continuously, plus the wordmark's wash soaking in once on load and a transform-only rise as content enters the viewport. Everything stops under reduced motion.
- Performance budget: Lighthouse performance 95+, SEO 100, accessibility 95+ on every page.
- Undecided: whether a USt-IdNr. exists for the Impressum (marked for the client); no upcoming shows were supplied at launch, so the show list ships with an honest empty state.

## Brand Commitments

- Name: Brickwater. Frontperson: Bricky Waters. Collective: Folk's Worst Nightmare (FWN), with its woodcut guitar-in-flames logo.
- Voice: warm, self-ironic, direct, mixing German and English in one breath ("Thanks for stopping by. Soundmäßig wie immer 'brickwaterish'"). The pharma metaphor is the artist's own and stays.
- Hero direction: the client rejected the "Bricks & Water" 3D wordmark in round 2 as too much for a singer-songwriter. The hero is now the wordmark filled with a wash lifted from the Season One sleeve, over painted marks that move like smoke.
- Photography: the September 2026 outdoor and stage shoot is the primary imagery; two black-and-white full-band live photos (Arne Marenda Fotografie, Barham Ismail) represent the band era and must carry their credits.
- The old photo-filled wordmark logo is retired; Facebook is no longer linked.

## Evidence on Hand

- 10 new photos (2026-09-08 shoot), 5 older social photos (2019-2021), one FWN duo photo, FWN logo in two variants: `assets/source/` (originals) and `public/images/` (generated).
- 4 releases with full metadata and links (Season One 2018, Jumping just to fall 2018, Against Couragefalls 2016, Aloah from Brickwater 2015); Season One lyrics in full: `content/releases/`.
- 6 videos on the FWN YouTube channel, two of them official: `content/site.json`.
- Bio in German (client-supplied) and English (translated, flagged for client review): `content/bio/`.
- Absent, must not be fabricated: press quotes, testimonials, streaming numbers, ticket prices, upcoming shows, merch stock.

## Product Principles

1. The next show and the sound come first; everything a booker needs is within one scroll.
2. Real material only: the artist's photos, words, lyrics and credits; no stock, no invented proof.
3. The artist edits content without a developer; every content change is a text file.
4. Privacy is a feature: no tracking, no consent banner, third parties only after a click.
5. Both languages are first-class; German is the source of truth for legal texts.

## Accessibility & Inclusion

WCAG 2.2 AA (European Accessibility Act context): keyboard-operable everything, visible focus, 4.5:1 body contrast, reduced-motion respected, correct `lang` per page, real alt texts in both languages.
