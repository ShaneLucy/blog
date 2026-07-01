import { describe, test, expect } from "vitest";
import { tripImageSrc, tripThumbSrc } from "../../src/lib/images";

describe("tripImageSrc", () => {
  test("builds path from tripSlug and filename", () => {
    expect(tripImageSrc("japan-2024", "photo.jpg")).toBe("/images/trips/japan-2024/photo.jpg");
  });

  test("handles different slugs and extensions", () => {
    expect(tripImageSrc("norway-2026", "sunset.webp")).toBe("/images/trips/norway-2026/sunset.webp");
  });

  test("starts with /images/trips/", () => {
    expect(tripImageSrc("any-trip", "file.jpg").startsWith("/images/trips/")).toBe(true);
  });
});

describe("tripThumbSrc", () => {
  test("builds thumbnail path nested under thumbnails/", () => {
    expect(tripThumbSrc("japan-2024", "photo.jpg")).toBe("/images/trips/japan-2024/thumbnails/photo.jpg");
  });

  test("handles different slugs and extensions", () => {
    expect(tripThumbSrc("norway-2026", "sunset.webp")).toBe("/images/trips/norway-2026/thumbnails/sunset.webp");
  });

  test("differs from tripImageSrc by thumbnails/ segment", () => {
    const img = tripImageSrc("japan-2024", "photo.jpg");
    const thumb = tripThumbSrc("japan-2024", "photo.jpg");
    expect(thumb).not.toBe(img);
    expect(thumb).toContain("thumbnails/");
    expect(img).not.toContain("thumbnails/");
  });
});
