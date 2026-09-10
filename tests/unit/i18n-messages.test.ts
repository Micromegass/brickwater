import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type Tree = { [key: string]: string | Tree };

function flatten(tree: Tree, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out[path] = value;
    else Object.assign(out, flatten(value, path));
  }
  return out;
}

function icuArgs(message: string): string[] {
  return [...message.matchAll(/\{(\w+)\s*[,}]/g)].map((m) => m[1]).sort();
}

const de = flatten(JSON.parse(readFileSync("messages/de.json", "utf8")));
const en = flatten(JSON.parse(readFileSync("messages/en.json", "utf8")));

describe("UI messages", () => {
  it("have the same keys in German and English", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(de).sort());
  });

  it("use the same ICU arguments per key", () => {
    for (const key of Object.keys(de)) {
      expect(icuArgs(en[key] ?? ""), key).toEqual(icuArgs(de[key]));
    }
  });

  it("contain no empty strings", () => {
    for (const [key, value] of [...Object.entries(de), ...Object.entries(en)]) {
      expect(value.trim(), key).not.toBe("");
    }
  });

  it("contain no em dashes in user-facing copy", () => {
    for (const [key, value] of [...Object.entries(de), ...Object.entries(en)]) {
      expect(value, key).not.toContain("—");
    }
  });
});
