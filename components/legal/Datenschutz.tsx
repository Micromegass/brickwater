import type { Locale } from "@/i18n/routing";
import { loadSite } from "@/lib/content/load";

const STAND = { de: "Stand: 10. September 2026", en: "Last updated: 10 September 2026" };

export function Datenschutz({ locale }: { locale: Locale }) {
  const site = loadSite();
  const o = site.operator;
  const address = (
    <p>
      {o.name}
      <br />
      {o.street}
      <br />
      {o.postalCode} {o.city}
      <br />
      {locale === "de" ? o.country : "Germany"}
      <br />
      E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
    </p>
  );

  if (locale === "en") {
    return (
      <div className="legal">
        <h1>Privacy policy</h1>
        <p className="legal-note">This is a courtesy translation. The German version (Datenschutzerklärung) is the legally binding one.</p>
        <p>
          This website is deliberately built to process as little personal data as possible. It sets no cookies, uses no analytics or tracking, and loads third-party content only after you click. Below we explain which data is nevertheless processed when you visit, on which legal basis, and which rights you have under the General Data Protection Regulation (GDPR).
        </p>
        <h2>1. Controller</h2>
        {address}
        <h2>2. Hosting and server logs</h2>
        <p>
          This website is hosted by Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA (Cloudflare Pages, with delivery through the Cloudflare content delivery network, including servers in the European Union). When you access the site, Cloudflare automatically processes technical data that your browser transmits: the IP address, the date and time of the request, the requested page or file, the referring page, the browser type and version, the operating system, and the amount of data transferred. This data is needed to deliver the pages, to keep the service stable and secure (for example to ward off attacks) and for aggregated, non-personal statistics. The legal basis is Article 6 (1) (f) GDPR; our legitimate interest is the reliable and secure operation of the website. We have concluded a data processing agreement with Cloudflare under Article 28 GDPR. Cloudflare is certified under the EU-US Data Privacy Framework, and transfers to the USA are additionally safeguarded by the EU standard contractual clauses. Cloudflare keeps log data only as long as necessary for the stated purposes. Details: <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Cloudflare privacy policy</a>.
        </p>
        <h2>3. No cookies, no tracking, no analytics</h2>
        <p>
          This website sets no cookies of its own and uses no web analytics, advertising or social media tracking. Nothing is stored in your browser by us. Fonts are hosted on our own server; no connection to Google Fonts or other font services is made.
        </p>
        <h2>4. Embedded videos and players (two-click solution)</h2>
        <p>
          Videos from YouTube and music players from Bandcamp are not loaded automatically. You see only a preview image or a placeholder that is served from our own server. Only when you click the play or load button does your browser connect to the respective provider and transmit the technical data described in section 2 (in particular your IP address); the provider may then set its own cookies and process your data in accordance with its own privacy policy. Each click counts as your consent for that single playback. We do not store the consent, so the next video again requires a click.
        </p>
        <ul>
          <li>
            <strong>YouTube</strong>, operated by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. We use the extended privacy mode (youtube-nocookie.com). Google may transfer data to Google LLC in the USA; Google LLC is certified under the EU-US Data Privacy Framework. Privacy policy: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a>.
          </li>
          <li>
            <strong>Bandcamp</strong>, operated by Bandcamp Inc. (a Songtradr company), USA. Data may be transferred to the USA. Privacy policy: <a href="https://bandcamp.com/privacy" rel="noopener">bandcamp.com/privacy</a>.
          </li>
        </ul>
        <p>
          The legal basis for loading the embedded content and for the access to your device it entails is your consent under Article 6 (1) (a) GDPR and Section 25 (1) TDDDG; for any transfer to the USA that is not covered by an adequacy decision, Article 49 (1) (a) GDPR. You can withdraw consent at any time with effect for the future by simply not clicking the player again.
        </p>
        <h2>5. Links to other services</h2>
        <p>
          The site links to Instagram (Meta Platforms Ireland Limited), Spotify, Apple Music, Deezer, YouTube, Bandcamp, Google Maps and, where shows are announced, to ticket providers and venues. Plain links transmit no data until you follow them. Once you do, the privacy policy of the respective provider applies.
        </p>
        <h2>6. Contact by email</h2>
        <p>
          If you write to us by email, we process the data you provide (your email address, your name if given, and the content of your message) in order to handle your enquiry. For booking enquiries the legal basis is Article 6 (1) (b) GDPR (steps prior to entering into a contract); for all other enquiries it is Article 6 (1) (f) GDPR, our legitimate interest being to answer you. We keep the correspondence for as long as it is needed to handle the matter and beyond that only where statutory retention periods (for example for business records) require it. Email is not encrypted end to end; please do not send us sensitive data by email.
        </p>
        <h2>7. Calendar files and downloads</h2>
        <p>
          The calendar files (.ics) offered for shows are static files from our server. Downloading them processes no personal data beyond the server log described in section 2.
        </p>
        <h2>8. Your rights</h2>
        <p>Under the GDPR you have the following rights with regard to your personal data:</p>
        <ul>
          <li>access (Article 15), rectification (Article 16), erasure (Article 17) and restriction of processing (Article 18);</li>
          <li>data portability (Article 20);</li>
          <li>withdrawal of consent you have given, at any time with effect for the future (Article 7 (3));</li>
          <li>lodging a complaint with a supervisory authority (Article 77). The authority responsible for us is the Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, Germany, <a href="https://www.lda.bayern.de/" rel="noopener">www.lda.bayern.de</a>. You may also contact the authority at your place of residence.</li>
        </ul>
        <div className="legal-highlight">
          <h2>Right to object (Article 21 GDPR)</h2>
          <p>
            Where we process your personal data on the basis of Article 6 (1) (f) GDPR (legitimate interests), you have the right to object at any time, on grounds relating to your particular situation. We will then no longer process the data unless we can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing serves the establishment, exercise or defence of legal claims. To object, simply email us at {site.email}.
          </p>
        </div>
        <h2>9. Data security</h2>
        <p>This site is delivered exclusively over an encrypted connection (TLS/HTTPS). No automated decision-making or profiling takes place.</p>
        <h2>10. Changes</h2>
        <p>We will update this policy whenever the site or the legal situation changes. The current version is always available on this page.</p>
        <p className="legal-note">{STAND.en}</p>
      </div>
    );
  }

  return (
    <div className="legal">
      <h1>Datenschutzerklärung</h1>
      <p>
        Diese Website ist bewusst so gebaut, dass möglichst wenige personenbezogene Daten verarbeitet werden. Sie setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und lädt Inhalte Dritter erst nach einem Klick. Im Folgenden erklären wir, welche Daten beim Besuch dennoch verarbeitet werden, auf welcher Rechtsgrundlage das geschieht und welche Rechte Sie nach der Datenschutz-Grundverordnung (DSGVO) haben.
      </p>
      <h2>1. Verantwortlicher</h2>
      {address}
      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA gehostet (Cloudflare Pages; die Auslieferung erfolgt über das Content Delivery Network von Cloudflare, auch über Server in der Europäischen Union). Beim Aufruf der Website verarbeitet Cloudflare automatisch technische Daten, die Ihr Browser übermittelt: die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite oder Datei, die zuvor besuchte Seite (Referrer), Browsertyp und -version, das Betriebssystem sowie die übertragene Datenmenge. Diese Daten sind erforderlich, um die Seiten auszuliefern, den Betrieb stabil und sicher zu halten (etwa zur Abwehr von Angriffen) und für aggregierte, nicht personenbezogene Statistiken. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im zuverlässigen und sicheren Betrieb der Website. Mit Cloudflare haben wir einen Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO geschlossen. Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert; Übermittlungen in die USA sind zusätzlich durch die EU-Standardvertragsklauseln abgesichert. Cloudflare speichert Logdaten nur so lange, wie es für die genannten Zwecke erforderlich ist. Weitere Informationen: <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Datenschutzerklärung von Cloudflare</a>.
      </p>
      <h2>3. Keine Cookies, kein Tracking, keine Analyse</h2>
      <p>
        Diese Website setzt keine eigenen Cookies und verwendet keine Webanalyse, keine Werbe- und keine Social-Media-Tracker. Wir speichern nichts in Ihrem Browser. Die Schriften werden auf unserem eigenen Server bereitgestellt; es wird keine Verbindung zu Google Fonts oder anderen Schriftdiensten aufgebaut.
      </p>
      <h2>4. Eingebettete Videos und Player (Zwei-Klick-Lösung)</h2>
      <p>
        Videos von YouTube und Musik-Player von Bandcamp werden nicht automatisch geladen. Sie sehen zunächst nur ein Vorschaubild bzw. einen Platzhalter, der von unserem eigenen Server stammt. Erst wenn Sie auf die Abspiel- bzw. Lade-Schaltfläche klicken, verbindet sich Ihr Browser mit dem jeweiligen Anbieter und übermittelt die in Abschnitt 2 beschriebenen technischen Daten (insbesondere Ihre IP-Adresse); der Anbieter kann dann eigene Cookies setzen und Ihre Daten nach seiner eigenen Datenschutzerklärung verarbeiten. Jeder Klick gilt als Ihre Einwilligung für diese eine Wiedergabe. Wir speichern die Einwilligung nicht; das nächste Video erfordert wieder einen Klick.
      </p>
      <ul>
        <li>
          <strong>YouTube</strong>, betrieben von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wir nutzen den erweiterten Datenschutzmodus (youtube-nocookie.com). Google kann Daten an Google LLC in die USA übermitteln; Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert. Datenschutzerklärung: <a href="https://policies.google.com/privacy?hl=de" rel="noopener">policies.google.com/privacy</a>.
        </li>
        <li>
          <strong>Bandcamp</strong>, betrieben von Bandcamp Inc. (ein Unternehmen der Songtradr-Gruppe), USA. Dabei kann eine Übermittlung in die USA stattfinden. Datenschutzerklärung: <a href="https://bandcamp.com/privacy" rel="noopener">bandcamp.com/privacy</a>.
        </li>
      </ul>
      <p>
        Rechtsgrundlage für das Laden der eingebetteten Inhalte und den damit verbundenen Zugriff auf Ihr Endgerät ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG; für eine etwaige Übermittlung in die USA, die nicht von einem Angemessenheitsbeschluss gedeckt ist, Art. 49 Abs. 1 lit. a DSGVO. Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie den Player schlicht nicht erneut anklicken.
      </p>
      <h2>5. Links zu anderen Diensten</h2>
      <p>
        Die Website verlinkt auf Instagram (Meta Platforms Ireland Limited), Spotify, Apple Music, Deezer, YouTube, Bandcamp, Google Maps sowie, sofern Konzerte angekündigt sind, auf Ticketanbieter und Veranstaltungsorte. Einfache Links übertragen keine Daten, solange Sie ihnen nicht folgen. Danach gilt die Datenschutzerklärung des jeweiligen Anbieters.
      </p>
      <h2>6. Kontaktaufnahme per E-Mail</h2>
      <p>
        Wenn Sie uns per E-Mail schreiben, verarbeiten wir die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihren Namen und den Inhalt Ihrer Nachricht), um Ihre Anfrage zu bearbeiten. Bei Booking-Anfragen ist die Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen), bei allen anderen Anfragen Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die Beantwortung Ihrer Nachricht. Wir bewahren die Korrespondenz so lange auf, wie es zur Bearbeitung erforderlich ist, und darüber hinaus nur, soweit gesetzliche Aufbewahrungspflichten (etwa für Geschäftsunterlagen) dies verlangen. E-Mails sind nicht Ende-zu-Ende verschlüsselt; bitte senden Sie uns keine sensiblen Daten per E-Mail.
      </p>
      <h2>7. Kalenderdateien und Downloads</h2>
      <p>
        Die zu Konzerten angebotenen Kalenderdateien (.ics) sind statische Dateien auf unserem Server. Beim Herunterladen werden über das in Abschnitt 2 beschriebene Server-Log hinaus keine personenbezogenen Daten verarbeitet.
      </p>
      <h2>8. Ihre Rechte</h2>
      <p>Nach der DSGVO stehen Ihnen hinsichtlich Ihrer personenbezogenen Daten folgende Rechte zu:</p>
      <ul>
        <li>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18);</li>
        <li>Datenübertragbarkeit (Art. 20);</li>
        <li>Widerruf einer erteilten Einwilligung, jederzeit mit Wirkung für die Zukunft (Art. 7 Abs. 3);</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77). Die für uns zuständige Aufsichtsbehörde ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, <a href="https://www.lda.bayern.de/" rel="noopener">www.lda.bayern.de</a>. Sie können sich auch an die Aufsichtsbehörde Ihres Wohnorts wenden.</li>
      </ul>
      <div className="legal-highlight">
        <h2>Widerspruchsrecht (Art. 21 DSGVO)</h2>
        <p>
          Soweit wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen) verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch einzulegen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Für den Widerspruch genügt eine E-Mail an {site.email}.
        </p>
      </div>
      <h2>9. Datensicherheit</h2>
      <p>Diese Website wird ausschließlich über eine verschlüsselte Verbindung (TLS/HTTPS) ausgeliefert. Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.</p>
      <h2>10. Änderungen</h2>
      <p>Wir passen diese Datenschutzerklärung an, sobald sich die Website oder die Rechtslage ändert. Die jeweils aktuelle Fassung finden Sie auf dieser Seite.</p>
      <p className="legal-note">{STAND.de}</p>
    </div>
  );
}
