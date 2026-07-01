---
name: project-axe-a11y
description: How axe-core accessibility tests are set up in this project — package, file locations, and the helper pattern
metadata:
  type: project
---

## Package
`axe-core` v4 (dev dep). No wrapper package (no vitest-axe, no jest-axe).

## Files
- `tests/unit/a11y/helpers.ts` — shared `formatViolations(violations: Result[]): string` helper
- `tests/unit/a11y/layout.a11y.test.ts` — Header + Footer
- `tests/unit/a11y/travel-components.a11y.test.ts` — TripCard + TripFilters + TripGallery
- `tests/unit/a11y/error-page.a11y.test.ts` — error page (`+error.svelte`)

## Pattern
```typescript
import axe from "axe-core";
import { formatViolations } from "./helpers";

const { container } = render(Component, { props: { ... } });
const results = await axe.run(container);
expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
```

- Run axe on the testing-library `container` (scoped to the component, already in document.body)
- The `formatViolations` second arg to `expect()` provides readable failure output
- jsdom shows "HTMLCanvasElement getContext not implemented" warnings — harmless, axe uses canvas for colour contrast which is skipped in jsdom
- Use real trip data from `src/content/trips/norway-2026/trip.ts`, not mock fixtures — user preference

## Type note
When overriding `Trip.tags` (a `ReadonlySet<TripTag>`), be explicit: `new Set<TripTag>()` — plain `new Set()` is inferred as `Set<unknown>` and fails svelte-check.
