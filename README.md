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
- **Cloudflare Pages** — hosting

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
  content/trips/
    [slug]/
      raw/                  # Raw source photos — gitignored, never committed
      trip.ts               # Trip data (metadata + photo list)
scripts/
  process-images.ts         # EXIF strip + WebP pipeline
static/
  images/trips/             # Processed WebP images (output of pipeline)
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

## Adding a new trip

### 1. Create the trip folder and add raw images

Create the content directory for the trip and drop your raw photos into a `raw/` subfolder:

```
src/content/trips/[your-trip-slug]/
  raw/                  ← place raw photos here (gitignored)
  trip.ts               ← you will create this in step 2
```

The `raw/` directory is gitignored — raw photos are never committed to the repo. Supported formats: JPEG, PNG, TIFF, WebP, AVIF.

### 2. Run the image pipeline

```sh
bun run process-images
```

This strips EXIF data from every image in `raw/`, generates WebP renditions at multiple sizes, and writes them to `static/images/trips/[your-trip-slug]/`. It also scaffolds any new photo entries (with `slug`, `filename`, `width`, `height`) directly into `trip.ts` if that file already exists.

### 3. Create the trip data file

Create `src/content/trips/[your-trip-slug]/trip.ts`. The image pipeline will have scaffolded placeholder photo entries if you ran it first — fill in the remaining fields.

```ts
import { type Trip, PhotoTag, TripTag } from "$lib/types/trip";

export const trip: Trip = {
  slug: "iceland-2027", // must match the directory name
  title: "Iceland in Winter",
  destination: "Iceland",
  region: "Northern Europe", // optional
  dates: { start: "DD-MM-YYYY", end: "DD-MM-YYYY" },
  tags: new Set([TripTag.Wilderness, TripTag.Hiking]),
  coverPhoto: {
    filename: "Cover-Photo.webp",
    alt: "Descriptive alt text for the cover image",
    width: 4032,
    height: 3024
  },
  description: "One-line summary shown on the trip card.",
  body: "Longer paragraph shown on the trip detail page.",
  photos: [
    {
      slug: "descriptive-photo-slug", // URL-safe, unique within the trip
      filename: "My-Photo.webp", // base name without rendition suffix
      alt: "Descriptive alt text",
      caption: "Optional caption shown on the photo detail page",
      tags: new Set([PhotoTag.Landscape, PhotoTag.Nature]),
      width: 4032,
      height: 3024
    }
    // ...
  ]
};
```

**Available `TripTag` values** (for trip card filters):

| Enum                     | Value             |
| ------------------------ | ----------------- |
| `TripTag.Beer`           | `beer`            |
| `TripTag.CherryBlossoms` | `cherry-blossoms` |
| `TripTag.Cities`         | `cities`          |
| `TripTag.CityBreak`      | `city-break`      |
| `TripTag.Cocktails`      | `cocktails`       |
| `TripTag.Fjords`         | `fjords`          |
| `TripTag.Food`           | `food`            |
| `TripTag.Hiking`         | `hiking`          |
| `TripTag.MidnightSun`    | `midnight-sun`    |
| `TripTag.Temples`        | `temples`         |
| `TripTag.Villages`       | `villages`        |
| `TripTag.Wilderness`     | `wilderness`      |

**Available `PhotoTag` values** (for gallery filters on the trip detail page):

`Architecture`, `Animals`, `Beer`, `Cocktail`, `Coffee`, `Cafe`, `Landscape`, `Food`, `Night`, `Portrait`, `Street`, `Detail`, `Nature`, `Water`, `Harbour`, `Mountain`, `Urban`, `Interior`, `Transport`, `Sunset`

To add a tag that doesn't exist yet, add it to the relevant enum in `src/lib/types/trip.ts`.

### 4. Register the trip

Open `src/lib/data/trips.ts` and import + add the new trip:

```ts
import { trip as norway2026 } from "../../content/trips/norway-2026/trip";
import { trip as iceland2027 } from "../../content/trips/iceland-2027/trip";

export const allTrips: Trip[] = [norway2026, iceland2027];
```

Trips appear on the listing page in the order they are listed in `allTrips`.

### 5. Verify

```sh
bun run lint
bun run test:unit
bun run build
```

Preview locally at `/travel/[your-trip-slug]` with `bun run preview`.

## Deployment

Deployed automatically to **Cloudflare Pages** on push to `main`.

- Build command: `bun run build`
- Output directory: `build`
- Security headers and cache rules are defined in `static/_headers`
