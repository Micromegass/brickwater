# Übergabe: brickwater.de Relaunch

Stand: 10. September 2026. Die Seite läuft lokal mit `npm run dev` unter http://localhost:3100 und wird als statischer Export (`npm run build` → `out/`) auf Cloudflare Pages veröffentlicht.

## Was die Seite kann

- Deutsch unter `/`, Englisch unter `/en/` mit eigenen Adressen (`/konzerte/` ↔ `/en/shows/`, `/musik/` ↔ `/en/music/`).
- Hero: der Schriftzug BRICKWATER aus 3D-Ziegeln, der sich beim Laden zusammensetzt und unter dem Mauszeiger wie Wasser kräuselt. Wer "Bewegung reduzieren" eingestellt hat oder kein WebGL hat, sieht den gesetzten Schriftzug.
- Konzerte aus `content/shows.json` mit Kalenderdatei, Anfahrt, Ticketlink und Google-Rich-Results (MusicEvent). Anleitung: `content/README.md`.
- Alle vier Releases mit Titelliste, Songtexten (Season One und Jumping just to fall), Credits, Streaming-Links und Bandcamp-Player.
- Sechs Videos vom Folk's Worst Nightmare Kanal, YouTube lädt erst nach Klick (youtube-nocookie).
- Impressum und Datenschutzerklärung (DE verbindlich, EN als Übersetzung), keine Cookies, kein Tracking, kein Banner.
- SEO: Titel, Beschreibungen, hreflang, Sitemap, robots.txt, llms.txt, Open-Graph-Bilder, strukturierte Daten (MusicGroup, MusicAlbum mit Songtexten, MusicEvent, VideoObject, Breadcrumbs).

## Bitte vom Künstler prüfen

1. **Englische Bio** in `content/bio/en.json` ist eine Übersetzung des deutschen Textes. Ton und Wortwahl bitte einmal gegenlesen.
2. **Impressum**: Name, Anschrift und E-Mail sind eingetragen. Falls eine Umsatzsteuer-Identifikationsnummer existiert, muss sie ins Impressum (`components/legal/Impressum.tsx`, Abschnitt nach "Kontakt").
3. **Fotocredits**: Die neuen Fotos sind mit "Foto: Brickwater" ausgezeichnet. Falls jemand anderes fotografiert hat, in `content/images.json` den `credit` ändern.
4. **Merch**: Der alte Raptor-Records-Shop (Big Cartel) ist offline. Die Seite verlinkt deshalb zum Kauf auf Bandcamp. Gibt es noch CDs oder LPs anderswo, bitte Link nachreichen.
5. **Konzerte**: Aktuell sind keine Termine eingetragen; die Seite zeigt einen ehrlichen Hinweis. Erste Termine bitte in `content/shows.json` eintragen.
6. **Spotify-Link für die Single** "Jumping just to fall" konnte nicht ermittelt werden; auf der Single-Seite sind Bandcamp, Apple Music und das Video verlinkt.

## Rechtliches

Impressum und Datenschutzerklärung wurden mit anwaltlicher Sorgfalt für den tatsächlichen Umfang der Seite geschrieben (statisch, Cloudflare-Hosting, Zwei-Klick-Einbettungen, E-Mail-Kontakt). Sie sind KI-unterstützt entstanden: Das reduziert das Risiko erheblich, ersetzt aber keine Rechtsberatung. Es gibt keine Hochrisikobereiche (keine Gesundheitsdaten, keine Minderjährigen, keine Zahlungen). Zwei Dinge sind im Cloudflare-Konto zu tun: das Data Processing Addendum (AVV) akzeptieren und in den Zone-Einstellungen Rocket Loader, Auto Minify und E-Mail-Obfuscation ausschalten (siehe `GO-LIVE.md`).

## Für Entwickler

Siehe `CLAUDE.md` (Architektur, Befehle, Entscheidungen) und `GO-LIVE.md` (Umzug der Domain).
