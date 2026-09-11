import type { MetadataRoute } from "next";
import { withBase } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brickwater",
    short_name: "Brickwater",
    description: "Indie, Folk und Punk aus Nürnberg",
    start_url: withBase("/"),
    display: "browser",
    background_color: "#fbfaf8",
    theme_color: "#fbfaf8",
    lang: "de",
    icons: [
      { src: withBase("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBase("/apple-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  };
}
