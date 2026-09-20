# Inhalte pflegen (für Brickwater)

Alles, was auf der Website steht, liegt in diesem Ordner als Textdateien. Du brauchst keinen Entwickler: Datei im GitHub-Webeditor öffnen (Stiftsymbol), ändern, unten auf **Commit changes** klicken. Die Seite baut sich danach von selbst neu und ist nach etwa drei Minuten aktuell. Unter **Actions** siehst du den Lauf: grüner Haken heißt, es ist online. Wenn etwas an deiner Änderung nicht stimmt, wird der Lauf rot und die **alte Seite bleibt unverändert online** — kaputt machen kannst du also nichts.

Zusätzlich baut sich die Seite jeden Montagmorgen automatisch neu. Das ist der Grund, warum ein Konzert von allein aus "Demnächst" verschwindet, nachdem es gespielt wurde, ohne dass du etwas tun musst.

## Konzerte ankündigen: `shows.json`

Ein Konzert ist ein Block in geschweiften Klammern. Mehrere Konzerte stehen mit Komma getrennt zwischen den eckigen Klammern. Vergangene Konzerte wandern automatisch in die Liste "Gespielt" und dürfen einfach stehen bleiben.

```json
[
  {
    "id": "2026-10-03-nuernberg-z-bau",
    "date": "2026-10-03",
    "time": "20:00",
    "city": "Nürnberg",
    "venue": "Z-Bau",
    "address": "Frankenstraße 200, 90461 Nürnberg",
    "ticketUrl": "https://www.z-bau.com/tickets/...",
    "eventUrl": "",
    "note": { "de": "mit Folk's Worst Nightmare", "en": "with Folk's Worst Nightmare" },
    "status": "scheduled"
  }
]
```

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `id` | ja | Eindeutig, nur Kleinbuchstaben, Ziffern und Bindestriche. Am besten `datum-stadt-ort`. |
| `date` | ja | Datum als `JJJJ-MM-TT`. |
| `time` | nein | Beginn als `HH:MM`. Weglassen, wenn unbekannt. |
| `city`, `venue` | ja | Stadt und Ort. |
| `address` | nein | Straße und Ort für den Kalender und die Anfahrt. |
| `ticketUrl`, `eventUrl` | nein | Links zu Tickets bzw. zur Veranstaltungsseite. Leer lassen (`""`) oder weglassen. |
| `note` | nein | Kurzer Zusatz, entweder ein Text oder getrennt für Deutsch und Englisch wie oben. |
| `status` | nein | `scheduled` (Standard), `cancelled` (abgesagt), `postponed` (verschoben) oder `soldout` (ausverkauft). |

Wenn etwas nicht stimmt (zum Beispiel ein Komma fehlt), bricht der Bau ab und die alte Seite bleibt online. GitHub zeigt dann unter "Actions" eine rote Markierung mit der Fehlermeldung.

## Bio und Texte: `bio/de.json`, `bio/en.json`

`paragraphs` sind die Absätze der Bio (das `♡` ist der Trenner), `short` der kurze Satz für Suchmaschinen, `fwn` der Text über Folk's Worst Nightmare. Anführungszeichen im Text bitte als `\"` schreiben.

## Releases: `releases/*.json`

Pro Release eine Datei. Für ein neues Release am einfachsten `season-one.json` kopieren, umbenennen (der Dateiname wird die Adresse, z. B. `neues-album.json` → `/musik/neues-album/`) und die Felder anpassen. Das Cover muss vorher als Bild eingebaut werden (siehe unten), `cover` ist der Bildname ohne Endung. Songtexte kommen in `lyrics`; Absätze mit einer Leerzeile trennen.

## Bilder

Neue Fotos kommen nicht direkt hierher, sondern in den Ordner `assets/source/` auf dem Rechner, der die Seite baut. Dort trägt man sie in `scripts/images.mjs` mit einem sprechenden Namen ein, führt `npm run images` aus und ergänzt den Alternativtext in `images.json`. Das ist der einzige Schritt, für den ein Rechner mit dem Projekt nötig ist.

## Alles andere

Oberflächentexte (Buttons, Überschriften, Menü) stehen in `messages/de.json` und `messages/en.json`. Impressum und Datenschutz liegen in `components/legal/`. Links zu Spotify, Instagram usw. in `site.json`.
