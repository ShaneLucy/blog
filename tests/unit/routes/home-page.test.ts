import { describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import HomePage from "../../../src/routes/+page.svelte";
import { SITE_NAME, SITE_URL } from "../../../src/lib/config";

const HOME_DESCRIPTION = "A personal travel journal — field notes, photographs, and stories from the road.";

describe("home page head", () => {
  test("title is the site name", () => {
    render(HomePage);
    expect(document.title).toBe("Wandering Pages");
  });

  test("meta description matches the page tagline", () => {
    render(HomePage);
    const meta = document.head.querySelector('meta[name="description"]');
    expect(meta?.getAttribute("content")).toBe(HOME_DESCRIPTION);
  });

  test("og:type is website", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe("website");
  });

  test("og:site_name is the site name", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe(SITE_NAME);
  });

  test("og:title is the site name", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe("Wandering Pages");
  });

  test("og:description matches the page description", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(HOME_DESCRIPTION);
  });

  test("og:url is the canonical home URL", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(`${SITE_URL}/`);
  });

  test("twitter:card is summary", () => {
    render(HomePage);
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe("summary");
  });

  test("canonical link points to the home URL", () => {
    render(HomePage);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE_URL}/`);
  });
});

describe("home page", () => {
  test("renders the site name as h1", () => {
    const { container } = render(HomePage);
    expect(container.querySelector("h1")?.textContent).toBe("Wandering Pages");
  });

  test("Explore Trips link points to /travel", () => {
    const { getAllByRole } = render(HomePage);
    const links = getAllByRole("link", { name: /explore trips/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/travel");
  });

  test("See all trips link points to /travel", () => {
    const { getAllByRole } = render(HomePage);
    const links = getAllByRole("link", { name: /see all trips/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/travel");
  });

  test("renders the introduction hero section", () => {
    const { getByRole } = render(HomePage);
    expect(getByRole("region", { name: /introduction/i })).toBeInTheDocument();
  });

  test("renders the about section", () => {
    const { getByRole } = render(HomePage);
    expect(getByRole("region", { name: /about this blog/i })).toBeInTheDocument();
  });
});
