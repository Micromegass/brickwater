# Instagram auf der Website: drei Wege

Du möchtest die letzten Instagram-Posts auf der Seite haben, mit einem "mehr
laden"-Knopf. Das geht, und es gibt drei Wege dorthin. Sie unterscheiden sich
weniger im Aussehen als darin, **was im Hintergrund passiert**, wenn jemand
deine Seite öffnet. Genau daran hängen Datenschutz, Cookie-Banner und Aufwand.

Am Ende steht eine Empfehlung. Du musst nur entscheiden, welcher der drei Wege
dir passt.

---

## Was vorweg wichtig ist

Deine Seite hat heute bewusst **keine Cookies, kein Tracking und kein
Cookie-Banner**. Das ist kein Zufall, sondern steht so in deiner
Datenschutzerklärung, und es ist einer der Gründe, warum die Seite rechtlich
unkompliziert ist. YouTube und Bandcamp laden erst, wenn jemand aktiv auf
"Abspielen" klickt — vorher geht nichts an Google oder Bandcamp.

Die drei Wege unterscheiden sich vor allem darin, ob dieser Zustand so bleibt.

---

## Weg A: Posts werden beim Bauen der Seite geholt

**So funktioniert es:** Immer wenn die Seite neu gebaut wird, holt sie sich im
Hintergrund deine letzten Posts von Instagram, lädt die Bilder herunter und legt
sie auf deinen eigenen Server. Für den Besucher sind das dann ganz normale
Bilder deiner Seite — er merkt nicht, dass sie von Instagram stammen, und sein
Browser spricht **nie** mit Instagram. Ein Klick auf einen Post öffnet ihn
dann natürlich bei Instagram, aber eben erst nach dem Klick.

**Was du davon hast**

- Kein Cookie-Banner, keine Änderung an der Datenschutzerklärung.
- Die Bilder laden so schnell wie der Rest der Seite.
- Funktioniert auch, wenn Instagram gerade spinnt oder jemand einen Blocker nutzt.
- Sieht genau so aus, wie du es dir vorstellst: zwei Posts, darunter "mehr laden".

**Was du dafür tun musst** (einmalig, ca. 20 Minuten)

1. Dein Instagram-Konto muss ein **professionelles Konto** sein, also "Business"
   oder "Creator". Das ist kostenlos und in der Instagram-App in zwei Minuten
   umgestellt. Eine Facebook-Seite brauchst du **nicht** — das war früher so,
   ist es aber nicht mehr.
2. Es wird ein kostenloser Meta-Entwicklerzugang angelegt und dort ein Schlüssel
   erzeugt, mit dem die Seite deine Posts lesen darf. Das macht Axel mit dir
   zusammen, du musst dich dabei nur einmal bei Instagram anmelden.
3. Der Schlüssel läuft alle 60 Tage ab. Das erneuert sich danach automatisch,
   darum musst du dich nicht kümmern.

**Der einzige Haken:** Die Posts sind nicht in derselben Sekunde auf der Seite,
in der du sie postest, sondern nach dem nächsten Bauen der Seite. Wie oft das
passiert, legen wir fest — einmal pro Tag ist problemlos möglich. Dann ist der
Instagram-Bereich höchstens einen Tag alt.

---

## Weg B: Fertiges Widget von einem Anbieter

**So funktioniert es:** Man baut ein kleines Programm eines Drittanbieters
(z. B. Elfsight, Behold, SnapWidget) in die Seite ein. Das lädt die Posts live
im Browser des Besuchers. Das ist der Weg, den die meisten Musiker-Websites
gehen, weil er schnell eingerichtet ist.

**Was du davon hast**

- Die Posts sind sofort aktuell, ohne dass die Seite neu gebaut wird.
- Für dich am wenigsten Aufwand.

**Was es kostet**

- **Ein Cookie-Banner wird nötig.** Das Widget lädt im Browser deines Besuchers
  Code von der Anbieter-Firma und von Meta und überträgt dabei Daten
  (IP-Adresse) in die USA, noch bevor der Besucher irgendwas angeklickt hat. In
  Deutschland braucht das eine Einwilligung. Konkret heißt das: jeder Besucher
  sieht beim ersten Öffnen ein Banner, und der Instagram-Bereich bleibt leer,
  solange er nicht zustimmt.
- Die Datenschutzerklärung muss umgeschrieben werden: der Satz, dass keine Daten
  an Dritte gehen, stimmt dann nicht mehr.
- Die Seite wird spürbar langsamer, weil fremder Code nachgeladen wird.
- Die meisten dieser Anbieter kosten monatlich etwas (grob 5 bis 10 Euro).
- Du hängst von einer fremden Firma ab: ändert die ihre Preise oder macht zu,
  ist der Bereich weg.

---

## Weg C: Du pflegst es selbst, wie die Konzerte

**So funktioniert es:** Genau wie du Konzerte einträgst, trägst du einen Post
ein: Bild, eine Zeile Text, Link zum Post auf Instagram.

**Was du davon hast**

- Kein Instagram-Konto-Umbau, kein Schlüssel, nichts, was ablaufen kann.
- Kein Cookie-Banner, keine Änderung am Datenschutz.
- Du entscheidest genau, was auf der Website landet. Nicht jeder Instagram-Post
  ist ein guter Website-Post.

**Was es kostet**

- Es passiert nicht von allein. Wenn du drei Monate nichts einträgst, steht dort
  drei Monate lang dasselbe — und das sieht schlechter aus als gar kein
  Instagram-Bereich.

---

## Die Empfehlung

**Weg A.** Er sieht für den Besucher genauso aus wie Weg B, kostet nichts
monatlich, macht die Seite nicht langsamer und lässt dich vor allem ohne
Cookie-Banner davonkommen. Der einmalige Aufwand für dich ist eine Umstellung
in der Instagram-App und ein Login.

Von Weg B würde ich abraten, aber nicht, weil er technisch schlecht wäre: Er
kostet dich ein Cookie-Banner auf einer Seite, die heute bewusst keines braucht.
Wenn dir das egal ist, ist er trotzdem in Ordnung — sag einfach Bescheid.

Weg C ist der sichere Rückfall, falls die Umstellung auf ein professionelles
Konto für dich nicht in Frage kommt.

---

## So wird es aussehen (bei A und B gleich)

Ein eigener Abschnitt auf der Startseite mit den letzten zwei Posts
nebeneinander. Darunter ein Knopf "mehr laden", der weitere Posts aufklappt.
Jedes Bild ist anklickbar und öffnet den Post bei Instagram in einem neuen Tab.
Bildunterschriften werden auf ein, zwei Zeilen gekürzt.

Offen ist noch, **wo** der Abschnitt hinkommt. Mein Vorschlag: ganz unten, kurz
vor dem Booking-Kontakt — dann sieht man erst die Musik und die Konzerte, dann
was zuletzt los war, und danach, wie man dich erreicht. Wenn du ihn lieber weiter
oben hättest, geht das auch.
