import type { Locale } from "@/i18n/routing";
import { loadSite } from "@/lib/content/load";
import type { Release, Show, Video } from "@/lib/content/schema";
import { toBerlinIsoString } from "@/lib/dates";
import { absoluteUrl, localizedPath, SITE_URL } from "@/lib/i18n/paths";
import { photoUrl } from "@/lib/images/photo";

export const ARTIST_ID = `${SITE_URL}/#artist`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const DESCRIPTIONS: Record<Locale, string> = {
  de: "Indie, Folk und Punk aus Nürnberg. Solo oder mit dem Folk's Worst Nightmare Kollektiv.",
  en: "Indie, folk and punk from Nuremberg. Solo or with the Folk's Worst Nightmare collective.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = Record<string, any>;

export function musicGroup(locale: Locale): Node {
  const site = loadSite();
  return {
    "@type": "MusicGroup",
    "@id": ARTIST_ID,
    name: site.name,
    url: absoluteUrl(localizedPath(locale, "/")),
    description: DESCRIPTIONS[locale],
    genre: site.genres,
    foundingDate: String(site.foundingYear),
    foundingLocation: { "@type": "Place", name: site.city, address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.country } },
    member: { "@type": "Person", name: site.frontperson, roleName: locale === "de" ? "Gesang, Gitarre, Mundharmonika" : "Vocals, guitar, harmonica" },
    memberOf: { "@type": "MusicGroup", name: site.fwn.name, url: site.fwn.bandcamp },
    image: absoluteUrl(photoUrl("brickwater-bricky-waters-stage-portrait-01")),
    email: site.email,
    sameAs: site.sameAs,
  };
}

export function webSite(locale: Locale): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Brickwater",
    url: absoluteUrl(localizedPath(locale, "/")),
    inLanguage: locale,
    publisher: { "@id": ARTIST_ID },
  };
}

const EVENT_STATUS: Record<Show["status"], string> = {
  scheduled: "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
  postponed: "https://schema.org/EventPostponed",
  soldout: "https://schema.org/EventScheduled",
};

export function musicEvent(show: Show, locale: Locale): Node {
  const note = typeof show.note === "string" ? show.note : show.note?.[locale];
  const event: Node = {
    "@type": "MusicEvent",
    "@id": `${SITE_URL}${localizedPath(locale, "/shows")}#${show.id}`,
    name: `Brickwater live: ${show.venue}, ${show.city}`,
    ...(note ? { description: note } : {}),
    startDate: show.time ? toBerlinIsoString(show.date, show.time) : show.date,
    eventStatus: EVENT_STATUS[show.status],
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.venue,
      address: {
        "@type": "PostalAddress",
        ...(show.address ? { streetAddress: show.address } : {}),
        addressLocality: show.city,
        addressCountry: show.country,
      },
    },
    performer: { "@id": ARTIST_ID },
    organizer: { "@id": ARTIST_ID },
    url: absoluteUrl(localizedPath(locale, "/shows")),
    inLanguage: locale,
  };
  if (show.ticketUrl && show.status !== "cancelled") {
    event.offers = {
      "@type": "Offer",
      url: show.ticketUrl,
      availability: show.status === "soldout" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    };
  }
  return event;
}

function isoDuration(mmss: string): string {
  const [m, s] = mmss.split(":").map(Number);
  return `PT${m}M${s}S`;
}

export function musicAlbum(release: Release, locale: Locale): Node {
  const url = absoluteUrl(localizedPath(locale, "/music/[slug]", { slug: release.slug }));
  return {
    "@type": "MusicAlbum",
    "@id": `${url}#album`,
    name: release.title,
    ...(release.altTitle ? { alternateName: release.altTitle } : {}),
    url,
    image: absoluteUrl(photoUrl(release.cover, 1024)),
    datePublished: release.date,
    albumProductionType: "https://schema.org/StudioAlbum",
    albumReleaseType:
      release.type === "album" ? "https://schema.org/AlbumRelease" : release.type === "ep" ? "https://schema.org/EPRelease" : "https://schema.org/SingleRelease",
    byArtist: { "@id": ARTIST_ID },
    ...(release.label ? { recordLabel: { "@type": "Organization", name: release.label } } : {}),
    ...(release.description ? { description: release.description[locale] } : {}),
    numTracks: release.tracks.length,
    inLanguage: "en",
    sameAs: Object.values(release.links),
    track: release.tracks.map((track) => ({
      "@type": "MusicRecording",
      name: track.title,
      position: track.n,
      byArtist: { "@id": ARTIST_ID },
      inAlbum: { "@id": `${url}#album` },
      ...(track.duration ? { duration: isoDuration(track.duration) } : {}),
      ...(track.lyrics
        ? { recordingOf: { "@type": "MusicComposition", name: track.title, lyrics: { "@type": "CreativeWork", text: track.lyrics, inLanguage: "en" } } }
        : {}),
    })),
  };
}

export function videoObject(video: Video, locale: Locale): Node {
  return {
    "@type": "VideoObject",
    name: `Brickwater - ${video.title}`,
    description: locale === "de" ? `Video von Brickwater: ${video.title} (${video.year})` : `Video by Brickwater: ${video.title} (${video.year})`,
    thumbnailUrl: absoluteUrl(photoUrl(video.poster, 1024)),
    uploadDate: `${video.year}-01-01`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    inLanguage: "en",
    publisher: { "@id": ARTIST_ID },
  };
}

export function breadcrumbs(items: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}
