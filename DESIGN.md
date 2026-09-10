---
name: Brickwater
description: The record package as a website. Paper, ink, brick, water.
colors:
  paper: "#fbfaf8"
  paper-deep: "#f1ede6"
  ink: "#1f1d1b"
  ink-soft: "#5c4a42"
  brick: "#c2472b"
  brick-deep: "#8f3018"
  brick-wash: "#f5e3dc"
  water: "#1d5c6a"
  water-deep: "#123f4a"
  water-wash: "#dcebee"
  mortar: "#e6dfd6"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2rem + 6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  etch:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sticker: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  section: "clamp(4rem, 8vw, 7.5rem)"
  gutter: "clamp(1.1rem, 4vw, 3rem)"
components:
  sticker-brick:
    backgroundColor: "{colors.brick}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    padding: "0.8rem 1.35rem"
  sticker-brick-hover:
    backgroundColor: "{colors.brick-deep}"
  sticker-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    padding: "0.8rem 1.35rem"
  sticker-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
    padding: "0.8rem 1.35rem"
  sticker-paper-hover:
    backgroundColor: "{colors.paper-deep}"
  hype-sticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    size: "clamp(7.5rem, 11vw, 10rem)"
  section-water:
    backgroundColor: "{colors.water}"
    textColor: "{colors.paper}"
  header:
    backgroundColor: "{colors.paper}"
    height: "4rem"
---

# Design System: Brickwater

## Overview

**Creative North Star: "The record package"**

The site behaves like the physical object a Brickwater fan already owns: a sleeve on uncoated stock, the printed inner sleeve with the lyrics, a round hype sticker slapped on the front, a sheet of die-cut stickers, the label roundel, the tiny lettering pressed into the runout. The ground is paper, the print is ink, and the one saturated material is brick: it builds the wordmark out of actual 3D bricks in the hero and returns only where something is pressable or important. Water (a deep river teal) is the single inner-sleeve field, owned by the music section and by nothing else.

The rejected default was the dark full-bleed band poster with white uppercase type and a row of streaming badges. The scene is daylight (a fan checking the next show on a phone at a Biergarten table), so the theme is light and locked: no section inverts to dark, no second accent appears, no gradients, no glass.

**Key Characteristics:**
- Two materials only: square paper for anything printed, pill stickers for anything pressable.
- One display family (Bricolage Grotesque, variable) carrying every size from etching to wordmark via its optical-size axis.
- One authored motion moment: the brick wordmark assembling, then rippling under the pointer. Everything else is still, except the label roundel turning at 40 s per revolution.
- Photographs sit on the paper with a soft, offset sleeve shadow; no overlays, no pills on images, credits as small etch captions beneath.

## Colors

Warm paper and soft ink with a single brick accent and one teal field; everything else is tint of those.

### Primary
- **Brick** (#c2472b): the accent and the hero material. Primary CTAs, the play button on video posters, link color on legal pages, the selection color, focus rings. On paper it holds 4.8:1, with paper text on it 4.9:1.
- **Brick deep** (#8f3018): hover state of brick stickers and the darker "clinker" bricks in the wall.
- **Brick wash** (#f5e3dc): the only tinted surface on paper, used for the highlighted right-to-object block on the privacy page.

### Secondary
- **Water** (#1d5c6a): the inner-sleeve field behind the music section. Paper text on water reads at 7.5:1.
- **Water wash** (#dcebee): secondary text and track numbers on the water field (never grey on a colored surface); also the cool fill light in the hero.

### Neutral
- **Paper** (#fbfaf8): page ground, header, paper stickers.
- **Paper deep** (#f1ede6): hover of paper stickers, image loading ground.
- **Ink** (#1f1d1b): text, ink stickers, the hype sticker, the roundel, video poster ground.
- **Ink soft** (#5c4a42): secondary text, intros, captions, footer etching. 7:1 on paper.
- **Mortar** (#e6dfd6): hairlines between show rows and lyric rows, header and footer borders.

### Named Rules
**The One Brick Rule.** Brick is the only accent. It appears on at most one primary action per section and never as a large field; the bricks in the hero are the exception because there it is a material, not a highlight.
**The Water Field Rule.** Water is a region, not an accent: it fills the whole music section edge to edge and is never used for text, borders or buttons on paper.

## Typography

**Display Font:** Bricolage Grotesque (variable opsz 12–96, wdth 75–100, wght 200–800; self-hosted woff2; fallback ui-sans-serif, system-ui)
**Body Font:** Bricolage Grotesque at optical size 14
**Label/Mono Font:** none. No monospace anywhere.

**Character:** One family doing every job. At optical size 96 and weight 800 it is chunky, slightly eccentric and poster-like; at optical size 14 it is a quiet, readable text face. Emphasis comes from weight and size, never from a second family, italics in headlines, or color on single words.

### Hierarchy
- **Wordmark** (800, 14.3cqw of its stage, line-height 0.86, uppercase): the h1 on the home page only, rendered as bricks when WebGL is available and as type otherwise.
- **Display** (800, clamp(3rem, 2rem + 6vw, 6rem), 0.95): page titles on subpages. Never above 6rem.
- **Headline** (800, clamp(2.25rem, 1.5rem + 3vw, 3.5rem), 1.02): section headings on the home page, the inlay quote on the shows page.
- **Title** (700, 1.5rem, 1.2): release titles in lists, past-shows heading, legal subheadings, empty-state statement.
- **Body** (400, 1.0625rem, 1.6, optical size 14): all running text, measure 66ch.
- **Small** (400, 0.9375rem): descriptions in lists, credits.
- **Etch** (500, 0.8125rem, letter-spacing 0.08em, width 90, uppercase in the footer): photo credits, footer, quote attribution. The only tracked-out text in the system; it never sits above a heading.

### Named Rules
**The No Kicker Rule.** Nothing small sits above a heading. Category information goes into the sentence below the heading ("Aktuelles Release: Album, 2018. 8 Songs.").
**The One Voice Rule.** Bricolage Grotesque only; the display voice is set by weight 800 and optical size 96, not by a different face.

## Layout

A single container of max-width 1400px with a fluid gutter of clamp(1.1rem, 4vw, 3rem). Sections breathe with clamp(4rem, 8vw, 7.5rem) of vertical padding; the music field runs edge to edge behind its container. A twelve-column grid at lg splits photo and text sections 7/5 or 5/7 (bio, FWN, contact, release detail); lists (shows, lyrics, appears-on) are single-column with mortar hairlines between rows and never both top and bottom borders. Release rows are four columns at md, two below. The photo strip is a snap-scrolling row on small screens and a four-up grid at lg. The header is 4rem, sticky, one line at every width (Konzerte, Musik, plus Videos and Kontakt from sm, then the language sticker). Spacing rhythm: more space above a heading (2.5rem) than below it (0.75–1rem).

Responsive: the hero stage keeps an aspect of 85/18 and switches to 28/23 at ≤640px, where the wordmark stacks BRICK over WATER and the hype sticker moves to the top right. Track lists collapse from two columns to one below sm.

## Elevation & Depth

Depth is physical, not tonal: photographs and covers carry a sleeve shadow with a real offset and soft blur, stickers a smaller one, and flat print (text, hairlines, fields) has none. No halos, no zero-offset glows, no glass. The hero's depth is real lighting on real geometry (a hemisphere light plus one warm key and one cool fill).

### Shadow Vocabulary
- **Sleeve** (`box-shadow: 0 2px 4px rgb(31 29 27 / 0.08), 0 18px 40px -24px rgb(31 29 27 / 0.45)`): photos, covers, video posters.
- **Sticker** (`box-shadow: 0 1px 2px rgb(31 29 27 / 0.12), 0 8px 24px -12px rgb(31 29 27 / 0.35)`): brick stickers, the hype sticker, the video play disc.

### Named Rules
**The Paper Lies Flat Rule.** Text, fields and hairlines never cast shadows. Only objects placed on the paper (prints, stickers) do.

## Shapes

Two silhouettes. Paper is square: photos, covers, video frames, the water field, legal highlight box and all hairlines have radius 0. Stickers are die-cut: buttons, chips, the language toggle, the hype sticker, the play disc and the roundel are fully round (999px). Nothing in between; no 8px or 16px corners anywhere. The wordmark bricks themselves are rounded boxes (radius ≈ 14% of the short side) so they catch light.

## Components

### Buttons ("stickers")
- **Shape:** pill (999px), padding 0.8rem 1.35rem, weight 600, optical size 14, icon 18px before the label, gap 0.5rem.
- **Brick:** brick background, paper text, sticker shadow. One per section at most. Hover: brick deep.
- **Ink:** ink background, paper text. Used for the strongest secondary action (follow on Instagram, load player, collective link).
- **Paper:** paper background, ink text, 1.5px inset ink ring. The default chip for links out (streaming services, socials, calendar, map).
- **Outline on water:** transparent, paper text and 1.5px ring; hover paper at 12%.
- **Active:** translate down 1px and scale 0.985 (a physical press). Focus: 3px brick outline offset 3px (paper outline on the water field).

### Chips
Same component as buttons; the streaming and social chips are paper stickers with the brand glyph from Simple Icons at 18px. There is no selected state; chips are always links out.

### Cards / Containers
There are no cards. Grouping is done by spacing and mortar hairlines. The only bordered containers are the Bandcamp placeholder (1px mortar) and the privacy highlight (brick wash with a 30% brick border).

### Inputs / Fields
None. Contact is a mailto link plus a copy button.

### Navigation
Sticky 4rem header on 90% paper with a 10px backdrop blur and a mortar hairline. Brand at the left as uppercase 800 wordmark type (1.2rem); links weight 600 with a 2px brick underline on hover; the language switcher is a small paper sticker reading EN or DE. The skip link is a fixed ink sticker revealed on focus. Footer: uppercase etch text in ink soft with copyright, photo credits and legal links.

### Hero wordmark (signature)
A stage with aspect 85/18 (28/23 on phones) holding the typeset h1; when the client allows motion and WebGL, a React Three Fiber canvas fades in over it with the same word built from 797 (desktop) or 338 (mobile) instanced bricks in brick with hue and lightness jitter and 8% clinkers. Bricks fly in from scattered positions with an exponential ease-out over about 2.5 s, left to right; afterwards pointer movement and taps push up to eight ripples through the wall. Reduced motion, save-data and missing WebGL keep the typeset wordmark.

### Hype sticker (signature)
A round ink sticker, clamp(7.5rem, 11vw, 10rem), rotated -8°, overlapping the top right of the wordmark stage, carrying the next show (date and city) or, without dates, the latest release. Hover straightens it to -4° and scales it 1.04.

### Label roundel (signature)
An ink disc with a paper center holding the Folk's Worst Nightmare woodcut logo and a ring of uppercase 700 text (letter-spacing 0.2em) on an SVG textPath, turning once every 40 s; static under reduced motion.

### Video and player facades
Video posters sit in a 16:9 ink frame with the sleeve shadow, the title bottom-left in paper with a soft text shadow and a brick play disc (4.25rem) centered; a click replaces the poster with the youtube-nocookie iframe. The Bandcamp placeholder is a mortar-bordered paper box with title, an ink "load" sticker and a caption.

## Do's and Don'ts

### Do:
- Keep the whole page light; the water field is a printed region, not a dark mode.
- Use brick for exactly one action per section and let the bricks in the hero be the only large brick area.
- Set every heading in Bricolage Grotesque at weight 800 and optical size 96; put category words in the sentence below, not above.
- Show real photographs with their credits in etch type beneath; keep covers square with the sleeve shadow.
- Add motion only as a response to the visitor (hover, press, open) beyond the hero's single assembly moment.

### Don't:
- No kickers, eyebrows or section numbers above headings; no tracked uppercase labels except etch captions and the footer.
- No cards, no nested containers, no rounded corners other than pills, no gradients, no gradient text, no glass, no glows.
- No second accent color, no grey text on the water field, no pure black.
- No overlays, badges or pills on photographs; no icons drawn by hand; no emoji as icons.
- No em dashes anywhere in copy; ranges and separators use a plain hyphen or a full stop.
