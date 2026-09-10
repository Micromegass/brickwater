import { copyFileSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const problems: string[] = [];

function must(file: string) {
  if (!existsSync(path.join(OUT, file))) problems.push(`missing out/${file}`);
}

// 404 fallback for hosts that look for out/404.html
if (!existsSync(path.join(OUT, "404.html"))) {
  const candidate = path.join(OUT, "404/index.html");
  if (existsSync(candidate)) copyFileSync(candidate, path.join(OUT, "404.html"));
}

for (const file of ["index.html", "en/index.html", "sitemap.xml", "robots.txt", "404.html"]) must(file);

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

function targetExists(href: string): boolean {
  const clean = href.split(/[?#]/)[0];
  if (clean === "" || clean === "/") return existsSync(path.join(OUT, "index.html"));
  const rel = clean.replace(/^\//, "");
  const asFile = path.join(OUT, rel);
  return (
    existsSync(asFile) ||
    existsSync(path.join(OUT, rel.replace(/\/$/, ""), "index.html")) ||
    existsSync(`${path.join(OUT, rel.replace(/\/$/, ""))}.html`)
  );
}

const pages = htmlFiles(OUT);
const checked = new Set<string>();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const references = [
    ...html.matchAll(/(?:href|src)="(\/[^"]*)"/g),
    // stains and the wordmark wash are addressed from inline styles and CSS
    ...html.matchAll(/url\((?:&quot;|["'])?(\/[^)"'&]+)(?:&quot;|["'])?\)/g),
  ];
  for (const match of references) {
    const href = match[1];
    if (href.startsWith("//") || checked.has(href)) continue;
    checked.add(href);
    if (!targetExists(href)) problems.push(`${path.relative(OUT, page)} -> ${href} (missing)`);
  }
}

if (problems.length > 0) {
  console.error("postbuild checks failed:\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`postbuild ok: ${pages.length} pages, ${checked.size} internal links verified`);
