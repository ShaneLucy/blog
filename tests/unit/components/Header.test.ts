import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Header from "../../../src/lib/components/layout/Header.svelte";

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
});
