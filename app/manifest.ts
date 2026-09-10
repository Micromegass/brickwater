import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brickwater",
    short_name: "Brickwater",
    description: "Indie, Folk und Punk aus Nürnberg",
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf8",
    theme_color: "#fbfaf8",
    lang: "de",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
