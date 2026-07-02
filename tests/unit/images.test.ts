import { describe, test, expect } from "vitest";
import { tripImageSrc, tripSrcset, tripOgSrc, RENDITION_WIDTHS, THUMB_WIDTH, MAX_WIDTH } from "../../src/lib/images";

describe("tripImageSrc", () => {
  test("defaults to the 2400px rendition", () => {
    expect(tripImageSrc("japan-2024", "photo.jpg")).toBe("/images/trips/japan-2024/photo-2400.webp");
  });

  test("generates the requested rendition width", () => {
    expect(tripImageSrc("japan-2024", "photo.jpg", THUMB_WIDTH)).toBe("/images/trips/japan-2024/photo-400.webp");
  });

  test("strips the original extension and appends .webp", () => {
    expect(tripImageSrc("norway-2026", "sunset.png", MAX_WIDTH)).toBe("/images/trips/norway-2026/sunset-2400.webp");
  });

  test("starts with /images/trips/", () => {
    expect(tripImageSrc("any-trip", "file.jpg").startsWith("/images/trips/")).toBe(true);
  });
});

describe("tripSrcset", () => {
  test("returns four renditions in ascending width order", () => {
    const srcset = tripSrcset("japan-2024", "photo.jpg");
    const parts = srcset.split(", ");
    expect(parts).toHaveLength(RENDITION_WIDTHS.length);
    expect(parts[0]).toContain("400w");
    expect(parts[1]).toContain("800w");
    expect(parts[2]).toContain("1600w");
    expect(parts[3]).toContain("2400w");
  });

  test("each entry points to a .webp file", () => {
    const srcset = tripSrcset("norway-2026", "glacier.heic");
    srcset.split(", ").forEach((entry) => {
      const [url] = entry.split(" ");
      expect(url.endsWith(".webp")).toBe(true);
    });
  });

  test("all entries are under the correct trip path", () => {
    const srcset = tripSrcset("japan-2024", "photo.jpg");
    srcset.split(", ").forEach((entry) => {
      expect(entry).toContain("/images/trips/japan-2024/");
    });
  });
});

describe("tripOgSrc", () => {
  test("generates a path ending in -og.webp", () => {
    expect(tripOgSrc("japan-2024", "photo.jpg")).toBe("/images/trips/japan-2024/photo-og.webp");
  });

  test("strips the original extension", () => {
    expect(tripOgSrc("norway-2026", "sunset.png")).toBe("/images/trips/norway-2026/sunset-og.webp");
  });

  test("is under the correct trip path", () => {
    expect(tripOgSrc("any-trip", "file.jpg").startsWith("/images/trips/any-trip/")).toBe(true);
  });
});
