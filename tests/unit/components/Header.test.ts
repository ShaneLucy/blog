import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Header from "../../../src/lib/components/layout/Header.svelte";

const mockAppState = vi.hoisted(() => ({
  page: { url: new URL("http://localhost/") },
  navigating: null,
  updated: false
}));
vi.mock("$app/state", () => mockAppState);

beforeEach(() => {
  mockAppState.page = { url: new URL("http://localhost/") };
});

describe("Header", () => {
  test("renders the site logo text", () => {
    const { getByText } = render(Header);
    expect(getByText("Wandering Pages")).toBeInTheDocument();
  });

  test("desktop nav has Home, Travel and About links", () => {
    const { getAllByRole } = render(Header);
    const hrefs = getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/travel");
    expect(hrefs).toContain("/about");
  });

  test("has main navigation landmark", () => {
    const { getByRole } = render(Header);
    expect(getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
  });

  test("hamburger button is initially collapsed", () => {
    const { getByRole } = render(Header);
    const btn = getByRole("button", { name: /open navigation menu/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls", "mobile-menu");
  });

  test("mobile menu is hidden by default", () => {
    const { container } = render(Header);
    expect(container.querySelector("#mobile-menu")).toHaveAttribute("hidden");
  });

  test("clicking hamburger opens mobile menu", async () => {
    const { getByRole, container } = render(Header);
    await fireEvent.click(getByRole("button", { name: /open navigation menu/i }));
    expect(container.querySelector("#mobile-menu")).not.toHaveAttribute("hidden");
    expect(getByRole("button", { name: /close navigation menu/i })).toHaveAttribute("aria-expanded", "true");
  });

  test("clicking hamburger twice closes mobile menu", async () => {
    const { getByRole, container } = render(Header);
    await fireEvent.click(getByRole("button", { name: /open navigation menu/i }));
    await fireEvent.click(getByRole("button", { name: /close navigation menu/i }));
    expect(container.querySelector("#mobile-menu")).toHaveAttribute("hidden");
  });

  test("pressing Escape closes open mobile menu", async () => {
    const { getByRole, container } = render(Header);
    await fireEvent.click(getByRole("button", { name: /open navigation menu/i }));
    await fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelector("#mobile-menu")).toHaveAttribute("hidden");
  });

  test("desktop Home link has aria-current=page at root URL", () => {
    const { container } = render(Header);
    const homeLink = container.querySelector('.site-nav__links a[href="/"]');
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  test("desktop Travel link has aria-current=page on /travel", () => {
    mockAppState.page = { url: new URL("http://localhost/travel") };
    const { container } = render(Header);
    const travelLink = container.querySelector('.site-nav__links a[href="/travel"]');
    expect(travelLink).toHaveAttribute("aria-current", "page");
  });

  test("desktop About link has aria-current=page on /about", () => {
    mockAppState.page = { url: new URL("http://localhost/about") };
    const { container } = render(Header);
    const aboutLink = container.querySelector('.site-nav__links a[href="/about"]');
    expect(aboutLink).toHaveAttribute("aria-current", "page");
  });

  test("mobile Travel link has aria-current=page on /travel", () => {
    mockAppState.page = { url: new URL("http://localhost/travel") };
    const { container } = render(Header);
    const mobileTravelLink = container.querySelector('#mobile-menu a[href="/travel"]');
    expect(mobileTravelLink).toHaveAttribute("aria-current", "page");
  });

  test("mobile About link has aria-current=page on /about", () => {
    mockAppState.page = { url: new URL("http://localhost/about") };
    const { container } = render(Header);
    const mobileAboutLink = container.querySelector('#mobile-menu a[href="/about"]');
    expect(mobileAboutLink).toHaveAttribute("aria-current", "page");
  });

  test("clicking a mobile link closes the menu", async () => {
    const { getByRole, container } = render(Header);
    await fireEvent.click(getByRole("button", { name: /open navigation menu/i }));
    const mobileHomeLink = container.querySelector('#mobile-menu a[href="/"]');
    expect(mobileHomeLink).not.toBeNull();
    await fireEvent.click(mobileHomeLink as Element);
    expect(container.querySelector("#mobile-menu")).toHaveAttribute("hidden");
  });
});

describe("Header scroll behaviour", () => {
  const SCROLL_Y_ABOVE_THRESHOLD = 100;
  const SCROLL_Y_MINIMAL = 50;

  afterEach(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => 0 });
  });

  test("adds is-scrolled class when mounted on an already-scrolled page", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => SCROLL_Y_ABOVE_THRESHOLD });
    const { container } = render(Header);
    expect(container.querySelector(".site-header")).toHaveClass("is-scrolled");
  });

  test("adds is-scrolled class after a scroll event moves the page", async () => {
    const { container } = render(Header);
    expect(container.querySelector(".site-header")).not.toHaveClass("is-scrolled");
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => SCROLL_Y_MINIMAL });
    await fireEvent.scroll(window);
    expect(container.querySelector(".site-header")).toHaveClass("is-scrolled");
  });
});
