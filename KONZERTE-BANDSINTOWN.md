# Konzerte über Bandsintown verwalten?

Kurz vorweg, damit die Frage nicht falsch ankommt: **Bandsintown zu nutzen ist
eine gute Idee.** Die Frage ist nur, ob die Termine von dort *automatisch* auf
deine Website wandern können. Das ist der Punkt, an dem es klemmt, und zwar aus
einem Grund, der nichts mit deiner Seite zu tun hat.

---

## Wofür Bandsintown wirklich gut ist

Bandsintown ist in erster Linie ein **Verteiler**. Du trägst einen Termin
einmal ein, und er taucht auf bei Spotify, Apple Music, Shazam, in der
Google-Suche und in der Bandsintown-App, in der Fans Künstlern folgen und
Benachrichtigungen bekommen.

Dieser Nutzen hat mit deiner Website überhaupt nichts zu tun. Den bekommst du,
egal wie wir es auf der Seite lösen. **Dafür lohnt sich Bandsintown auf jeden
Fall.**

---

## Warum die automatische Übernahme nicht einfach geht

Damit deine Website die Termine selbst abholen kann, bräuchte sie eine
technische Schnittstelle bei Bandsintown. Die gab es früher offen für jeden.
Ich habe sie heute getestet: sie ist inzwischen **gesperrt** und nur noch für
Partner freigeschaltet, die sich vorher bei Bandsintown registriert und eine
Freigabe bekommen haben.

Bleibt als offizieller Weg das **Widget**: ein fertiger Kasten, den man in die
Seite einbaut und der die Termine im Browser des Besuchers nachlädt.

---

## Was das Widget auf deiner Seite anrichten würde

Ich habe das Widget testweise geladen und mitgeschrieben, was dabei passiert.
Das Ergebnis ist zwiespältig.

**Besser als erwartet:** Es setzt **keine Cookies**. Ein Cookie-Banner wäre
also nicht automatisch zwingend.

**Trotzdem ein Problem:** Das Widget lädt **Google Tag Manager** mit. Damit geht
die IP-Adresse jedes Besuchers an Google in die USA, bevor er irgendetwas
angeklickt hat. In deiner Datenschutzerklärung steht heute, dass genau das
nicht passiert — YouTube und Bandcamp laden erst auf Klick. Dieser Satz wäre
dann falsch. Und Google Tag Manager ist seinem Wesen nach ein Werkzeug, das
weitere Dienste nachlädt; was es heute nicht tut, kann es nach einem Update von
Bandsintown tun.

**Und es kostet dich Funktionen.** Alles, was die Konzertliste heute kann,
steckt darin, dass die Termine fest in der Seite stehen:

- Google zeigt deine Konzerte direkt in den Suchergebnissen an (mit Datum, Ort
  und Ticketlink). Ein nachgeladenes Widget sieht Google dort nicht.
- Jedes Konzert hat einen "zum Kalender hinzufügen"-Knopf.
- Jedes Konzert hat einen Anfahrtslink.
- Zusatztexte ("mit Folk's Worst Nightmare") stehen auf Deutsch und Englisch da.
- Es sieht aus wie deine Seite und nicht wie ein fremder Kasten.

---

## Die drei realistischen Möglichkeiten

### 1. Bandsintown nutzen, Termine auf der Seite weiter selbst pflegen (Empfehlung)

Du trägst einen Termin bei Bandsintown ein und einmal in der Textdatei deiner
Seite. Klingt nach doppelter Arbeit, ist aber bei einer Handvoll Terminen im
Jahr jeweils eine Minute.

Dafür behältst du: die Google-Anzeige deiner Konzerte, den Kalender-Knopf, die
Anfahrt, das Aussehen, kein Google auf deiner Seite, kein Cookie-Banner.

### 2. Widget einbauen

Einmal einrichten, nie wieder anfassen. Dafür Google auf der Seite,
Datenschutzerklärung muss angepasst werden, und die oben genannten Funktionen
fallen weg.

Es gäbe noch die Variante, das Widget **hinter einen Klick** zu legen, so wie
YouTube und Bandcamp heute. Dann ist es datenschutzrechtlich sauber. Nur ist
das bei Konzertterminen unsinnig: Leute sollen die Termine sehen, nicht erst
einen Knopf dafür drücken.

### 3. Bei Bandsintown Zugang zur Schnittstelle beantragen

Wenn Bandsintown ihn freigibt, holt sich die Seite die Termine beim Bauen
selbst — keine doppelte Eingabe, kein Google, kein Banner, alle Funktionen
bleiben. Das ist die schönste Lösung.

Der Haken: Man muss sie fragen, und es ist offen, ob und wann sie antworten.
Das kann man nebenher versuchen, während Möglichkeit 1 läuft.

---

## Empfehlung

**Möglichkeit 1, und parallel Möglichkeit 3 anfragen.**

Nutze Bandsintown für das, wofür es gemacht ist: damit deine Termine bei
Spotify, Apple Music, Shazam und in der App auftauchen. Die Liste auf deiner
eigenen Seite bleibt vorerst deine eigene — sie ist das, was Google anzeigt,
und sie kann mehr als das Widget.

Wenn wir den Schnittstellenzugang bekommen, stellen wir auf automatisch um und
du trägst nur noch bei Bandsintown ein.

---

## Was das für die Instagram-Entscheidung bedeutet

Du hattest gefragt, ob ein Cookie-Banner wegen Bandsintown die
Instagram-Entscheidung ändert. **Tut es nicht** — aus zwei Gründen:

1. Das Bandsintown-Widget setzt keine Cookies, erzwingt also auch kein Banner.
   Sein Problem ist Google, nicht das Banner.
2. Für Instagram gibt es inzwischen einen Weg, der **kostenlos** ist und
   trotzdem ohne Banner auskommt. Siehe `INSTAGRAM-OPTIONEN.md` — die Empfehlung
   dort ist durch einen neuen Fund sogar noch einfacher geworden, als sie war.

Du musst also nicht "einmal Banner, dann ist eh alles egal" denken. Die Seite
kann weiterhin ganz ohne auskommen.
