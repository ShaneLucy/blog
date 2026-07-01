import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import { load } from "../../../src/routes/travel/+page";
import { allTrips, allDestinations, allTags } from "../../../src/lib/data/trips";
import { parseDMY } from "../../../src/lib/utils/dates";
import { type Trip, TripTag } from "../../../src/lib/types/trip";
import TravelPage from "../../../src/routes/travel/+page.svelte";

const mockGoto = vi.hoisted(() => vi.fn());
vi.mock("$app/navigation", () => ({ goto: mockGoto }));
vi.mock("$app/state", () => ({
  page: { url: new URL("http://localhost/travel") }
}));
vi.mock("$app/environment", () => ({ browser: false }));

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

// Mirror of filteredTrips logic from routes/travel/+page.svelte
function filterAndSort(trips: Trip[], selectedDestination: string, selectedTags: TripTag[], sortBy: "date" | "destination"): Trip[] {
  return trips
    .filter((t) => !selectedDestination || t.destination === selectedDestination)
    .filter((t) => selectedTags.length === 0 || selectedTags.every((tag) => t.tags.has(tag)))
    .sort((a, b) =>
      sortBy === "date" ? parseDMY(b.dates.start).getTime() - parseDMY(a.dates.start).getTime() : a.destination.localeCompare(b.destination)
    );
}

const twoTrips: Trip[] = [
  {
    slug: "japan-2024",
    title: "Japan Spring",
    destination: "Japan",
    dates: { start: "01-03-2024", end: "15-03-2024" },
    tags: new Set([TripTag.Food, TripTag.Temples]),
    coverPhoto: { filename: "cover.jpg", alt: "Cover", width: 1600, height: 1067 },
    description: "Cherry blossoms",
    photos: []
  },
  {
    slug: "norway-2026",
    title: "Norway in Spring",
    destination: "Norway",
    dates: { start: "26-05-2026", end: "31-05-2026" },
    tags: new Set([TripTag.Hiking, TripTag.Fjords]),
    coverPhoto: { filename: "cover.jpg", alt: "Cover", width: 1600, height: 1067 },
    description: "Fjords",
    photos: []
  }
];

describe("travel page filteredTrips logic", () => {
  test("no filters returns all trips", () => {
    expect(filterAndSort(twoTrips, "", [], "date")).toHaveLength(2);
  });

  test("destination filter returns only matching trips", () => {
    const result = filterAndSort(twoTrips, "Japan", [], "date");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("japan-2024");
  });

  test("destination filter with no match returns empty array", () => {
    expect(filterAndSort(twoTrips, "Germany", [], "date")).toHaveLength(0);
  });

  test("single tag filter returns trips that include that tag", () => {
    const result = filterAndSort(twoTrips, "", [TripTag.Food], "date");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("japan-2024");
  });

  test("multiple tag filter uses AND logic — trip must have all selected tags", () => {
    // Neither trip has both Food and Hiking
    expect(filterAndSort(twoTrips, "", [TripTag.Food, TripTag.Hiking], "date")).toHaveLength(0);
  });

  test("date sort puts the most recent trip first", () => {
    const result = filterAndSort(twoTrips, "", [], "date");
    expect(result[0].slug).toBe("norway-2026");
  });

  test("destination sort orders trips alphabetically", () => {
    const result = filterAndSort(twoTrips, "", [], "destination");
    expect(result[0].destination).toBe("Japan");
    expect(result[1].destination).toBe("Norway");
  });
});

describe("travel page rendering", () => {
  const pageData = { trips: allTrips, destinations: allDestinations, tags: allTags };

  test("renders the Travel heading", () => {
    const { getByRole } = render(TravelPage, { props: { data: pageData } });
    expect(getByRole("heading", { name: /^travel$/i, level: 1 })).toBeInTheDocument();
  });

  test("renders a trip card for each trip in data", () => {
    const { container } = render(TravelPage, { props: { data: pageData } });
    expect(container.querySelectorAll(".trip-card")).toHaveLength(allTrips.length);
  });

  test("renders a trip count summary", () => {
    const { container } = render(TravelPage, { props: { data: pageData } });
    const count = container.querySelector(".travel-page__count");
    expect(count).toBeInTheDocument();
    expect(count?.textContent).toContain(String(allTrips.length));
  });

  test("renders the filter section", () => {
    const { getByRole } = render(TravelPage, { props: { data: pageData } });
    expect(getByRole("region", { name: /filter trips/i })).toBeInTheDocument();
  });
});
