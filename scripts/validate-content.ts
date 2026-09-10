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
  for (const video of site.videos) {
    if (!keys.has(video.poster)) errors.push(`video ${video.id}: poster "${video.poster}" not in image manifest`);
  }
  for (const key of Object.keys(images)) {
    if (!keys.has(key)) errors.push(`images.json: "${key}" is not in the image manifest`);
  }
  for (const key of keys) {
    if (!images[key]) errors.push(`image manifest: "${key}" has no alt text in content/images.json`);
  }
  console.log(`content ok: ${shows.length} shows, ${releases.length} releases, ${Object.keys(images).length} images`);
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length > 0) {
  console.error("content validation failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
