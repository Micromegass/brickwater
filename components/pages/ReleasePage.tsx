import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { getRelease } from "@/lib/content/load";

export async function ReleasePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const release = getRelease(slug);
  if (!release) notFound();
  return (
    <main id="main" lang={locale}>
      <h1>{release.title}</h1>
      <ol>
        {release.tracks.map((track) => (
          <li key={track.n}>{track.title}</li>
        ))}
      </ol>
    </main>
  );
}
