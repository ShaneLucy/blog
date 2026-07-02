# Blog Project - Tech Lead Memory

## Tech Stack (Confirmed, as of 2026-06-06)
- **Framework**: SvelteKit 2 (2.57+) with Svelte 5 (runes mode enforced in svelte.config.js)
- **Language**: TypeScript 6 (strict mode on)
- **Build**: Vite 8, **@sveltejs/adapter-static** (static SSG; prerender via src/routes/+layout.ts `export const prerender = true`)
- **Package manager**: Bun
- **Image pipeline**: sharp + exifr (EXIF strip at build time, WebP, thumbnails)
- **Testing**: Vitest ONLY (unit + axe-core a11y, `bun run test:unit`, jsdom). NO Playwright/e2e in package.json (memory previously wrong). `lighthouse` is a devDep but no script wires it — no perf budget enforcement.
- **CSS**: Pure CSS custom properties (oklch colors), NO Tailwind. Design tokens in src/app.css.

## Project Structure
- Trip data: TS files in `src/content/trips/<slug>/trip.ts`, aggregated by `src/lib/data/trips.ts`
- Types: `src/lib/types/trip.ts` — TWO enums now: `PhotoTag` + `TripTag`. `Trip.tags` is `ReadonlySet<TripTag>`, `TripPhoto.tags` is `ReadonlySet<PhotoTag>` (no longer string[]/arrays). Trip data files use `new Set([...])`.
- Routes: `/`, `/about` (NOW EXISTS), `/travel`, `/travel/[slug]`, `/travel/[slug]/[photoSlug]`, `+error.svelte`
- `allTrips` currently = [norway-2026] ONLY (japan-2024 removed). Registry in `src/lib/data/trips.ts` still manual-import per trip.
- Image src built via `src/lib/images.ts` (`tripImageSrc`/`tripThumbSrc`) — centralised, no longer hardcoded in 4+ files.
- Config constants in `src/lib/config.ts` (SITE_NAME, SITE_URL, HTTP_NOT_FOUND). Date utils in `src/lib/utils/dates.ts` (DD-MM-YYYY format).

## Known Issues / Tech Debt (updated 2026-07-01 review)
- CRITICAL PERF: `scripts/process-images.ts:19` uses `webp({ quality: 100 })` → full-size images 5-13.5MB (total 170MB). Detail/hero routes preload these full-size originals as LCP with fetchpriority=high. No srcset anywhere — only full + 400px thumb. Fix: quality ~80 + mid-size renditions + srcset.
- `$app/stores` → `$app/state` migration DONE (Header, travel/+page, +error all use `$app/state`). Resolved.
- Image fallback logic (thumb<->full->hide) STILL DUPLICATED in TripCard, TripGallery, photo-detail — extract <TripImage>. Note: fallback DIRECTION differs (card thumb→full; detail full→thumb) so extraction needs a direction prop. This bug-prone logic is untested.
- Filter semantics inconsistent: travel page AND-logic (`selectedTags.every`), TripGallery OR-logic (`some`).
- travel/+page.svelte `$effect` calls `goto` unconditionally on mount → redundant replaceState on every load.
- OG images use 400px thumbnail with `summary_large_image` card (wants ≥1200px) — trip-detail + photo-detail.
- prerender handleHttpError still silences `/about` (now stale — route exists) and a `/travel/.+` catch-all that can mask genuinely broken internal links.
- 170MB generated images committed to repo (only raw/ gitignored) — clone bloat.

## Architecture Decisions
- [Gallery lazy-loading strategy](decision_gallery_lazy_loading.md) — rejected "load-all on DCL" (regresses hero LCP); prefer declarative eager rows + optional IntersectionObserver action that keeps no-JS baseline

## Patterns to Respect
- Strong a11y discipline: skip link, focus mgmt, prefers-reduced-motion kill-switch, forced-colors fallbacks, 44px targets. Do not regress.
- Svelte 5 deep $state proxy: keyed Record mutation (obj[key]=true) IS reactive (used in TripGallery).
- All dynamic content rendered via auto-escaped {text} interpolation — no {@html} anywhere. Keep it that way.
- EXIF/GPS stripping is privacy-critical; process-images.ts fails the build (exit 1) if metadata not stripped.

## Key File Paths
- Config: `svelte.config.js`, `tsconfig.json`, `package.json`
- Design tokens: `src/app.css`
- Trip types: `src/lib/types/trip.ts`
- Image pipeline: `scripts/process-images.ts`
- Routes: `src/routes/`
