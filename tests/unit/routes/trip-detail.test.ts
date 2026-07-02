import { describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { entries, load } from "../../../src/routes/travel/[slug]/+page";
import { allTrips } from "../../../src/lib/data/trips";
import { HTTP_NOT_FOUND, SITE_NAME, SITE_URL } from "../../../src/lib/config";
import { parseDMY, dmyToIso } from "../../../src/lib/utils/dates";
import { tripOgSrc } from "../../../src/lib/images";
import TripDetailPage from "../../../src/routes/travel/[slug]/+page.svelte";

// Mirror of formatDateRange from routes/travel/[slug]/+page.svelte
function formatDateRange(start: string, end: string): string {
  const s = parseDMY(start);
  const e = parseDMY(end);
  const locale = "en-GB";
  if (s.getFullYear() === e.getFullYear()) {
    if (s.getMonth() === e.getMonth()) {
      return `${s.getDate()}–${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
    }
    return `${s.toLocaleDateString(locale, { day: "numeric", month: "long" })} – ${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
  }
  return `${s.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })} – ${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
}

describe("trip detail entries()", () => {
  const result = entries() as Array<{ slug: string }>;

  test("returns one entry per trip", () => {
    expect(result).toHaveLength(allTrips.length);
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
    const result = load({ params: { slug: firstTrip.slug } });
    expect(result.trip).toBe(firstTrip);
  });

  test("throws 404 for an unknown slug", () => {
    expect(() => load({ params: { slug: "does-not-exist" } })).toThrow();
  });

  test("thrown error has status 404", () => {
    let thrown: unknown;
    try {
      load({ params: { slug: "does-not-exist" } });
    } catch (e) {
      thrown = e;
    }
    expect((thrown as { status: number }).status).toBe(HTTP_NOT_FOUND);
  });
});

describe("formatDateRange()", () => {
  test("same month: shows day range with month and year appearing once", () => {
    const result = formatDateRange("01-03-2024", "15-03-2024");
    expect(result).toContain("–");
    expect(result).toContain("March");
    expect(result).toContain("2024");
    // Year should appear only once (not duplicated for same-month range)
    expect(result.split("2024")).toHaveLength(2);
  });

  test("same year, different months: shows two month names sharing one year", () => {
    const result = formatDateRange("28-02-2024", "02-03-2024");
    expect(result).toContain("February");
    expect(result).toContain("March");
    expect(result).toContain("2024");
    expect(result.split("2024")).toHaveLength(2);
  });

  test("different years: shows full dates for both ends with their own year", () => {
    const result = formatDateRange("28-12-2023", "05-01-2024");
    expect(result).toContain("2023");
    expect(result).toContain("2024");
  });
});

describe("trip detail page component", () => {
  const firstTrip = allTrips[0];

  test("renders the trip title as main heading", () => {
    const { getByRole } = render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(getByRole("heading", { name: new RegExp(firstTrip.title, "i"), level: 1 })).toBeInTheDocument();
  });

  test("renders destination in the trip header", () => {
    const { container } = render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(container.querySelector(".trip-detail__header")).toHaveTextContent(firstTrip.destination);
  });

  test("renders the photo gallery when the trip has photos", () => {
    if (firstTrip.photos.length > 0) {
      const { getByRole } = render(TripDetailPage, { props: { data: { trip: firstTrip } } });
      expect(getByRole("list", { name: /trip photos/i })).toBeInTheDocument();
    }
  });

  test("renders a breadcrumb link back to /travel", () => {
    const { container } = render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    const backLink = container.querySelector('nav[aria-label="Breadcrumb"] a');
    expect(backLink).toHaveAttribute("href", "/travel");
  });

  test("title is trip title — Wandering Pages", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.title).toBe(`${firstTrip.title} — Wandering Pages`);
  });

  test("meta description is the trip description", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(firstTrip.description);
  });

  test("og:type is article", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe("article");
  });

  test("og:site_name is the site name", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe(SITE_NAME);
  });

  test("og:title is the trip title", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(firstTrip.title);
  });

  test("og:description is the trip description", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(firstTrip.description);
  });

  test("og:url is the trip page URL", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(`${SITE_URL}/travel/${firstTrip.slug}`);
  });

  test("article:published_time is the ISO date of the trip start", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[property="article:published_time"]')?.getAttribute("content")).toBe(
      dmyToIso(firstTrip.dates.start)
    );
  });

  test("article:tag metas match the trip tags", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    const expectedTags = [...firstTrip.tags];
    const tagMetas = [...document.head.querySelectorAll('meta[property="article:tag"]')];
    expect(tagMetas).toHaveLength(expectedTags.length);
    expect(tagMetas.map((m) => m.getAttribute("content"))).toEqual(expectedTags);
  });

  test("twitter:card is summary_large_image", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe("summary_large_image");
  });

  test("twitter:title is the trip title", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute("content")).toBe(firstTrip.title);
  });

  test("twitter:description is the trip description", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute("content")).toBe(firstTrip.description);
  });

  test("canonical link points to the trip page URL", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE_URL}/travel/${firstTrip.slug}`);
  });

  test("og:image uses the og rendition url for the cover photo", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    const expected = `${SITE_URL}${tripOgSrc(firstTrip.slug, firstTrip.coverPhoto.filename)}`;
    expect(ogImage?.getAttribute("content")).toBe(expected);
  });

  test("twitter:image uses the og rendition url for the cover photo", () => {
    render(TripDetailPage, { props: { data: { trip: firstTrip } } });
    const twImage = document.head.querySelector('meta[name="twitter:image"]');
    const expected = `${SITE_URL}${tripOgSrc(firstTrip.slug, firstTrip.coverPhoto.filename)}`;
    expect(twImage?.getAttribute("content")).toBe(expected);
  });
});
