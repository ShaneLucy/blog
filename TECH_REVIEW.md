# Technical Review — Blog Project

**Date:** 2026-07-01
**Reviewer:** Tech Lead Architect (AI)

Overall this is a well-built, disciplined codebase — strong accessibility, clean SSG architecture, good test breadth. One critical performance defect undermines the image pipeline; a handful of medium issues otherwise.

---

## Critical

### #1 — Image quality 100 producing 5–13 MB WebP files

`scripts/process-images.ts:19` encodes at `quality: 100`. Detail pages preload these full-size originals as the LCP element. One photo page = one 5–13 MB high-priority download — blowing the project's own < 500 kB image budget and LCP < 2.5s P75 mobile target.

**Fix:**

1. Drop full-size quality to ~80 (visually indistinguishable, ~10× smaller)
2. Generate intermediate renditions: 800 / 1600 / 2400 px alongside the existing 400px thumb
3. Emit `srcset` + `sizes` on all detail/hero/gallery `<img>` elements
4. Preload the _chosen_ rendition (not the original) in `<link rel="preload">`

**Affected files:** `scripts/process-images.ts`, `src/routes/travel/[slug]/[photoSlug]/+page.svelte`, `src/routes/travel/[slug]/+page.svelte`, `src/lib/components/travel/TripGallery.svelte`

---

## Medium

### #2 — No Lighthouse / performance CI gate

`lighthouse` is installed but never wired to a CI check with a budget table as a hard fail. A Lighthouse gate would have caught the image-weight regression in #1 automatically.

### #3 — Duplicated image fallback state machine (untested)

The thumb↔full `onerror` logic is copy-pasted across three files — with subtly different fallback _directions_ (card: thumb→full; detail: full→thumb):

- `src/lib/components/travel/TripCard.svelte:24-27,41-47`
- `src/lib/components/travel/TripGallery.svelte:37-38,75-81`
- `src/routes/travel/[slug]/[photoSlug]/+page.svelte:21-25,87-93`

Zero tests cover this logic. Extract a `<TripImage>` component with a `priority` prop that controls fallback direction.

### #4 — OG images are 400px thumbnails

`summary_large_image` cards want ≥ 1200×630 px. The current OG `<meta>` tags point at 400px thumbs, which render blurry/cropped in social previews.

**Affected:** `src/routes/travel/[slug]/+page.svelte:42,51`, `src/routes/travel/[slug]/[photoSlug]/+page.svelte:52,57`

**Fix:** generate a dedicated ~1200px OG rendition in the image pipeline (folds naturally into the srcset work above).

### #5 — `unsafe-inline` in CSP + missing HSTS

`static/_headers` has `script-src 'unsafe-inline'`, which weakens the CSP's core XSS protection. SvelteKit's `kit.csp` hash strategy (`svelte.config.js`) can generate per-script hashes to drop `unsafe-inline` for scripts.

`Strict-Transport-Security` is also absent — `upgrade-insecure-requests` in the CSP is not a substitute.

**Fix:** add `Strict-Transport-Security: max-age=31536000; includeSubDomains` to the `/*` block in `static/_headers` and configure `kit.csp` in `svelte.config.js`.

---

## Low / Cleanup

### Load functions use hand-written param types

`src/routes/travel/[slug]/+page.ts:10` and `.../[photoSlug]/+page.ts:15` use `{ params: { slug: string } }` instead of the generated `./$types` (`PageLoad` / `RequestEvent`). These will silently drift if a route param is renamed.

### Date format DD-MM-YYYY is a foot-gun

`src/content/trips/norway-2026/trip.ts:7` (and any future trips) store dates as `DD-MM-YYYY`, forcing the custom `parseDMY`/`dmyToIso` helpers in `src/lib/utils/dates.ts` to exist. Neither validates input — a malformed string yields a silent `Invalid Date`. Switching to ISO `YYYY-MM-DD` would delete both helpers and make dates sortable/parseable natively.

### URL-sync `$effect` fires on every mount

`src/routes/travel/+page.svelte:34-51` calls `goto(..., { replaceState: true })` unconditionally on mount even when nothing has changed. Guard it: compute the target search string and only call `goto` if it differs from `$page.url.search`.

### Inconsistent filter semantics

Trip filtering is AND (`selectedTags.every(...)`, `travel/+page.svelte:25`); photo filtering is OR (`selectedTags.some(...)`, `TripGallery.svelte:19`). Same tag-pill UI, two mental models. Pick one (OR is the more common gallery expectation) and document the reason.

### Stale `handleHttpError` guards

`svelte.config.js:15-29` still silences `/about` 404s — but `/about` now exists, making that clause dead code that could mask a genuinely broken build. The `/travel/.+` catch-all is riskier: since `entries()` generates every valid trip/photo URL, any `/travel/*` 404 at prerender time means a real dead internal link is being silently swallowed. Tighten or remove so dead links fail the build.

### Manual trip registry

`src/lib/data/trips.ts:2,4` requires a hand-edited `import` per new trip. At ~5+ trips, consider `import.meta.glob('/src/content/trips/*/trip.ts', { eager: true })` for auto-discovery.

---

## Architecture Notes (Strengths)

- `entries()` generators correctly enumerate all dynamic routes for prerender
- Image URL construction centralised in `src/lib/images.ts` — no hardcoded-path duplication
- The envelope aspect-ratio trick on the photo detail container is a solid CLS defence
- Gallery lazy-loading: first 8 eager, rest lazy — correct
- Explicit `width`/`height` on all images — CLS-safe
- `$app/state` migration from `$app/stores` is complete

---

## Accessibility (Standout Strength — Do Not Regress)

- Skip link (`+layout.svelte:9`)
- Mobile menu: focus management + Escape-to-close-and-restore (`Header.svelte:10-33`)
- `aria-current`, `aria-pressed` toggles
- `aria-live`/`aria-atomic` result count (`travel/+page.svelte:84`)
- Forced-colors fallback for native select chevron (`TripFilters.svelte:253-258`)
- `prefers-reduced-motion` kill-switch on hover transforms
- Decorative images correctly `aria-hidden`
- Screen-reader-only arrow-key hint on photo nav

**Minor:** the mobile menu does not trap focus — Tab can reach the page behind the open overlay. Acceptable for a small nav; note if the menu grows.

---

## Deployment / CI Notes

- `adapter-static` + `fallback: 404.html` + Cloudflare Pages is the right setup
- Caching is correct: immutable for `/_app/immutable/*`, 1-week for `/images/*`
- **170 MB of generated images are committed to the repo** (only `raw/` is gitignored). Decide before trip #5: Git LFS for `static/images/**`, or commit raws and generate in CI.

---

## Prioritised Action List

| #   | Action                                                                                          | Effort |
| --- | ----------------------------------------------------------------------------------------------- | ------ |
| 1   | Image pipeline: `quality 80` + multi-rendition (800/1600/2400) + `srcset`/`sizes` + preload fix | M–L    |
| 2   | Wire Lighthouse CI gate with budget table as hard fail                                          | S–M    |
| 3   | Extract `<TripImage>` + test fallback state machine + 1200px OG rendition                       | M      |
| 4   | HSTS header + `kit.csp` hash strategy to drop `script-src 'unsafe-inline'`                      | S      |
| 5   | Stale `handleHttpError` guards, `./$types` on load fns, `$effect` guard, filter consistency     | S      |
