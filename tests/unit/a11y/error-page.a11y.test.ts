import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import axe from "axe-core";
import ErrorPage from "../../../src/routes/+error.svelte";
import { formatViolations } from "./helpers";

const mockState = vi.hoisted(() => ({
  page: { status: 404, error: null as { message: string } | null }
}));
vi.mock("$app/state", () => mockState);

describe("Error page: accessibility", () => {
  test("has no axe violations for a 404 with no message", async () => {
    mockState.page = { status: 404, error: null };
    const { container } = render(ErrorPage);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations when an error message is present", async () => {
    mockState.page = { status: 404, error: { message: "Page not found" } };
    const { container } = render(ErrorPage);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  test("has no axe violations for a 500 error", async () => {
    mockState.page = { status: 500, error: { message: "Internal server error" } };
    const { container } = render(ErrorPage);
    const results = await axe.run(container);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});
