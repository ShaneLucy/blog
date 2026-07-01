---
name: project-test-conventions
description: Vitest test stack, folder layout, mock patterns, and render conventions for this project
metadata:
  type: project
---

## Test runner
- Vitest v4 (`bun run test:unit` → `vitest run --run`)
- `tests/unit/**/*.test.ts` — include glob
- `tests/setup.ts` — global setup: imports `@testing-library/jest-dom/vitest`, calls `cleanup()` in `afterEach`
- jsdom environment; sveltekit() vite plugin resolves `$lib/` and `$app/` aliases in test files

## Render convention
```typescript
const { container } = render(Component, { props: { ... } });
```

## Mock patterns
- `$app/state` (page store): `vi.hoisted()` + `vi.mock("$app/state", () => mockState)`
- `$app/paths` resolve(): no mock needed — sveltekit plugin provides stubs
- `$lib/images`: no mock needed — functions return plain string paths

## Folder layout
- `tests/unit/components/` — unit tests per component
- `tests/unit/routes/` — unit tests per route
- `tests/unit/a11y/` — axe accessibility tests (grouped by feature area)
- `tests/unit/` root — utility/module tests

## Real data imports
Trip data lives at `src/content/trips/norway-2026/trip.ts`.
Aggregated data: `src/lib/data/trips.ts` exports `allTrips`, `allDestinations`, `allTags`, `allPhotoTags`.
Both are importable in tests via their relative paths (sveltekit plugin resolves `$lib/` aliases within them).
