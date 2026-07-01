import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { entries, load } from "../../../src/routes/travel/[slug]/[photoSlug]/+page";
import { allTrips } from "../../../src/lib/data/trips";
import { HTTP_NOT_FOUND, SITE_NAME, SITE_URL } from "../../../src/lib/config";
import PhotoDetailPage from "../../../src/routes/travel/[slug]/[photoSlug]/+page.svelte";

const mockGoto = vi.hoisted(() => vi.fn());
vi.mock("$app/navigation", () => ({ goto: mockGoto }));

const firstTrip = allTrips[0];
const firstPhoto = firstTrip.photos[0];
const lastPhoto = firstTrip.photos[firstTrip.photos.length - 1];

describe("photo detail entries()", () => {
  const result = entries() as Array<{ slug: string; photoSlug: string }>;

  test("returns one entry per photo across all trips", () => {
    const totalPhotos = allTrips.reduce((n, t) => n + t.photos.length, 0);
    expect(result).toHaveLength(totalPhotos);
  });

  test("each entry has slug and photoSlug", () => {
    for (const entry of result) {
      expect(typeof entry.slug).toBe("string");
      expect(entry.slug.length).toBeGreaterThan(0);
      expect(typeof entry.photoSlug).toBe("string");
      expect(entry.photoSlug.length).toBeGreaterThan(0);
    }
  });

  test("all trip/photo slug pairs are valid", () => {
    const photosByTrip = new Map(allTrips.map((t) => [t.slug, new Set(t.photos.map((p) => p.slug))]));
    for (const entry of result) {
      expect(photosByTrip.has(entry.slug)).toBe(true);
      expect(photosByTrip.get(entry.slug)?.has(entry.photoSlug)).toBe(true);
    }
  });
});

describe("photo detail load()", () => {
  const makeEvent = (params: { slug: string; photoSlug: string }) => ({ params });

  test("returns the correct trip and photo for valid slugs", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: firstPhoto.slug }));
    expect(result.trip).toBe(firstTrip);
    expect(result.photo).toBe(firstPhoto);
  });

  test("photoIndex is 0 for the first photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: firstPhoto.slug }));
    expect(result.photoIndex).toBe(0);
  });

  test("prevPhoto is null for the first photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: firstPhoto.slug }));
    expect(result.prevPhoto).toBeNull();
  });

  test("nextPhoto is the second photo for the first photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: firstPhoto.slug }));
    expect(result.nextPhoto).toBe(firstTrip.photos[1]);
  });

  test("nextPhoto is null for the last photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: lastPhoto.slug }));
    expect(result.nextPhoto).toBeNull();
  });

  test("prevPhoto is second-to-last for the last photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: lastPhoto.slug }));
    expect(result.prevPhoto).toBe(firstTrip.photos[firstTrip.photos.length - 2]);
  });

  test("envelope dimensions come from the most portrait photo", () => {
    const result = load(makeEvent({ slug: firstTrip.slug, photoSlug: firstPhoto.slug }));
    const mostPortrait = firstTrip.photos.reduce((min, p) => (p.width / p.height < min.width / min.height ? p : min), firstTrip.photos[0]);
    expect(result.envelopeWidth).toBe(mostPortrait.width);
    expect(result.envelopeHeight).toBe(mostPortrait.height);
  });

  test("throws 404 for an unknown trip slug", () => {
    expect(() => load(makeEvent({ slug: "does-not-exist", photoSlug: firstPhoto.slug }))).toThrow();
  });

  test("throws 404 for an unknown photo slug", () => {
    expect(() => load(makeEvent({ slug: firstTrip.slug, photoSlug: "does-not-exist" }))).toThrow();
  });

  test("thrown trip error has status 404", () => {
    let thrown: unknown;
    try {
      load(makeEvent({ slug: "does-not-exist", photoSlug: firstPhoto.slug }));
    } catch (e) {
      thrown = e;
    }
    expect((thrown as { status: number }).status).toBe(HTTP_NOT_FOUND);
  });

  test("thrown photo error has status 404", () => {
    let thrown: unknown;
    try {
      load(makeEvent({ slug: firstTrip.slug, photoSlug: "does-not-exist" }));
    } catch (e) {
      thrown = e;
    }
    expect((thrown as { status: number }).status).toBe(HTTP_NOT_FOUND);
  });
});

describe("photo detail page component", () => {
  const trip = allTrips[0];
  const photo = trip.photos[0];
  const nextPhoto = trip.photos[1];

  const firstPhotoData = {
    trip,
    photo,
    prevPhoto: null,
    nextPhoto,
    photoIndex: 0,
    envelopeWidth: photo.width,
    envelopeHeight: photo.height
  };

  const lastPhotoData = {
    trip,
    photo: nextPhoto,
    prevPhoto: photo,
    nextPhoto: null,
    photoIndex: 1,
    envelopeWidth: photo.width,
    envelopeHeight: photo.height
  };

  beforeEach(() => {
    mockGoto.mockClear();
  });

  test("renders the photo alt text as the main heading", () => {
    const { getByRole } = render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(getByRole("heading", { name: new RegExp(photo.alt, "i"), level: 1 })).toBeInTheDocument();
  });

  test("breadcrumb link points to the parent trip page", () => {
    const { container } = render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const backLink = container.querySelector('nav[aria-label="Breadcrumb"] a');
    expect(backLink).toHaveAttribute("href", `/travel/${trip.slug}`);
  });

  test("previous link is absent when there is no previous photo", () => {
    const { container } = render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(container.querySelector(".photo-nav__link--prev")).not.toBeInTheDocument();
  });

  test("next link points to the next photo", () => {
    const { container } = render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const nextLink = container.querySelector(".photo-nav__link--next");
    expect(nextLink).toHaveAttribute("href", `/travel/${trip.slug}/${nextPhoto.slug}`);
  });

  test("previous link points to the previous photo", () => {
    const { container } = render(PhotoDetailPage, { props: { data: lastPhotoData } });
    const prevLink = container.querySelector(".photo-nav__link--prev");
    expect(prevLink).toHaveAttribute("href", `/travel/${trip.slug}/${photo.slug}`);
  });

  test("ArrowRight navigates to the next photo", async () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    await fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(mockGoto).toHaveBeenCalledWith(expect.stringContaining(nextPhoto.slug));
  });

  test("ArrowLeft does nothing when there is no previous photo", async () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    await fireEvent.keyDown(document.body, { key: "ArrowLeft" });
    expect(mockGoto).not.toHaveBeenCalled();
  });

  test("ArrowLeft navigates to the previous photo", async () => {
    render(PhotoDetailPage, { props: { data: lastPhotoData } });
    await fireEvent.keyDown(document.body, { key: "ArrowLeft" });
    expect(mockGoto).toHaveBeenCalledWith(expect.stringContaining(photo.slug));
  });

  test("title includes photo caption and trip title", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.title).toBe(`${photo.caption ?? photo.alt} — ${trip.title} — Wandering Pages`);
  });

  test("meta description is the photo caption or alt", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(photo.caption ?? photo.alt);
  });

  test("og:type is article", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe("article");
  });

  test("og:site_name is the site name", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe(SITE_NAME);
  });

  test("og:title is caption/alt — trip title", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const expected = `${photo.caption ?? photo.alt} — ${trip.title}`;
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(expected);
  });

  test("og:description is the photo caption or alt", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(photo.caption ?? photo.alt);
  });

  test("og:url is the photo detail page URL", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(
      `${SITE_URL}/travel/${trip.slug}/${photo.slug}`
    );
  });

  test("twitter:card is summary_large_image", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe("summary_large_image");
  });

  test("twitter:title is caption/alt — trip title", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const expected = `${photo.caption ?? photo.alt} — ${trip.title}`;
    expect(document.head.querySelector('meta[name="twitter:title"]')?.getAttribute("content")).toBe(expected);
  });

  test("twitter:description is the photo caption or alt", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute("content")).toBe(photo.caption ?? photo.alt);
  });

  test("canonical link points to the photo detail page URL", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      `${SITE_URL}/travel/${trip.slug}/${photo.slug}`
    );
  });

  test("og:image uses the thumbnail url", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    const expected = `${SITE_URL}/images/trips/${trip.slug}/thumbnails/${photo.filename}`;
    expect(ogImage?.getAttribute("content")).toBe(expected);
  });

  test("twitter:image uses the thumbnail url", () => {
    render(PhotoDetailPage, { props: { data: firstPhotoData } });
    const twImage = document.head.querySelector('meta[name="twitter:image"]');
    const expected = `${SITE_URL}/images/trips/${trip.slug}/thumbnails/${photo.filename}`;
    expect(twImage?.getAttribute("content")).toBe(expected);
  });
});
