import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import ErrorPage from "../../../src/routes/+error.svelte";

const mockState = vi.hoisted(() => ({
  page: { status: 404, error: null as { message: string } | null }
}));
vi.mock("$app/state", () => mockState);

describe("+error page head", () => {
  test("title includes the status code and site name", () => {
    mockState.page = { status: 404, error: null };
    render(ErrorPage);
    expect(document.title).toBe("Error 404 — Wandering Pages");
  });

  test("title reflects a different status code", () => {
    mockState.page = { status: 500, error: null };
    render(ErrorPage);
    expect(document.title).toBe("Error 500 — Wandering Pages");
  });
});

describe("+error page", () => {
  test("renders the HTTP status code", () => {
    mockState.page = { status: 404, error: null };
    const { container } = render(ErrorPage);
    expect(container.querySelector(".error-page__status")?.textContent).toBe("404");
  });

  test("renders error message when error is present", () => {
    mockState.page = { status: 404, error: { message: "Page not found" } };
    const { container } = render(ErrorPage);
    expect(container.querySelector(".error-page__message")?.textContent).toBe("Page not found");
  });

  test("omits error message element when error is null", () => {
    mockState.page = { status: 500, error: null };
    const { container } = render(ErrorPage);
    expect(container.querySelector(".error-page__message")).toBeNull();
  });

  test("status element is aria-hidden", () => {
    mockState.page = { status: 404, error: null };
    const { container } = render(ErrorPage);
    expect(container.querySelector(".error-page__status")).toHaveAttribute("aria-hidden", "true");
  });

  test("has a link to the home page", () => {
    mockState.page = { status: 404, error: null };
    const { container } = render(ErrorPage);
    const link = container.querySelector(".error-page__home");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("omits error message when error object has an empty message", () => {
    mockState.page = { status: 500, error: { message: "" } };
    const { container } = render(ErrorPage);
    expect(container.querySelector(".error-page__message")).toBeNull();
  });
});
