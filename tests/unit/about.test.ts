import { describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { allTrips } from "../../src/lib/data/trips";
import { parseDMY } from "../../src/lib/utils/dates";
import type { Trip } from "../../src/lib/types/trip";
import AboutPage from "../../src/routes/about/+page.svelte";

const DMY_YEAR_OFFSET = 6;

// Mirrors the transformation on the about page
const destinations = [...allTrips]
  .sort((a, b) => parseDMY(b.dates.start).getTime() - parseDMY(a.dates.start).getTime())
  .map((t) => ({
    name: t.destination,
    year: t.dates.start.slice(DMY_YEAR_OFFSET),
    slug: t.slug,
    description: t.description
  }));

describe("about page destinations list", () => {
  test("includes every trip", () => {
    expect(destinations).toHaveLength(allTrips.length);
  });

  test("is sorted by start date descending (most recent first)", () => {
    for (let i = 0; i < destinations.length - 1; i++) {
      const curr = allTrips.find((t) => t.slug === destinations[i].slug) as Trip;
      const next = allTrips.find((t) => t.slug === destinations[i + 1].slug) as Trip;
      expect(parseDMY(curr.dates.start).getTime() >= parseDMY(next.dates.start).getTime()).toBe(true);
    }
  });

  test("each destination has a non-empty name", () => {
    for (const dest of destinations) {
      expect(typeof dest.name).toBe("string");
      expect(dest.name.length).toBeGreaterThan(0);
    }
  });

  test("year is the last four characters of dates.start (YYYY in DD-MM-YYYY)", () => {
    for (const dest of destinations) {
      const trip = allTrips.find((t) => t.slug === dest.slug) as Trip;
      expect(dest.year).toBe(trip.dates.start.slice(DMY_YEAR_OFFSET));
    }
  });

  test("year is a four-digit numeric string", () => {
    for (const dest of destinations) {
      expect(dest.year).toMatch(/^\d{4}$/);
    }
  });

  test("slug matches the source trip slug", () => {
    for (const dest of destinations) {
      const trip = allTrips.find((t) => t.slug === dest.slug) as Trip;
      expect(trip).toBeDefined();
      expect(dest.slug).toBe(trip.slug);
    }
  });

  test("name matches trip destination", () => {
    for (const dest of destinations) {
      const trip = allTrips.find((t) => t.slug === dest.slug) as Trip;
      expect(dest.name).toBe(trip.destination);
    }
  });

  test("description matches trip description", () => {
    for (const dest of destinations) {
      const trip = allTrips.find((t) => t.slug === dest.slug) as Trip;
      expect(dest.description).toBe(trip.description);
      expect(dest.description.length).toBeGreaterThan(0);
    }
  });

  test("no duplicate slugs", () => {
    const slugs = destinations.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("about page component", () => {
  test("renders the main heading with site owner name", () => {
    const { getByRole } = render(AboutPage);
    expect(getByRole("heading", { name: /hello, i'm shane/i, level: 1 })).toBeInTheDocument();
  });

  test("renders the philosophy section heading", () => {
    const { getByRole } = render(AboutPage);
    expect(getByRole("heading", { name: /how i travel/i, level: 2 })).toBeInTheDocument();
  });

  test("renders three philosophy pillars", () => {
    const { container } = render(AboutPage);
    expect(container.querySelectorAll(".about-pillar")).toHaveLength(3);
  });

  test("destinations list links to each trip's detail page", () => {
    const { container } = render(AboutPage);
    const links = container.querySelectorAll("a.destination-card");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^\/travel\//);
    }
  });

  test("CTA browse link navigates to /travel", () => {
    const { getByRole } = render(AboutPage);
    expect(getByRole("link", { name: /browse all travel/i })).toHaveAttribute("href", "/travel");
  });
});
