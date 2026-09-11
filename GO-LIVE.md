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

## 6. Vorschau auf GitHub Pages

Die Seite liegt zusätzlich als Vorschau auf GitHub Pages, damit es einen Link
gibt, bevor die Domain umgezogen ist. Deployt wird bei jedem Push auf `main`
über `.github/workflows/deploy-pages.yml`.

Einmalig einzustellen: Settings -> Pages -> Build and deployment -> Source:
GitHub Actions. Der Workflow versucht das selbst, darf dabei aber scheitern.

Adresse: `https://micromegass.github.io/brickwater/`

Was dabei anders ist als auf Cloudflare, und warum die Vorschau nicht die
Produktion ersetzt:

- GitHub Pages sendet **keine eigenen Header**. `public/_headers` wird dort
  ignoriert, also gelten CSP, HSTS, `X-Frame-Options` und die Cache-Regeln
  nicht. Auf Cloudflare gelten sie.
- Die Vorschau ist bewusst auf **noindex** gestellt (`robots.txt` verbietet
  alles, jede Seite trägt `robots: noindex`), damit sie brickwater.de in der
  Suche nicht verdrängt.
- Die Seite läuft dort unter `/brickwater/`. Der Build bekommt das über
  `NEXT_PUBLIC_BASE_PATH` und `NEXT_PUBLIC_SITE_URL` gesagt; ohne diese
  Variablen baut alles genau wie bisher für die Wurzel von brickwater.de.
- Der wöchentliche Neubau, der vergangene Konzerte ausblendet, hängt am
  Cloudflare-Deploy-Hook und läuft für die Vorschau nicht.

Soll die Vorschau später doch die echte Seite werden: eine Datei `public/CNAME`
mit `www.brickwater.de` anlegen, im Workflow `NEXT_PUBLIC_BASE_PATH` leeren,
`NEXT_PUBLIC_SITE_URL` auf `https://www.brickwater.de` setzen,
`NEXT_PUBLIC_NOINDEX` entfernen und die DNS-Einträge auf GitHub zeigen lassen.
Die fehlenden Security-Header bleiben dann trotzdem ein Nachteil gegenüber
Cloudflare.
