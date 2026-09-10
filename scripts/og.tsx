// Renders the Open Graph images into public/og/<key>-<locale>.png (committed).
// Run: npm run gen:og [--force]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { loadReleases } from "../lib/content/load";

const OUT = path.join(process.cwd(), "public/og");
const force = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });

const font = (file: string) => readFileSync(path.join(process.cwd(), "app/fonts/og", file));
const fonts = [
  { name: "Bricolage", data: font("BricolageGrotesque-ExtraBold.ttf"), weight: 800 as const, style: "normal" as const },
  { name: "Bricolage", data: font("BricolageGrotesque-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "Bricolage", data: font("BricolageGrotesque-Regular.ttf"), weight: 400 as const, style: "normal" as const },
];

const messages = {
  de: JSON.parse(readFileSync("messages/de.json", "utf8")),
  en: JSON.parse(readFileSync("messages/en.json", "utf8")),
};

interface Card {
  key: string;
  locale: "de" | "en";
  title: string;
  subtitle: string;
  cover?: string;
}

function brickRow(offset: boolean, count: number) {
  return (
    <div style={{ display: "flex", gap: 6, marginLeft: offset ? 36 : 0 }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ width: 66, height: 30, background: i % 7 === 3 ? "#8f3018" : "#c2472b", borderRadius: 4 }} />
      ))}
    </div>
  );
}

async function render(card: Card) {
  const cover = card.cover && existsSync(card.cover) ? `data:image/jpeg;base64,${readFileSync(card.cover).toString("base64")}` : null;
  const response = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbfaf8", color: "#1f1d1b", fontFamily: "Bricolage", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -40, bottom: -14, display: "flex", flexDirection: "column", gap: 6, opacity: 0.95 }}>
          {brickRow(false, 20)}
          {brickRow(true, 20)}
          {brickRow(false, 20)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 150px", width: cover ? 760 : 1200 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1, color: "#c2472b", textTransform: "uppercase" }}>Brickwater</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: card.title.length > 18 ? 84 : 112, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95 }}>{card.title}</div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 36, fontWeight: 400, color: "#5c4a42", lineHeight: 1.2 }}>{card.subtitle}</div>
          </div>
        </div>
        {cover ? (
          <div style={{ position: "absolute", right: 72, top: 64, width: 400, height: 400, display: "flex", boxShadow: "0 24px 60px rgba(31,29,27,0.35)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" width={400} height={400} style={{ objectFit: "cover" }} />
          </div>
        ) : null}
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
  return Buffer.from(await response.arrayBuffer());
}

const cards: Card[] = [];
for (const locale of ["de", "en"] as const) {
  const m = messages[locale];
  cards.push(
    { key: "home", locale, title: "Indie, Folk & Punk", subtitle: m.site.tagline.replace(/^Indie, [Ff]olk (und|and) [Pp]unk /, "").replace(/^aus |^from /, locale === "de" ? "aus " : "from ") },
    { key: "shows", locale, title: m.shows.heading, subtitle: m.shows.intro },
    { key: "music", locale, title: m.music.heading, subtitle: m.music.intro },
    { key: "legal", locale, title: m.meta.legal.title, subtitle: "brickwater.de" },
    { key: "privacy", locale, title: m.meta.privacy.title, subtitle: "brickwater.de" },
  );
  for (const release of loadReleases()) {
    cards.push({
      key: `release-${release.slug}`,
      locale,
      title: release.title,
      subtitle: `${m.music.types[release.type]}, ${release.year}`,
      cover: path.join(process.cwd(), "assets/source/covers", `${release.slug}.jpg`),
    });
  }
}

async function main() {
  let written = 0;
  for (const card of cards) {
    const file = path.join(OUT, `${card.key}-${card.locale}.png`);
    if (existsSync(file) && !force) continue;
    writeFileSync(file, await render(card));
    written += 1;
  }
  console.log(`og: ${cards.length} cards, ${written} written`);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
