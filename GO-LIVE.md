# Go-live: brickwater.de auf Cloudflare Pages

## 1. Repository und Pages-Projekt

1. Repository auf GitHub anlegen (z. B. `Micromegass/brickwater`) und pushen.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → Repository wählen.
3. Build-Einstellungen: Framework-Preset **Next.js (Static HTML Export)**, Build command `npm run build`, Build output directory `out`. Node-Version kommt aus `.node-version` (24.15.0).
4. Ersten Build abwarten; die Vorschau unter `<projekt>.pages.dev` prüfen (dort ist `noindex` gesetzt, siehe `public/_headers`).

## 2. Deploy-Hook für den wöchentlichen Neubau

Pages-Projekt → Settings → Builds & deployments → Deploy hooks → neuen Hook anlegen. Die URL als GitHub-Secret `CF_PAGES_DEPLOY_HOOK_URL` hinterlegen (Repository → Settings → Secrets → Actions). Der Workflow `.github/workflows/weekly-rebuild.yml` ruft ihn montags auf, damit vergangene Konzerte automatisch in "Gespielt" wandern.

## 3. Domain umziehen

1. Pages-Projekt → Custom domains → `www.brickwater.de` und `brickwater.de` hinzufügen. Liegt die DNS-Zone bereits bei Cloudflare, werden die Einträge automatisch gesetzt; sonst beim aktuellen Registrar die Nameserver auf Cloudflare umstellen oder CNAME/ALIAS-Einträge auf `<projekt>.pages.dev` anlegen.
2. Redirect Rule (Rules → Redirect Rules): `brickwater.de/*` → `https://www.brickwater.de/$1`, 301. Die kanonischen URLs der Seite nutzen `www`.
3. SSL/TLS auf **Full (strict)**, HSTS ist über `public/_headers` gesetzt.

## 4. Zone-Einstellungen, die sonst die Seite kaputt machen

In Speed → Optimization **ausschalten**: Rocket Loader, Auto Minify, Mirage. In Scrape Shield **ausschalten**: Email Address Obfuscation. Alle drei injizieren Skripte in das HTML und kollidieren mit der Content-Security-Policy und der React-Hydration.

## 5. Nach dem Umzug prüfen

- `https://www.brickwater.de/` lädt, Sprachwechsel funktioniert, `/konzerte/` und `/en/shows/` antworten mit 200.
- `https://www.brickwater.de/sitemap.xml` und `/robots.txt` erreichbar; Sitemap in der Google Search Console einreichen (beide Sprachversionen sind darin enthalten).
- Rich-Results-Test (search.google.com/test/rich-results) für `/` und `/musik/season-one/`.
- Security-Header prüfen (securityheaders.com): CSP, HSTS, X-Frame-Options sollten grün sein.
- Im Cloudflare-Konto das Data Processing Addendum bestätigen (Account → Compliance), Basis für Abschnitt 2 der Datenschutzerklärung.
- Alte Seite: Das bisherige Apache-Hosting kann gekündigt werden, sobald DNS umgestellt ist. Es gibt keine alten Unterseiten, die weitergeleitet werden müssten.
