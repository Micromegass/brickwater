import manifest from "../lib/images/manifest.json" with { type: "json" };
import { loadImages, loadReleases, loadShows, loadSite } from "../lib/content/load";

const errors: string[] = [];
const keys = new Set(Object.keys(manifest));

try {
  const shows = loadShows();
  const releases = loadReleases();
  const images = loadImages();
  const site = loadSite();

  for (const release of releases) {
    if (!keys.has(release.cover)) errors.push(`release ${release.slug}: cover "${release.cover}" not in image manifest`);
    if (!images[release.cover]) errors.push(`release ${release.slug}: cover "${release.cover}" has no alt text in content/images.json`);
  }
  for (const key of site.gallery) {
    if (!keys.has(key)) errors.push(`gallery: "${key}" is not in the image manifest`);
    if (!images[key]) errors.push(`gallery: "${key}" has no alt text in content/images.json`);
  }
  if (new Set(site.gallery).size !== site.gallery.length) errors.push("gallery: duplicate entries");
  const heroRelease = releases.find((r) => r.slug === site.heroTrack.release);
  if (!heroRelease) {
    errors.push(`heroTrack: release "${site.heroTrack.release}" does not exist`);
  } else if (!heroRelease.tracks.some((t) => t.title.toLowerCase() === site.heroTrack.title.toLowerCase())) {
    errors.push(`heroTrack: "${site.heroTrack.title}" is not a track on ${heroRelease.slug}`);
  }
  for (const video of site.videos) {
    if (!keys.has(video.poster)) errors.push(`video ${video.id}: poster "${video.poster}" not in image manifest`);
  }
  for (const key of Object.keys(images)) {
    if (!keys.has(key)) errors.push(`images.json: "${key}" is not in the image manifest`);
  }
  for (const key of keys) {
    if (!images[key]) errors.push(`image manifest: "${key}" has no alt text in content/images.json`);
  }
  console.log(`content ok: ${shows.length} shows, ${releases.length} releases, ${Object.keys(images).length} images, ${site.gallery.length} in the gallery, hero plays "${site.heroTrack.title}"`);
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length > 0) {
  console.error("content validation failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
