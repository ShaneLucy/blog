import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import axe from "axe-core";
import Header from "../../../src/lib/components/layout/Header.svelte";
import Footer from "../../../src/lib/components/layout/Footer.svelte";
import { formatViolations } from "./helpers";

const mockAppState = vi.hoisted(() => ({
  page: { url: new URL("http://localhost/") },
  navigating: null,
  updated: false
}));
vi.mock("$app/state", () => mockAppState);

beforeEach(() => {
  mockAppState.page = { url: new URL("http://localhost/") };
});

describe("Header: accessibility", () => {
  test("has no axe violations in the default (closed menu) state", async () => {
    const { container } = render(Header);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when the mobile menu is open", async () => {
    const { container, getByRole } = render(Header);
    await fireEvent.click(getByRole("button", { name: /open navigation menu/i }));
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when a nav link is marked as current page", async () => {
    mockAppState.page = { url: new URL("http://localhost/travel") };
    const { container } = render(Header);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});

describe("Footer: accessibility", () => {
  test("has no axe violations", async () => {
    const { container } = render(Footer);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});
