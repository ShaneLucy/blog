import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Layout from "../../../src/routes/+layout.svelte";
import { prerender } from "../../../src/routes/+layout";

vi.mock("$app/state", () => ({
  page: { url: new URL("http://localhost/") },
  navigating: null,
  updated: false
}));

const children = createRawSnippet(() => ({
  render: () => `<p>child content</p>`
}));

describe("+layout.ts", () => {
  test("exports prerender = true for static site generation", () => {
    expect(prerender).toBe(true);
  });
});

describe("root layout", () => {
  test("has skip link targeting #main-content", () => {
    const { container } = render(Layout, { props: { children } });
    expect(container.querySelector(".skip-link")).toHaveAttribute("href", "#main-content");
  });

  test("skip link text is 'Skip to main content'", () => {
    const { container } = render(Layout, { props: { children } });
    expect(container.querySelector(".skip-link")?.textContent).toBe("Skip to main content");
  });

  test("has a main element with id main-content", () => {
    const { container } = render(Layout, { props: { children } });
    expect(container.querySelector("main#main-content")).toBeInTheDocument();
  });

  test("renders children inside main", () => {
    const { container } = render(Layout, { props: { children } });
    const main = container.querySelector("main");
    expect(main?.querySelector("p")?.textContent).toBe("child content");
  });
});
