import type { Locale } from "@/i18n/routing";
import { loadSite } from "@/lib/content/load";

const CREDITS = [
  "Arne Marenda Fotografie (Live-Foto Brickwater als Band)",
  "Barham Ismail (Live-Foto Brickwater als Band)",
  "Brickwater (alle weiteren Fotos)",
  "Julia Feisleben (Illustration Season One)",
  "Jens Hold (Artwork Against Couragefalls)",
  "Elan..FKZ..GVK (Illustration Aloah from Brickwater)",
  "Folk's Worst Nightmare (Logo)",
];

export function Impressum({ locale }: { locale: Locale }) {
  const site = loadSite();
  const o = site.operator;
  if (locale === "en") {
    return (
      <div className="legal">
        <h1>Legal notice</h1>
        <p className="legal-note">
          This is a courtesy translation. The German version (Impressum) is the legally binding one.
        </p>
        <h2>Provider identification (Section 5 DDG)</h2>
        <p>
          {o.name}
          <br />
          Brickwater
          <br />
          {o.street}
          <br />
          {o.postalCode} {o.city}
          <br />
          Germany
        </p>
        <h2>Contact</h2>
        <p>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Responsible for editorial content (Section 18 (2) MStV)</h2>
        <p>
          {o.name}, {o.street}, {o.postalCode} {o.city}, Germany
        </p>
        <h2>Consumer dispute resolution</h2>
        <p>
          We are neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board (Section 36 VSBG).
        </p>
        <h2>Liability for content</h2>
        <p>
          As a service provider we are responsible for our own content on these pages under general law (Section 7 (1) DDG). Under Sections 8 to 10 DDG we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the moment we become aware of a specific infringement. As soon as we become aware of such infringements, we will remove the content in question immediately.
        </p>
        <h2>Liability for links</h2>
        <p>
          This site links to external websites of third parties (for example Bandcamp, Spotify, Apple Music, Deezer, YouTube, Instagram, ticket providers and map services). We have no influence on their content and therefore accept no liability for it. The respective provider or operator is always responsible for the content of linked pages. The linked pages were checked for possible legal violations at the time of linking; no illegal content was recognisable. Permanent monitoring of linked pages is not reasonable without concrete indications of an infringement. If we become aware of any infringements, we will remove such links immediately.
        </p>
        <h2>Copyright</h2>
        <p>
          The content, songs, lyrics, photographs and artwork on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright require the written consent of the respective author or rights holder. Downloads and copies of this site are only permitted for private, non-commercial use. Where content on this site was not created by the operator, the copyrights of third parties are respected and such content is marked accordingly.
        </p>
        <h2>Image credits</h2>
        <ul>
          {CREDITS.map((credit) => (
            <li key={credit}>{credit.replace("Live-Foto Brickwater als Band", "live photo of Brickwater as a band").replace("alle weiteren Fotos", "all other photos").replace("Illustration", "illustration").replace("Artwork", "artwork").replace("Logo", "logo")}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="legal">
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {o.name}
        <br />
        Brickwater
        <br />
        {o.street}
        <br />
        {o.postalCode} {o.city}
        <br />
        {o.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {o.name}, {o.street}, {o.postalCode} {o.city}
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
      </p>
      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter (unter anderem Bandcamp, Spotify, Apple Music, Deezer, YouTube, Instagram, Ticketanbieter und Kartendienste), auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>
      <h2>Urheberrecht</h2>
      <p>
        Die auf diesen Seiten veröffentlichten Inhalte, Songs, Songtexte, Fotos und Artworks unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Rechteinhabers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet und solche Inhalte als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
      </p>
      <h2>Bildnachweise</h2>
      <ul>
        {CREDITS.map((credit) => (
          <li key={credit}>{credit}</li>
        ))}
      </ul>
    </div>
  );
}
