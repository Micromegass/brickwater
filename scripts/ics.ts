import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { loadShows } from "../lib/content/load";
import { buildShowIcs } from "../lib/ics";
import { localizedPath, SITE_URL } from "../lib/i18n/paths";

const OUT = path.join(process.cwd(), "public/ics");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const messages = {
  de: JSON.parse(readFileSync("messages/de.json", "utf8")),
  en: JSON.parse(readFileSync("messages/en.json", "utf8")),
} as const;

const shows = loadShows();
for (const show of shows) {
  for (const locale of ["de", "en"] as const) {
    const note =
      typeof show.note === "string" ? show.note : show.note?.[locale];
    const summary = `Brickwater live: ${show.venue}, ${show.city}`;
    const parts = [note, show.ticketUrl ? `${messages[locale].shows.tickets}: ${show.ticketUrl}` : undefined, SITE_URL]
      .filter(Boolean);
    const ics = buildShowIcs(show, {
      siteUrl: SITE_URL,
      summary,
      description: parts.join(" · "),
      url: `${SITE_URL}${localizedPath(locale, "/shows")}`,
    });
    const file = locale === "de" ? `${show.id}.ics` : `${show.id}.${locale}.ics`;
    writeFileSync(path.join(OUT, file), ics);
  }
}
console.log(`ics: ${shows.length} shows -> ${shows.length * 2} files`);
