import { describe, test, expect } from "vitest";
import { entries, load } from "../../../src/routes/travel/[slug]/+page";
import { allTrips } from "../../../src/lib/data/trips";

describe("trip detail entries()", () => {
  const result = entries() as Array<{ slug: string }>;

  test("returns one entry per trip", () => {
    expect(result.length).toBe(allTrips.length);
  });

  test("each entry has a slug matching a trip", () => {
    const tripSlugs = new Set(allTrips.map((t) => t.slug));
    for (const entry of result) {
      expect(tripSlugs.has(entry.slug)).toBe(true);
    }
  });

  test("slugs match allTrips order", () => {
    const entrySlugs = result.map((e) => e.slug);
    const tripSlugs = allTrips.map((t) => t.slug);
    expect(entrySlugs).toEqual(tripSlugs);
  });
});

describe("trip detail load()", () => {
  const firstTrip = allTrips[0];

  test("returns the matching trip for a valid slug", () => {
    const result = load({ params: { slug: firstTrip.slug } } as never);
    expect(result.trip).toBe(firstTrip);
  });

  test("throws 404 for an unknown slug", () => {
    expect(() => load({ params: { slug: "does-not-exist" } } as never)).toThrow();
  });

  test("thrown error has status 404", () => {
    let thrown: unknown;
    try {
      load({ params: { slug: "does-not-exist" } } as never);
    } catch (e) {
      thrown = e;
    }
    expect((thrown as { status: number }).status).toBe(404);
  });
});
