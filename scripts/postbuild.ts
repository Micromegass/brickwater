import { copyFileSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
// A project-page build prefixes every href; the files on disk do not carry it.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
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

function filesWithSuffix(dir: string, suffix: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return filesWithSuffix(full, suffix);
    return name.endsWith(suffix) ? [full] : [];
  });
}

const htmlFiles = (dir: string) => filesWithSuffix(dir, ".html");
const cssFiles = (dir: string) => filesWithSuffix(dir, ".css");

function targetExists(href: string): boolean {
  let clean = href.split(/[?#]/)[0];
  if (BASE_PATH && clean.startsWith(BASE_PATH)) clean = clean.slice(BASE_PATH.length) || "/";
  if (clean === "" || clean === "/") return existsSync(path.join(OUT, "index.html"));
  const rel = clean.replace(/^\//, "");
  const asFile = path.join(OUT, rel);
  return (
    existsSync(asFile) ||
    existsSync(path.join(OUT, rel.replace(/\/$/, ""), "index.html")) ||
    existsSync(`${path.join(OUT, rel.replace(/\/$/, ""))}.html`)
  );
}

/**
 * Every root-relative reference the build emits, from markup and from
 * stylesheets. Stylesheets matter as much as markup here: a mask or a
 * background is fetched exactly like an image, and a stylesheet cannot read the
 * base path, so it is the likeliest place for one to go missing.
 */
function references(text: string): string[] {
  // An `@supports` prelude names a URL only to ask whether the property parses;
  // nothing is ever fetched from it. Drop those conditions before scanning, or
  // every feature test reads as a broken link. A condition cannot contain a
  // brace, so matching up to the first one is exact.
  const fetched = text.replace(/@supports[^{]*\{/g, "");
  return [
    ...fetched.matchAll(/(?:href|src)="(\/[^"]*)"/g),
    ...fetched.matchAll(/url\((?:&quot;|["'])?(\/[^)"'&]+)(?:&quot;|["'])?\)/g),
  ].map((match) => match[1]);
}

const sources = [
  ...htmlFiles(OUT).map((file) => ({ file, text: readFileSync(file, "utf8"), kind: "page" })),
  ...cssFiles(OUT).map((file) => ({ file, text: readFileSync(file, "utf8"), kind: "stylesheet" })),
];
const checked = new Set<string>();
for (const source of sources) {
  for (const href of references(source.text)) {
    if (href.startsWith("//") || checked.has(href)) continue;
    checked.add(href);
    const where = `${source.kind} ${path.relative(OUT, source.file)}`;
    // On a project page every URL the site serves lives under the prefix. One
    // that does not is a link to the wrong origin's root, and it will 404 in a
    // browser while still resolving against out/ on disk, which is exactly how
    // the stain masks slipped through the first time.
    if (BASE_PATH && !href.startsWith(`${BASE_PATH}/`) && href !== BASE_PATH) {
      problems.push(`${where} -> ${href} (escapes the base path ${BASE_PATH})`);
      continue;
    }
    if (!targetExists(href)) problems.push(`${where} -> ${href} (missing)`);
  }
}

if (problems.length > 0) {
  console.error("postbuild checks failed:\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
const pageCount = sources.filter((s) => s.kind === "page").length;
const styleCount = sources.length - pageCount;
console.log(
  `postbuild ok: ${pageCount} pages, ${styleCount} stylesheets, ${checked.size} internal links verified`,
);
