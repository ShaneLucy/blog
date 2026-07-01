import { describe, test, expect } from "vitest";
import { render } from "@testing-library/svelte";
import HomePage from "../../../src/routes/+page.svelte";

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
