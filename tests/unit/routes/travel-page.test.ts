import { describe, test, expect } from "vitest";
import { load } from "../../../src/routes/travel/+page";
import { allTrips, allDestinations, allTags } from "../../../src/lib/data/trips";

describe("travel page load()", () => {
  const result = load();

  test("returns all trips", () => {
    expect(result.trips).toBe(allTrips);
  });

  test("returns all destinations", () => {
    expect(result.destinations).toBe(allDestinations);
  });

  test("returns all tags", () => {
    expect(result.tags).toBe(allTags);
  });

  test("trips is a non-empty array", () => {
    expect(Array.isArray(result.trips)).toBe(true);
    expect(result.trips.length).toBeGreaterThan(0);
  });

  test("destinations is a non-empty sorted array", () => {
    expect(Array.isArray(result.destinations)).toBe(true);
    expect(result.destinations.length).toBeGreaterThan(0);
    expect(result.destinations).toEqual([...result.destinations].sort((a, b) => a.localeCompare(b)));
  });

  test("tags is a non-empty sorted array", () => {
    expect(Array.isArray(result.tags)).toBe(true);
    expect(result.tags.length).toBeGreaterThan(0);
    expect(result.tags).toEqual([...result.tags].sort((a, b) => a.localeCompare(b)));
  });
});
