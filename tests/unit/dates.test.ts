import { describe, test, expect } from "vitest";
import { parseDMY, dmyToIso } from "../../src/lib/utils/dates";

describe("parseDMY", () => {
  test("parses day, month, and year correctly", () => {
    const dmy = "15-03-2024";
    const [day, month, year] = dmy.split("-").map(Number);
    const date = parseDMY(dmy);
    expect(date.getFullYear()).toBe(year);
    expect(date.getMonth()).toBe(month - 1); // Date months are 0-indexed
    expect(date.getDate()).toBe(day);
  });

  test("returns a Date instance", () => {
    expect(parseDMY("01-06-2024")).toBeInstanceOf(Date);
  });

  test("handles January (0-indexed month)", () => {
    const dmy = "01-01-2025";
    const [day, month] = dmy.split("-").map(Number);
    const date = parseDMY(dmy);
    expect(date.getMonth()).toBe(month - 1);
    expect(date.getDate()).toBe(day);
  });

  test("handles December (last month of year)", () => {
    const dmy = "31-12-2024";
    const [day, month] = dmy.split("-").map(Number);
    const date = parseDMY(dmy);
    expect(date.getMonth()).toBe(month - 1);
    expect(date.getDate()).toBe(day);
  });
});

describe("dmyToIso", () => {
  test("converts DD-MM-YYYY to YYYY-MM-DD", () => {
    const dmy = "15-03-2024";
    const [day, month, year] = dmy.split("-");
    expect(dmyToIso(dmy)).toBe(`${year}-${month}-${day}`);
  });

  test("preserves leading zeros on day and month", () => {
    const dmy = "01-01-2024";
    const [day, month, year] = dmy.split("-");
    expect(dmyToIso(dmy)).toBe(`${year}-${month}-${day}`);
  });

  test("handles end-of-year date", () => {
    const dmy = "31-12-2024";
    const [day, month, year] = dmy.split("-");
    expect(dmyToIso(dmy)).toBe(`${year}-${month}-${day}`);
  });

  test("round-trips consistently with parseDMY", () => {
    const dmy = "15-03-2024";
    const iso = dmyToIso(dmy);
    const date = parseDMY(dmy);
    const [isoYear, isoMonth, isoDay] = iso.split("-").map(Number);
    expect(date.getFullYear()).toBe(isoYear);
    expect(date.getMonth()).toBe(isoMonth - 1);
    expect(date.getDate()).toBe(isoDay);
  });
});
