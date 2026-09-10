// Rasterizes the wordmark with the display font and samples it into a running-bond brick grid.
import { GlobalFonts, createCanvas } from "@napi-rs/canvas";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { WordmarkLayout } from "../lib/hero/types";

const FONT = path.join(process.cwd(), "app/fonts/og/BricolageGrotesque-ExtraBold.ttf");
GlobalFonts.registerFromPath(FONT, "BricolageXB");

interface Spec {
  name: string;
  lines: string[];
  rowsPerLine: number;
  maxBricks: number;
}

const SPECS: Spec[] = [
  { name: "desktop", lines: ["BRICKWATER"], rowsPerLine: 18, maxBricks: 1500 },
  { name: "mobile", lines: ["BRICK", "WATER"], rowsPerLine: 11, maxBricks: 600 },
];

const FONT_PX = 400;
const THRESHOLD = 0.42;
const SAMPLES = 5;

function rasterize(lines: string[], gapRows: number, rowsPerLine: number) {
  const probe = createCanvas(10, 10).getContext("2d");
  probe.font = `800 ${FONT_PX}px BricolageXB`;
  const metrics = lines.map((line) => probe.measureText(line));
  const capHeight = Math.max(...metrics.map((m) => m.actualBoundingBoxAscent));
  const lineWidths = metrics.map((m) => m.actualBoundingBoxRight + m.actualBoundingBoxLeft);
  const width = Math.ceil(Math.max(...lineWidths));
  const cellH = capHeight / rowsPerLine;
  const gap = gapRows * cellH;
  const height = Math.ceil(lines.length * capHeight + (lines.length - 1) * gap);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.font = `800 ${FONT_PX}px BricolageXB`;
  ctx.fillStyle = "#000";
  ctx.textBaseline = "alphabetic";
  lines.forEach((line, i) => {
    const m = metrics[i];
    const x = (width - lineWidths[i]) / 2 + m.actualBoundingBoxLeft;
    const baseline = i * (capHeight + gap) + capHeight;
    ctx.fillText(line, x, baseline);
  });
  const { data } = ctx.getImageData(0, 0, width, height);
  const alphaAt = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return 0;
    return data[(y * width + x) * 4 + 3];
  };
  return { width, height, cellH, alphaAt };
}

function sample(spec: Spec, rowsPerLine: number): WordmarkLayout {
  const gapRows = spec.lines.length > 1 ? 1 : 0;
  const { width, height, cellH, alphaAt } = rasterize(spec.lines, gapRows, rowsPerLine);
  const cellW = cellH * 2;
  const rows = Math.round(height / cellH);
  const cols = Math.ceil(width / cellW);
  const bricks: [number, number][] = [];
  for (let r = 0; r < rows; r += 1) {
    const offset = r % 2 === 1 ? 0.5 : 0;
    for (let c = -1; c <= cols; c += 1) {
      const x0 = (c + offset) * cellW;
      const y0 = r * cellH;
      let hit = 0;
      for (let sy = 0; sy < SAMPLES; sy += 1) {
        for (let sx = 0; sx < SAMPLES; sx += 1) {
          const px = Math.round(x0 + ((sx + 0.5) / SAMPLES) * cellW);
          const py = Math.round(y0 + ((sy + 0.5) / SAMPLES) * cellH);
          if (alphaAt(px, py) > 127) hit += 1;
        }
      }
      if (hit / (SAMPLES * SAMPLES) >= THRESHOLD) bricks.push([c + offset, r]);
    }
  }
  return { cols, rows, bricks };
}

mkdirSync(path.join(process.cwd(), "lib/hero"), { recursive: true });
for (const spec of SPECS) {
  let rowsPerLine = spec.rowsPerLine;
  let layout = sample(spec, rowsPerLine);
  while (layout.bricks.length > spec.maxBricks && rowsPerLine > 6) {
    rowsPerLine -= 1;
    layout = sample(spec, rowsPerLine);
  }
  const file = path.join(process.cwd(), `lib/hero/wordmark-${spec.name}.json`);
  writeFileSync(file, JSON.stringify(layout) + "\n");
  console.log(`${spec.name}: ${layout.bricks.length} bricks, ${layout.cols}x${layout.rows} cells (${rowsPerLine} rows/line)`);
}
