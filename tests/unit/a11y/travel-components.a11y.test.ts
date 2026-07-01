import { describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import axe from "axe-core";
import TripCard from "../../../src/lib/components/travel/TripCard.svelte";
import TripFilters from "../../../src/lib/components/travel/TripFilters.svelte";
import TripGallery from "../../../src/lib/components/travel/TripGallery.svelte";
import { trip as norwayTrip } from "../../../src/content/trips/norway-2026/trip";
import { allDestinations, allTags } from "../../../src/lib/data/trips";
import { TripTag } from "../../../src/lib/types/trip";
import { formatViolations } from "./helpers";

describe("TripCard: accessibility", () => {
  test("has no axe violations", async () => {
    const { container } = render(TripCard, { props: { trip: norwayTrip } });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when the trip has no tags", async () => {
    const { container } = render(TripCard, {
      props: { trip: { ...norwayTrip, tags: new Set<TripTag>() } }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});

describe("TripFilters: accessibility", () => {
  test("has no axe violations with destinations and tags", async () => {
    const { container } = render(TripFilters, {
      props: { destinations: allDestinations, tags: allTags }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations with empty destinations and tags lists", async () => {
    const { container } = render(TripFilters, { props: { destinations: [], tags: [] } });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when active filters render the clear button", async () => {
    const { container } = render(TripFilters, {
      props: {
        destinations: allDestinations,
        tags: allTags,
        selectedDestination: allDestinations[0],
        selectedTags: allTags.slice(0, 1)
      }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});

describe("TripGallery: accessibility", () => {
  test("has no axe violations with the Norway trip photos", async () => {
    const { container } = render(TripGallery, {
      props: { photos: norwayTrip.photos, slug: norwayTrip.slug }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations with an empty photo list", async () => {
    const { container } = render(TripGallery, {
      props: { photos: [], slug: norwayTrip.slug }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when photos have no tags (no filter bar rendered)", async () => {
    const untaggedPhotos = norwayTrip.photos.map((p) => ({ ...p, tags: undefined }));
    const { container } = render(TripGallery, {
      props: { photos: untaggedPhotos, slug: norwayTrip.slug }
    });
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});
