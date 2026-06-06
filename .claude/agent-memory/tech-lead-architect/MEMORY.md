# Blog Project - Tech Lead Memory

## Tech Stack (Confirmed, as of 2026-06-06)
- **Framework**: SvelteKit 2 (2.57+) with Svelte 5 (runes mode enforced in svelte.config.js)
- **Language**: TypeScript 6 (strict mode on)
- **Build**: Vite 8, **@sveltejs/adapter-static** (static SSG; prerender via src/routes/+layout.ts `export const prerender = true`)
- **Package manager**: Bun
- **Image pipeline**: sharp + exifr (EXIF strip at build time, WebP, thumbnails)
- **Testing**: Vitest (unit, `bun run test:unit`) + Playwright (e2e). package.json uses vitest, NOT `bun test`.
- **CSS**: Pure CSS custom properties (oklch colors), NO Tailwind. Design tokens in src/app.css.

## Project Structure
- Trip data: TS files in `src/content/trips/<slug>/trip.ts`, aggregated by `src/lib/data/trips.ts`
- Types: `src/lib/types/trip.ts` — `PhotoTag` enum (controlled vocab for photos); `Trip.tags` is free-form `string[]`
- Routes: `/`, `/travel`, `/travel/[slug]`, `/travel/[slug]/[photoSlug]`, `+error.svelte`
- `/about` is LINKED in Header/Footer but the route does NOT exist (prerender 404 silenced in svelte.config.js)
- Image paths: `/images/trips/<slug>/<filename>` and `/thumbnails/` variant, hardcoded in 4+ files

## Known Issues / Tech Debt (from 2026-06-06 review)
- `bun run check` FAILS: type errors in tests/__mocks__/$app/stores.ts (page.url union) and tests/unit/routes/*.test.ts (entries() RouteParams[]|Promise union)
- `$app/stores` (deprecated in SK2) still used in Header, travel/+page, +error — migrate to `$app/state`
- Image fallback logic (thumb->full->hide) DUPLICATED in TripCard, TripGallery, photo-detail — extract <TripImage>
- norway-2026 trip.ts has placeholder alt text ("TODO...") and non-descriptive filenames (OIP.webp)
- Unused design tokens: --z-lightbox, --z-toast, --color-overlay* (lightbox feature removed)

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
