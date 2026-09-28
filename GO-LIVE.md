# Betrieb: brickwater.de auf goneo

Die Seite liegt bei goneo (Webspace `w11.goneo.de`, Document-Root `/htdocs`),
wo auch die Domain liegt. Apache liefert aus, HTTPS mit Let's Encrypt ist
eingerichtet, gzip ist an. Cloudflare Pages und die Vorschau auf GitHub Pages
sind seit dem 28. September 2026 abgeschaltet und aus dem Repository entfernt.

## 1. Wie die Seite auf den Server kommt

`.github/workflows/deploy-goneo.yml` baut die Seite und lädt sie per SFTP hoch:

- **jede Nacht** um 01:23 UTC (03:23 Uhr Sommerzeit, 02:23 Uhr Winterzeit),
  auch wenn nichts geändert wurde. Eine statische Seite entscheidet beim Bauen,
  welche Konzerte noch bevorstehen; ohne nächtlichen Neubau bliebe ein
  gespieltes Konzert unter "Demnächst" stehen.
- **auf Knopfdruck**: Actions → "Deploy to goneo" → Run workflow. Damit ist eine
  Änderung sofort online, statt erst in der nächsten Nacht.

GitHub startet geplante Läufe bei hoher Last verspätet, manchmal um Stunden.
Deshalb ist der Upload so geordnet, dass ein Besucher ihn nie bemerkt: erst
kommen neue Skripte und Bilder neben die alten, dann die Seiten, und erst zum
Schluss wird gelöscht, worauf keine Seite mehr verweist.

Schlägt der Build fehl (etwa wegen eines Tippfehlers in `content/`), wird nichts
hochgeladen und die bisherige Seite bleibt online. GitHub schickt dann eine
E-Mail an den Account, der den Zeitplan zuletzt geändert hat.

## 2. Einmalig einrichten

Unter Settings → Secrets and variables → Actions → **Secrets**:

- `GONEO_USER`: der SFTP-Benutzer
- `GONEO_PASSWORD`: das SFTP-Passwort

Beides steht im goneo-Kundencenter unter *Webserver* → **FTP-Zugriff** bzw.
**FTP- & SSH-Zugriff**; dort lassen sich Benutzer auch neu anlegen und
Passwörter setzen. Lokal liegen dieselben Werte in `.env.goneo.local`
(gitignored).

Server, Port (2222, goneo spricht SFTP nicht auf 22) und Zielordner sind nicht
geheim und stehen direkt im Workflow. Weitere Variablen braucht es nicht.

Danach einmal von Hand auslösen (Run workflow) und prüfen, dass der Lauf grün
wird. Beim ersten Lauf verschwinden vom Server die Reste der alten Seite
(`css/`, `js/`), die Testkopie `neu/` und die Cloudflare-Dateien `_headers`,
`_redirects` und `.nojekyll`.

## 3. Was der Workflow absichert

- Anmeldedaten und `npm` laufen in **getrennten Jobs**. Der Job, der baut, hat
  keine Zugangsdaten; der Job, der hochlädt, führt nichts aus `node_modules` aus.
- Der **SSH-Hostschlüssel von goneo ist fest hinterlegt**
  (`SHA256:G3pffhoFJHdoHklKqgM8jTYFfQhJXzuJOfLGzxwjffY`). Meldet sich ein
  Server mit einem anderen Schlüssel, bricht die Verbindung ab, bevor das
  Passwort gesendet wird. Wechselt goneo den Schlüssel einmal, schlägt der Lauf
  mit "Host key verification failed" fehl: neuen Fingerprint bei goneo
  bestätigen lassen, dann die Zeile `GONEO_KNOWN_HOST` im Workflow ersetzen.
- Vor dem Hochladen wird geprüft, dass `index.html` und `.htaccess` da sind, und
  der Zielordner wird aufgelistet. Sieht er nach einem Account-Root aus (Ordner
  wie `mail`, `logfiles`), bricht der Lauf ab, statt dort zu spiegeln.
- Das Passwort wird über eine Umgebungsvariable übergeben und steht nie in einer
  Kommandozeile.
- GitHub schaltet geplante Workflows ab, wenn ein Repository 60 Tage lang keinen
  Commit gesehen hat. Der Job `keepalive` schaltet den Workflow nach jedem Lauf
  wieder ein, damit der nächtliche Neubau nicht still stehen bleibt.

## 4. Security-Header

Apache liest `public/.htaccess` mit: CSP, HSTS, X-Frame-Options,
Referrer-Policy, Permissions-Policy, Cache-Regeln, die Weiterleitung von
`brickwater.de` auf `www.brickwater.de` und die eigene 404-Seite. Jeder Block
steht in `<IfModule>`, damit ein fehlendes Apache-Modul keinen 500er auslöst.

## 5. Zurückrollen

Der Upload spiegelt und **löscht dabei serverseitig, was im Build nicht mehr
existiert**. Der Weg zurück ist goneos eigenes Backup (im Leistungsumfang
enthalten), oder ein älterer Commit, der über Run workflow neu gebaut wird.
Bewusst **keine** Kopie als GitHub-Artefakt: Dieses Repository ist öffentlich,
und Artefakte öffentlicher Repositories kann jeder herunterladen.

## 6. Datenschutz

Abschnitt 2 der Datenschutzerklärung nennt goneo als Hoster und verweist auf
einen Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Den stellt goneo
im Kundencenter bereit; er muss vom Vertragsinhaber des goneo-Pakets
abgeschlossen sein, sonst stimmt dieser Satz nicht.

## 7. Nach größeren Änderungen prüfen

- `https://www.brickwater.de/` lädt, Sprachwechsel funktioniert, `/konzerte/` und
  `/en/shows/` antworten mit 200.
- `https://www.brickwater.de/sitemap.xml` und `/robots.txt` erreichbar; Sitemap in
  der Google Search Console und bei Bing einreichen.
- Rich-Results-Test (search.google.com/test/rich-results) für `/` und
  `/musik/season-one/`.
- Security-Header prüfen (securityheaders.com): CSP, HSTS, X-Frame-Options
  sollten grün sein.
