import { describe, test, expect } from "vitest";
import { SITE_NAME, SITE_URL } from "../../src/lib/config";

describe("config", () => {
  test("SITE_NAME is a non-empty string", () => {
    expect(typeof SITE_NAME).toBe("string");
    expect(SITE_NAME.length).toBeGreaterThan(0);
  });

  test("SITE_URL is a valid absolute URL", () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
    const url = new URL(SITE_URL);
    expect(url.protocol).toMatch(/^https?:$/);
    expect(url.hostname.length).toBeGreaterThan(0);
  });

  test("SITE_URL has no trailing slash", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
