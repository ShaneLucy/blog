import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import TripGallery from "../../../src/lib/components/travel/TripGallery.svelte";
import { type TripPhoto, PhotoTag } from "../../../src/lib/types/trip";

const photos: TripPhoto[] = [
  {
    slug: "photo-1",
    filename: "photo1.jpg",
    alt: "Mount Fuji at sunrise",
    width: 1600,
    height: 1067,
    tags: new Set([PhotoTag.Landscape, PhotoTag.Nature])
  },
  {
    slug: "photo-2",
    filename: "photo2.jpg",
    alt: "Traditional temple gate",
    width: 1200,
    height: 800,
    tags: new Set([PhotoTag.Architecture])
  }
];

describe("TripGallery", () => {
  test("renders all photos in the gallery list", () => {
    const { getByRole } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    const gallery = getByRole("list", { name: /trip photos/i });
    expect(gallery.querySelectorAll("li")).toHaveLength(photos.length);
  });

  test("each photo links to the correct detail URL", () => {
    const { container } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    const links = container.querySelectorAll("a");
    expect(links[0]).toHaveAttribute("href", "/travel/japan-2024/photo-1");
    expect(links[1]).toHaveAttribute("href", "/travel/japan-2024/photo-2");
  });

  test("renders tag filter buttons when photos have tags", () => {
    const { getByRole } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    expect(getByRole("group", { name: /filter photos/i })).toBeInTheDocument();
  });

  test("no filter bar when no photos have tags", () => {
    const noTagPhotos: TripPhoto[] = photos.map((p) => ({ ...p, tags: new Set<PhotoTag>() }));
    const { queryByRole } = render(TripGallery, {
      props: { photos: noTagPhotos, slug: "japan-2024" }
    });
    expect(queryByRole("group", { name: /filter photos/i })).not.toBeInTheDocument();
  });

  test("selecting a tag filters photos to those matching", async () => {
    const { getByRole } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    await fireEvent.click(getByRole("button", { name: /architecture/i }));
    const gallery = getByRole("list", { name: /trip photos/i });
    expect(gallery.querySelectorAll("li")).toHaveLength(1);
  });

  test("deselecting a tag restores all photos", async () => {
    const { getByRole } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    const btn = getByRole("button", { name: /architecture/i });
    await fireEvent.click(btn);
    await fireEvent.click(btn);
    const gallery = getByRole("list", { name: /trip photos/i });
    expect(gallery.querySelectorAll("li")).toHaveLength(photos.length);
  });

  test("OR logic: selecting two tags shows photos matching either", async () => {
    const { getByRole } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    await fireEvent.click(getByRole("button", { name: /landscape/i }));
    await fireEvent.click(getByRole("button", { name: /architecture/i }));
    const gallery = getByRole("list", { name: /trip photos/i });
    // photo-1 has landscape, photo-2 has architecture — both should show
    expect(gallery.querySelectorAll("li")).toHaveLength(2);
  });

  test("first img error switches src from thumbnail to full-resolution", async () => {
    const { container } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    const imgEl = img as HTMLImageElement;
    expect(imgEl.getAttribute("src")).toContain("/thumbnails/");
    await fireEvent.error(imgEl);
    expect(imgEl.getAttribute("src")).not.toContain("/thumbnails/");
    expect(imgEl.getAttribute("src")).toContain("photo1.jpg");
  });

  test("second img error removes that image element from the gallery", async () => {
    const { container } = render(TripGallery, { props: { photos, slug: "japan-2024" } });
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    const imgEl = img as HTMLImageElement;
    await fireEvent.error(imgEl);
    await fireEvent.error(imgEl);
    // photo-1's img removed; photo-2's img still present
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });
});
