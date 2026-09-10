import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

function font(file: string) {
  return readFileSync(path.join(process.cwd(), "app/fonts/og", file));
}

export function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf7f2",
          color: "#17130f",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#b5563a" }}>
          brickwater.de
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 400, marginTop: 24 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage", data: font("BricolageGrotesque-ExtraBold.ttf"), weight: 800, style: "normal" },
        { name: "Bricolage", data: font("BricolageGrotesque-SemiBold.ttf"), weight: 600, style: "normal" },
        { name: "Bricolage", data: font("BricolageGrotesque-Regular.ttf"), weight: 400, style: "normal" },
      ],
    },
  );
}
