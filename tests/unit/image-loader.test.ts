import { describe, expect, it } from "vitest";
import { resolveImage, type ImageManifest } from "@/lib/images/resolve";

const manifest: ImageManifest = {
  "brickwater-biergarten-guitar-01": {
    hash: "abc12345",
    width: 4080,
    height: 2296,
    widths: [640, 1024, 1600, 2400],
    blurDataURL: "data:image/webp;base64,AAAA",
  },
  "folks-worst-nightmare-logo": {
    hash: "def67890",
    width: 800,
    height: 786,
    widths: [640, 800],
    blurDataURL: "data:image/webp;base64,BBBB",
  },
};

describe("resolveImage", () => {
  it("snaps up to the next available width", () => {
    expect(
      resolveImage(manifest, "/images/brickwater-biergarten-guitar-01", 750),
    ).toBe("/images/brickwater-biergarten-guitar-01.abc12345-1024.webp");
  });

  it("uses the largest width when the request exceeds it", () => {
    expect(
      resolveImage(manifest, "/images/folks-worst-nightmare-logo", 1600),
    ).toBe("/images/folks-worst-nightmare-logo.def67890-800.webp");
  });

  it("accepts a bare key without the /images/ prefix", () => {
    expect(resolveImage(manifest, "folks-worst-nightmare-logo", 640)).toBe(
      "/images/folks-worst-nightmare-logo.def67890-640.webp",
    );
  });

  it("throws on an unknown key so the build fails loudly", () => {
    expect(() => resolveImage(manifest, "/images/missing", 640)).toThrow(
      /Unknown image/,
    );
  });
});
