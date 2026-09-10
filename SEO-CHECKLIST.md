# SEO-Checkliste brickwater.de

Stand 10.09.2026. Abgehakt, was im Build verifiziert ist (Unit-/E2E-Tests, Lighthouse CI).

## Technisch
- [x] Statischer Export, jede Seite eine eigene URL mit abschließendem Slash
- [x] `<html lang>` pro Sprache (de/en)
- [x] Canonical auf jeder Seite, hreflang de/en/x-default wechselseitig (E2E-Test)
- [x] `sitemap.xml` mit `xhtml:link`-Alternates für beide Sprachen, `robots.txt` mit Sitemap-Verweis
- [x] Eigene 404-Seite (`out/404.html`), `noindex`
- [x] `_headers`: HSTS, CSP, nosniff, Referrer-Policy; Pages-Vorschau mit `X-Robots-Tag: noindex`
- [x] Bilder als WebP in vier Breiten mit `srcset`, `sizes`, Blur-Platzhalter, Lazy Loading; Hero-Text als LCP-Element
- [x] Schriften selbst gehostet, `font-display: swap`, Preload durch next/font
- [x] Keine Cookies, kein Consent-Banner (Zwei-Klick-Einbettungen)
- [x] Lighthouse CI: SEO 100, Accessibility ≥ 95 (Fehler), Performance ≥ 90 (Warnung) auf `/`, `/konzerte/`, `/musik/season-one/`, `/en/`

## On-Page
- [x] Eindeutige Titel und Beschreibungen je Seite und Sprache (`messages/*.json` → `meta`)
- [x] Genau eine H1 pro Seite, Überschriftenhierarchie H1 → H2 → H3
- [x] Alt-Texte für jedes Bild in beiden Sprachen (`content/images.json`, Build bricht bei fehlenden ab)
- [x] Songtexte als Klartext im HTML (Suchanfragen nach Titel + "lyrics")
- [x] Interne Verlinkung: Home → Konzerte/Musik/Releases, Release → alle anderen Releases, Breadcrumbs im Schema

## Strukturierte Daten (JSON-LD)
- [x] `WebSite`, `MusicGroup` (mit `member` Person, `sameAs`, `foundingLocation`)
- [x] `MusicAlbum` + `MusicRecording` je Release inkl. `lyrics`, `duration`, `datePublished`, `recordLabel`
- [x] `MusicEvent` je anstehendem Konzert (Place, PostalAddress, Offer, eventStatus)
- [x] `VideoObject` für die beiden offiziellen Videos
- [x] `BreadcrumbList` auf Unterseiten
- [ ] Nach Go-live: Rich-Results-Test auf der Live-URL

## Social / GEO
- [x] Open-Graph-Bilder pro Seite und Sprache (`public/og/*.png`, 1200×630), `og:locale` + `og:locale:alternate`, Twitter Card
- [x] `llms.txt` mit Kernfakten und Links
- [x] Klare, zitierfähige Absätze (Bio, Release-Beschreibungen) statt Marketing-Floskeln

## Nach dem Go-live
- [ ] Google Search Console: Property `https://www.brickwater.de/` anlegen, Sitemap einreichen
- [ ] Bing Webmaster Tools: Sitemap einreichen (versorgt auch Copilot)
- [ ] Bandcamp-, Spotify- und Instagram-Profile auf `https://www.brickwater.de` verlinken (Backlinks, Entity-Signal)
- [ ] Bei neuen Konzerten: Eintrag in `content/shows.json`, das MusicEvent-Schema entsteht automatisch
