/** Parse a DD-MM-YYYY string into a Date object. */
export function parseDMY(dmy: string): Date {
  const [day, month, year] = dmy.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Convert DD-MM-YYYY to ISO 8601 (YYYY-MM-DD) for HTML datetime/meta attributes. */
export function dmyToIso(dmy: string): string {
  const [day, month, year] = dmy.split('-');
  return `${year}-${month}-${day}`;
}
