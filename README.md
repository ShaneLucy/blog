# blog

A personal travel blog built with SvelteKit 5 (runes mode) and statically generated via `@sveltejs/adapter-static`.

## Stack

- **SvelteKit 2 + Svelte 5** (runes mode)
- **TypeScript 6**, **Vite 8**
- **Bun** — package manager and runtime
- **Vitest** — unit tests
- **Pure CSS** with custom properties (no Tailwind)
- **sharp + exifr** — image processing (EXIF extraction, strip, WebP conversion)
- **@fontsource-variable/inter** + **@fontsource-variable/lora** — bundled variable fonts

## Project structure

```
src/
  app.css                   # Design tokens, reset, global styles
  routes/
    +layout.svelte          # Root layout (imports app.css)
    +layout.ts              # export const prerender = true
    +error.svelte           # Error page
    +page.svelte            # Landing page
    about/                  # About page
    travel/
      +page.svelte          # Trip listing with filters
      +page.ts
      [slug]/               # Trip detail page
        +page.svelte
        +page.ts
        [photoSlug]/        # Photo detail page
          +page.svelte
          +page.ts
  lib/
    types/trip.ts           # PhotoTag enum, Trip + TripPhoto interfaces
    data/trips.ts           # Trip registry (allTrips, allDestinations, allTags)
    components/
      layout/               # Header, Footer
      travel/               # TripCard, TripFilters, TripGallery
      shared/
  content/trips/            # Per-trip TypeScript data files
scripts/
  process-images.ts         # EXIF strip + WebP pipeline
static/
  images/trips/             # Static trip photos (processed)
```

## Getting started

```sh
bun install
bun run dev
```

## Scripts

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `bun run dev`            | Start development server                  |
| `bun run build`          | Production build                          |
| `bun run preview`        | Preview production build locally          |
| `bun run lint`           | Prettier, ESLint, Stylelint, svelte-check |
| `bun run test:unit`      | Run unit tests (Vitest)                   |
| `bun run coverage`       | Unit tests with coverage report           |
| `bun run process-images` | Strip EXIF + convert images to WebP       |

## Image pipeline

Place raw photos (JPEG, PNG, etc.) in `static/images/trips/<trip-slug>/` then run:

```sh
bun run process-images
```

## Trip data

Trips are defined as TypeScript files in `src/content/trips/<slug>/trip.ts` and aggregated in `src/lib/data/trips.ts`. No CMS or database is involved — everything is type-checked at build time.
