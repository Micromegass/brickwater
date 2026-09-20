# Instagram auf der Website: die Wege im Vergleich

Du möchtest die letzten Instagram-Posts auf der Seite haben, mit einem "mehr
laden"-Knopf. Das geht. Die Wege dorthin unterscheiden sich weniger im
Aussehen als darin, **was im Hintergrund passiert**, wenn jemand deine Seite
öffnet. Genau daran hängen Datenschutz, Cookie-Banner und Aufwand.

> **Neu:** Es gibt einen Weg, der kostenlos ist, dir die Bastelei mit
> Meta/Facebook komplett erspart **und** trotzdem ohne Cookie-Banner auskommt.
> Das ist Weg A. Eine frühere Fassung dieses Textes hat dir noch einen
> Meta-Entwicklerzugang zugemutet — den brauchst du nicht.

---

## Was vorweg wichtig ist

Deine Seite hat heute bewusst **keine Cookies, kein Tracking und kein
Cookie-Banner**. Das ist kein Zufall, sondern steht so in deiner
Datenschutzerklärung, und es ist einer der Gründe, warum die Seite rechtlich
unkompliziert ist. YouTube und Bandcamp laden erst, wenn jemand aktiv auf
"Abspielen" klickt — vorher geht nichts an Google oder Bandcamp.

Die Wege unterscheiden sich vor allem darin, ob das so bleibt.

---

## Weg A: Über Behold, Posts werden beim Bauen der Seite geholt

**Empfehlung.** Behold ist ein kleiner Dienst, der genau eine Sache macht: Er
verbindet sich mit deinem Instagram-Konto und stellt deine letzten Posts als
schlichte Datenliste bereit. Deine Website holt sich diese Liste **beim Bauen**
ab, lädt die Bilder herunter und legt sie auf deinen eigenen Server.

Für den Besucher sind das dann ganz normale Bilder deiner Seite. Sein Browser
spricht **weder mit Instagram noch mit Behold**. Ein Klick auf einen Post
öffnet ihn natürlich bei Instagram — aber eben erst nach dem Klick.

**Was du dafür tun musst** (einmalig, ca. 5 Minuten)

1. Bei Behold kostenlos registrieren.
2. Auf "Instagram verbinden" klicken und dich einmal bei Instagram anmelden.
3. Fertig. Den Rest macht Axel.

Sehr wahrscheinlich muss dein Instagram-Konto dafür ein **professionelles Konto**
sein ("Business" oder "Creator"). Das ist kostenlos und in der Instagram-App in
zwei Minuten umgestellt. Eine Facebook-Seite brauchst du **nicht**. Ob es wirklich
nötig ist, sehen wir beim Verbinden sofort.

**Was es kostet: nichts.** Der Gratis-Tarif von Behold reicht für diesen Fall
genau aus:

| Gratis-Tarif | reicht das? |
|---|---|
| 1 Instagram-Konto, 1 Feed | ja, du hast eins |
| maximal 6 Posts | ja, geplant sind 2 + "mehr laden" |
| 1.200 Abrufe pro Monat | ja, siehe unten |
| Aktualisierung einmal täglich | ja, passt zum täglichen Neubau |

Zu den 1.200 Abrufen: Die zählen nur, wenn jemand die Daten bei Behold abruft.
Weil **deine Website das nur beim Bauen tut und nicht bei jedem Besucher**,
sind das etwa 30 Abrufe im Monat statt einer pro Seitenaufruf. Das Limit ist
also kein Thema. (Würde man Beholds fertigen Kasten einbauen statt der
Datenliste, zählte jeder einzelne Besucher — dann wären 1.200 schnell voll.)

**Was du davon hast**

- Kein Cookie-Banner, keine Änderung an der Datenschutzerklärung.
- Kein Meta-Entwicklerkram, kein Schlüssel, der abläuft.
- Die Bilder laden so schnell wie der Rest der Seite.
- Funktioniert auch, wenn Instagram gerade spinnt oder jemand einen Blocker nutzt.
- Kein fremdes Logo auf deiner Seite (das gilt nur für Beholds fertigen Kasten,
  nicht für die Datenliste, die wir nehmen).

**Der einzige Haken:** Die Posts sind nicht in derselben Sekunde auf der Seite,
in der du sie postest, sondern nach dem nächsten Bauen der Seite. Behold
aktualisiert im Gratis-Tarif einmal täglich, und die Seite baut sich ebenfalls
täglich neu. Der Instagram-Bereich ist damit höchstens einen Tag alt.

---

## Weg A ohne Behold: direkt über Meta

Dasselbe Ergebnis, nur ohne den Zwischendienst: Die Website spricht direkt mit
Instagram. Dafür braucht es einen kostenlosen Meta-Entwicklerzugang und einen
Schlüssel, der alle 60 Tage erneuert werden muss (automatisierbar).

Sinnvoll, wenn du grundsätzlich keinen weiteren Dienst dazwischen haben willst.
Für dich ist Weg A über Behold aber schlicht weniger Arbeit bei gleichem
Ergebnis.

---

## Weg B: Fertiges Widget im Browser des Besuchers

**So funktioniert es:** Man baut ein kleines Programm eines Anbieters
(Behold, Elfsight, SnapWidget und andere) in die Seite ein, das die Posts live
im Browser des Besuchers lädt. So machen es die meisten Musiker-Websites.

**Was du davon hast**

- Die Posts sind sofort aktuell, ohne dass die Seite neu gebaut wird.

**Was es kostet**

- Der Browser deines Besuchers spricht mit einer fremden Firma, bevor er etwas
  angeklickt hat. Je nach Anbieter werden dabei Cookies gesetzt — dann braucht
  es in Deutschland eine Einwilligung, also ein Banner, und der
  Instagram-Bereich bleibt leer, bis jemand zustimmt.
- Die Datenschutzerklärung muss angepasst werden.
- Die Seite wird langsamer, weil fremder Code nachgeladen wird.
- Im Gratis-Tarif zählt jeder Seitenaufruf gegen das Abruf-Limit, und meist
  klebt ein Anbieter-Logo am Kasten.

Weg A liefert dasselbe Bild ohne all das. Deshalb: nur, wenn dir die
Sofort-Aktualität wirklich wichtig ist.

---

## Weg C: Du pflegst es selbst, wie die Konzerte

Du trägst einen Post selbst ein: Bild, eine Zeile Text, Link zum Post.

Kein fremder Dienst, nichts, was ablaufen kann, volle Kontrolle darüber, was auf
der Website landet. Aber es passiert nicht von allein — wenn du drei Monate
nichts einträgst, steht dort drei Monate dasselbe, und das sieht schlechter aus
als gar kein Instagram-Bereich.

Der sichere Rückfall, falls die Umstellung auf ein professionelles Konto für
dich nicht in Frage kommt.

---

## Die Empfehlung

**Weg A über Behold.** Kostenlos, fünf Minuten Aufwand für dich, sieht für den
Besucher genauso aus wie ein Widget, macht die Seite nicht langsamer und lässt
dich ohne Cookie-Banner davonkommen.

---

## So wird es aussehen

Ein eigener Abschnitt auf der Startseite mit den letzten zwei Posts
nebeneinander. Darunter ein Knopf "mehr laden", der die weiteren aufklappt.
Jedes Bild ist anklickbar und öffnet den Post bei Instagram in einem neuen Tab.
Bildunterschriften werden auf ein, zwei Zeilen gekürzt.

Offen ist noch, **wo** der Abschnitt hinkommt. Mein Vorschlag: ganz unten, kurz
vor dem Booking-Kontakt — dann sieht man erst die Musik und die Konzerte, dann
was zuletzt los war, und danach, wie man dich erreicht. Wenn du ihn lieber
weiter oben hättest, geht das auch.

---

## Und die Konzerte über Bandsintown?

Das ist eine eigene Frage und steht in `KONZERTE-BANDSINTOWN.md`. Kurzfassung:
Bandsintown lohnt sich für dich, aber eher als Verteiler zu Spotify, Apple Music
und Shazam als für die Website. Ein Cookie-Banner erzwingt es nicht — deine
Seite kann also weiterhin ganz ohne auskommen.
