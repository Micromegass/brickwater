---
name: Brickwater
description: The record package as a website, in the sleeve's own colours.
colors:
  paper: "#f3f2f0"
  paper-deep: "#e9e8e5"
  ink: "#222222"
  ink-deep: "#131313"
  ink-soft: "#524b45"
  clay: "#a8563c"
  clay-deep: "#8c422c"
  clay-wash: "#f0dcd2"
  sage: "#5b6a55"
  sage-deep: "#47523f"
  sage-wash: "#e8ece2"
  line: "#dfddd8"
  paper-sage: "#eef0ea"
  paper-clay: "#f7efea"
  sage-paint: "#6b8159"
typography:
  wordmark:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "7.2cqw"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "0.135em"
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2.2vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 1.25rem + 1.2vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 0.94rem + 0.4vw, 1.2rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  day:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  venue:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "normal"
  brand:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.16em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  small:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  hype:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.82rem, 1vw, 0.95rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "normal"
  etch:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.08em"
  address:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 0.9rem + 1.1vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  micro:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  meta:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  none: "0px"
  print: "14px"
  print-lg: "18px"
  sticker: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  section: "clamp(3.25rem, 5vw, 5.5rem)"
  gutter: "clamp(1.1rem, 4vw, 3rem)"
components:
  sticker-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    padding: "0.66rem 1.15rem"
  sticker-clay-hover:
    backgroundColor: "{colors.clay-deep}"
  sticker-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    padding: "0.66rem 1.15rem"
  sticker-ink-hover:
    backgroundColor: "{colors.ink-deep}"
  sticker-paper:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
    padding: "0.66rem 1.15rem"
  sticker-paper-hover:
    backgroundColor: "{colors.paper-deep}"
  hype-sticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sticker}"
    size: "clamp(5.25rem, 6.5vw, 6.5rem)"
  section-sage:
    backgroundColor: "{colors.paper-sage}"
    textColor: "{colors.ink}"
  section-clay:
    backgroundColor: "{colors.paper-clay}"
    textColor: "{colors.ink}"
  stain:
    backgroundColor: "{colors.clay}"
  header:
    backgroundColor: "{colors.paper}"
    height: "3.5rem"
---

# Design System: Brickwater

## Overview

**Creative North Star: "The record package, in the sleeve's own colours"**

The site behaves like the physical object a Brickwater fan already owns: a sleeve on uncoated stock, the printed inner sleeve with the lyrics, a round hype sticker, a sheet of die-cut stickers, the tiny lettering pressed into the runout. Nothing here was colour-picked by taste. Every value is sampled from the Season One sleeve, the watercolour wolves Julia Feisleben painted: the paper is the sleeve's neutral gray, the ink is the black it was printed in, clay is the salmon animal, sage is the green one. The wordmark is not typeset in a colour at all, it is filled with a wash mixed from that same painting, which is what the artist's first logo did.

The rejected default was the dark full-bleed band poster with white uppercase type and a row of streaming badges. The scene is daylight, a fan checking the next show on a phone at a beer garden table, so the theme is light and locked: no section inverts to dark, no second accent appears, no gradients, no glass, and no WebGL.

**Key Characteristics:**
- Two materials only: square paper for anything printed, pill stickers for anything pressable.
- Colour arrives as paint, not as blocks: whole sections sit on paper the pigment has soaked into, and the artist's own brush marks (manchas) drift at the edges of every section.
- Nothing shouts. The display steps are small, headings sit at weight 600, and hierarchy comes from space and colour rather than size.
- One display family, Bricolage Grotesque variable, from the runout etching to the wordmark, carried by its optical-size axis.
- One authored motion moment: the paint soaking into the wordmark on load. After that the page holds still; everything else moves only in answer to a hover or a press.
- Every album page wears its own record: its accent, wash and stain are sampled from that sleeve.

## Colors

The sleeve's own palette: neutral gray paper, printed black, and the two pigments the painter used.

### Primary
- **Clay** (#a8563c): the salmon wolf, and the single accent. Primary buttons, links on legal pages, the play disc on video posters, selection, focus rings. 4.6:1 on paper, 5.2:1 for paper text on it.
- **Clay deep** (#8c422c): hover of clay stickers, and the solid fallback colour of the wordmark where a browser cannot clip a background to text.
- **Clay wash** (#f0dcd2): the only tinted surface on paper, behind the right-to-object block on the privacy page.

### Secondary
- **Sage** (#5b6a55): the green wolf. It appears as paint, in the manchas and as the tint of a whole section, never as a slab of colour behind text.
- **Sage deep** (#47523f) and **sage wash** (#e8ece2): the ends of that pigment, for dividers and for the palest marks.

### Soaked grounds
- **Paper sage** (#eef0ea): the music section. Ink reads at 13.9:1 on it, ink soft at 6.6:1.
- **Paper clay** (#f7efea): the collective's section. Ink reads at 14:1, ink soft at 6.7:1.
- **Sage paint** (#6b8159): the painting's green at brush strength, for the marks only. Spread thin across a section, the soaked green reads as gray; this does not.

### Neutral
- **Paper** (#f3f2f0): page ground, header, paper stickers.
- **Paper deep** (#e9e8e5): hover of paper stickers, image loading ground.
- **Ink** (#222222): text, ink stickers, the hype sticker, video poster ground.
- **Ink deep** (#131313): hover of ink stickers, and the tint of the one text shadow on a photographic poster.
- **Ink soft** (#524b45): secondary text, intros, captions, footer etching. 7.5:1 on paper, and still over 4.5:1 where a mark passes under it.
- **Line** (#dfddd8): hairlines between show rows and lyric rows, header and footer borders.

### Named Rules
**The One Clay Rule.** Clay is the only accent. At most one primary action per section carries it, and it is never a large field.
**The Sage Field Rule.** Sage is a region, not an accent: it fills the whole music section and is never used for text, borders or buttons on paper.
**The Sampled Palette Rule.** New colours are not invented. They are sampled from a sleeve, and a value that cannot be traced to one does not belong in the system.
**The Soaked Ground Rule.** A section may take a pigment, but only as paper that pigment has soaked into. Text always sits on paper, never on a saturated field.

## Typography

**Display Font:** Bricolage Grotesque (variable opsz 12-96, wdth 75-100, wght 200-800; self-hosted woff2; fallback ui-sans-serif, system-ui)
**Body Font:** the same family at optical size 14
**Label/Mono Font:** none. No monospace anywhere.

**Character:** One family doing every job. The wordmark takes it thin and widely spaced, the way the record sets the band's name; headings take it at weight 800 and optical size 96, where it is chunky and poster-like; body text takes it at optical size 14, where it is a quiet text face. Emphasis comes from weight and size, never from a second family, italics in headlines, or colour on single words.

### Hierarchy
- **Wordmark** (300, 11.1cqw of the hero container, tracking 0.135em, uppercase): the h1 on the home page only. Filled with the wash, never with a flat colour.
- **Display** (800, clamp(3rem, 2rem + 6vw, 6rem), 0.95): page titles on subpages. Never above 6rem.
- **Headline** (800, clamp(2.25rem, 1.5rem + 3vw, 3.5rem), 1.02): section headings, the inlay quote on the shows page.
- **Lead** (500, clamp(1.25rem, 1rem + 1.1vw, 1.7rem)): the hero tagline and page intros.
- **Title** (700, 1.5rem): release titles in lists, legal subheadings, the empty-state statement.
- **Day** (800, 2.4rem) and **Venue** (700, 1.35rem): the date and the room in a show row.
- **Brand** (400, 1.05rem, tracking 0.16em, uppercase): the header wordmark, the same lettering as the hero at reading size.
- **Body** (400, 1.0625rem, 1.6, optical size 14): all running text, measure 66ch. **Small** (400, 0.9375rem) for list descriptions and credits.
- **Hype** (800, clamp(0.95rem, 1.2vw, 1.15rem)), **micro** (0.72rem, tracking 0.04em, uppercase) and **meta** (0.78rem): the three lines inside the hype sticker.
- **Etch** (500, 0.8125rem, tracking 0.08em, width 90, uppercase in the footer): photo credits, footer, quote attribution. The only tracked-out text besides the wordmark and the brand, and it never sits above a heading.

### Named Rules
**The No Kicker Rule.** Nothing small sits above a heading. Category information goes into the sentence below it.
**The One Voice Rule.** Bricolage Grotesque only. The display voice comes from weight and optical size, not from a second face.

## Layout

A single container of max-width 1400px with a fluid gutter of clamp(1.1rem, 4vw, 3rem). Sections breathe with clamp(4rem, 8vw, 7.5rem) of vertical padding; the sage field runs edge to edge behind its container. A twelve-column grid at lg splits photo and text sections 6/6 or 5/7 (bio, Folk's Worst Nightmare, contact, release detail); lists (shows, lyrics, appears-on) are single-column with hairlines between rows and never both top and bottom borders. Videos are three equal 16:9 frames in one row at lg and stack below. Release rows are four columns at md, two below. The photo strip is a snap-scrolling row on small screens and a four-up grid at lg. The header is 4rem, sticky, one line at every width. Spacing rhythm: more space above a heading (2.5rem) than below it (0.75-1rem).

The home page runs hero, bio and photographs, videos, music, the collective, shows, booking. That order is the artist's and is asserted by an end-to-end test.

Responsive: the wordmark is one line and stacks to BRICK over WATER below 640px, where the hype sticker leaves the wordmark and sits beneath it, aligned right.

## Elevation & Depth

Depth is physical, not tonal: photographs, covers and video frames carry a sleeve shadow with a real offset and soft blur, stickers a smaller one, and flat print (text, hairlines, fields) has none. No halos, no zero-offset glows, no glass.

### Shadow Vocabulary
- **Sleeve** (`box-shadow: 0 2px 4px rgb(34 34 34 / 0.08), 0 18px 40px -24px rgb(34 34 34 / 0.45)`): photos, covers, video posters.
- **Sticker** (`box-shadow: 0 1px 2px rgb(34 34 34 / 0.12), 0 8px 24px -12px rgb(34 34 34 / 0.35)`): clay stickers, the hype sticker, the play disc.

### Named Rules
**The Paper Lies Flat Rule.** Text, fields and hairlines never cast shadows. Only objects placed on the paper (prints, stickers) do.

## Shapes

Three silhouettes, in a strict order. **Prints** carry a soft edge: photos, album covers and video frames use `print` (14px), and the hero photo uses `print-lg` (18px). **Stickers** are die-cut: buttons, chips, the language toggle, the show badge and the play disc are fully round. **Grounds and rules stay square**: section backgrounds, hairlines and the legal highlight have no radius at all, so the paper itself never looks like a card.

A print lifts 3px and deepens its shadow on hover, which is the only place the page pretends to be physical.

## Components

### Buttons ("stickers")
- **Shape:** pill (999px), padding 0.8rem 1.35rem, weight 600, optical size 14, icon 18px before the label, gap 0.5rem.
- **Clay:** clay background, paper text, sticker shadow. One per section at most. Hover: clay deep.
- **Ink:** ink background, paper text, for the strongest secondary action (follow on Instagram, load a player, the collective's channel). Hover: ink deep.
- **Paper:** paper background, ink text, 1.5px inset ink ring. The default chip for links out.
- **Outline on sage:** transparent, paper text and a 1.5px ring; hover paper at 12%.
- **Active:** translate down 1px and scale 0.985. Focus: 3px clay outline offset 3px, paper outline on the sage field.

### Chips
The same component as buttons; streaming and social chips are paper stickers with the brand glyph from Simple Icons at 18px. There is no selected state; chips are always links out.

### Cards / Containers
There are no cards. Grouping is done by spacing and hairlines. The only bordered containers are the Bandcamp placeholder (1px line) and the privacy highlight (clay wash with a 30% clay border).

### Inputs / Fields
None. Contact is a mailto link plus a copy button.

### Navigation
Sticky 4rem header on 90% paper with a 10px backdrop blur and a hairline. The brand sits left in the sleeve's lettering; links are weight 600 with a 2px clay underline on hover; the language switcher is a small paper sticker reading EN or DE. The skip link is a clipped ink sticker revealed on focus. The footer is uppercase etch text in ink soft: copyright, photo credits, legal links.

### Manchas (signature)

Marks of the artist's own paint, lifted off the sleeve by `scripts/pigments.mjs`: the paper is dissolved away by turning the paint's own density into an alpha channel, and every edge and corner is faded so a crop can never leave a rectangle. The file carries only the shape; the colour is a token, which is what lets a release page stain the page in its own record's pigment. They sit at 0.16 to 0.34 opacity, two or three per section, always inside their section, always behind the content, always `aria-hidden`, and they disappear entirely under forced colours or where masks are unsupported. Each mark travels one of three long wave paths (96s, 138s, 112s, `ease-in-out`, alternating), about six percent of travel with a degree or two of rotation, staggered so the background never repeats and nothing ever moves quickly. Transform only, so no frame costs a layout, and every path stops under reduced motion.

Two rules the marks earn the hard way: a mark must sit fully inside its section, because a section's clip turns a faded edge into a rectangle; and the mask must never be scaled past 100%, for the same reason.

### The wolves, gathering (signature)

A fourth mask, `stain-wolves.webp`, is taken from the whole painted band of the sleeve rather than a single stroke, so it carries both animals. It is used as a ghost: `<Stain shape="wolves" ghost />` fades from nothing up to its resting strength and back over 128 seconds while it drifts, so the smoke gathers into the two wolves and comes apart again. Three on the site and no more, at 0.10 to 0.12: the hero, the music section and the collective. Like every mark it is a shape only, so its colour is a token, and it holds still under reduced motion.

### Arriving on scroll (signature)

`.reveal` puts a 14px rise and a hair of scale on a CSS view timeline, so nothing ships to make it work and a browser without view timelines simply shows the content, which is also what reduced motion gets. It is transform only, never opacity, for two reasons learned the hard way: text caught mid-fade renders at a blended colour that fails contrast, and a range ending in `cover` can never complete for the last block on a page, which would leave it faded for good. The range ends inside `entry`, which every element reaches. It is on headings, intros, photographs, tiles and rows, and never in the hero, which must not touch the largest paint.

### Gallery and lightbox (signature)

The gallery is a column flow, two columns from 40rem and three from 64rem, so portrait and landscape prints sit together at their own proportions and nothing is cropped to fit. Each print is a button that opens `components/ui/Lightbox.tsx`, a native `<dialog>` in the same pattern as the lyrics panel: the browser gives the focus trap, Escape and focus return, and the only thing worth writing is closing on a click outside the picture. The photograph fills the height of the darkened room; its credit and a paper close sticker sit under it. Under the thumbnails only third-party credits are printed, because the artist's own fifteen photographs are already credited in the footer.

### An album page in its own record (signature)
`scripts/pigments.mjs` samples each cover's most present painted hue and deepens it until it carries body text on paper, then derives a wash pale enough to sit under ink and a stain at half strength. The page sets those four values as custom properties, so its head band, accent, track numbers, focus ring and mancha all belong to that record while the structure stays identical. The script refuses to emit a palette that fails contrast, and a unit test asserts it for every release.

### Lyrics panel (signature)
A song opens its lyrics in a native `<dialog>` over the page, typeset like an inner sleeve: the track number in the record's own accent, the title, a rule, then the text at a 46ch measure on paper. The backdrop is ink at 55% with a light blur. The lyrics are rendered on the server inside the dialog, so they stay in the HTML for search engines and for the `MusicRecording` JSON-LD. `components/music/TrackList.tsx` is the one list used on the home page and on every release page; a song without lyrics stays plain text rather than pretending to be pressable.

### Wordmark (signature)
BRICKWATER in thin, widely spaced caps, filled by `background-clip: text` with `/images/wash-wordmark.webp`, a wash built by `scripts/pigments.mjs` from the sleeve painting. The script averages the painted band down to a nine by six grid, snaps every hue onto one of the two pigment families, holds saturation and lightness inside a band, and fails the build if any part of the wash drops under 3:1 against the paper. On load the paint soaks in once: opacity 0 to 1, background-size 150% 260% to 100% 100%, saturation 0.3 to 1, 1.9s on the expo curve. It never loops. Reduced motion and forced colours get the finished mark with no animation; a browser without background-clip gets clay deep.

### Show badge (signature)
A pill in ink with a clay dot, sitting in the flow under the hero's buttons. It is always about shows: the next date, its city and venue when one is announced, and "folgt bald" when none is. It links to the shows page either way, so an empty calendar still leads somewhere. It used to float over the wordmark as a round sticker, which read as a second, unrelated layer.

### Video and player facades
Video posters sit in a 16:9 ink frame with the sleeve shadow, the title bottom-left in paper over a soft ink shadow, and a clay play disc (4.25rem) centred. A click replaces the poster with the youtube-nocookie iframe. The Bandcamp placeholder is a hairline-bordered paper box with a title, an ink "load" sticker and a caption.

## Do's and Don'ts

### Do:
- Sample new colours from the sleeve, and keep the whole page light; the sage field is a printed region, not a dark mode.
- Use clay for exactly one action per section, and let the wordmark and the manchas be where the painting itself appears as material.
- Keep the display steps small. If something needs more presence, give it space or pigment, not more size.
- Set every heading in Bricolage Grotesque at weight 800 and optical size 96; put category words in the sentence below, not above.
- Show real photographs and real artwork with their credits in etch type beneath; keep covers square with the sleeve shadow.
- Add motion only in answer to the visitor, beyond the single soak-in of the wordmark.

### Don't:
- No kickers, eyebrows or section numbers above headings; no tracked uppercase labels except the wordmark, the brand, and etch captions.
- No cards, no nested containers, no radius on grounds or rules, no gradients, no gradient text, no glass, no glows.
- No second accent colour beyond a release's own, no gray text on a tinted ground, no pure black.
- No mancha behind body copy at an opacity that touches its contrast, and never one that a section's edge cuts into a rectangle.
- No WebGL, and no scroll-driven effect beyond the one `.reveal` rise, which is transform only and never touches the contrast of the text it moves. The background is the one place that loops, and it loops slowly enough to be felt rather than watched.
- No overlays, badges or pills on photographs; no hand-drawn icons; no emoji as icons.
- No em dashes anywhere in copy; ranges and separators use a plain hyphen or a full stop.
