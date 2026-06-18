# Blog Implementation Plan

## 1. Current State Assessment

The project is a **fresh SvelteKit 2 scaffold** with Svelte 5 (runes mode).

| Aspect             | Status                                       |
| ------------------ | -------------------------------------------- |
| Framework          | SvelteKit 2 + Svelte 5, TypeScript 6, Vite 8 |
| Package manager    | Bun                                          |
| CSS/Styling        | Nothing installed — pure CSS                 |
| Routing            | Default `+page.svelte` + demo scaffolding    |
| Data layer         | None                                         |
| Image handling     | None                                         |
| Deployment adapter | `adapter-auto` (no target chosen)            |

---

## 2. Tech Stack

### Keep (already in place)

- **SvelteKit 2 / Svelte 5** — File-based routing, fast, small bundle, great DX.
- **TypeScript** — Type safety for trip data models.
- **Bun** — Fast installs and scripts.
- **Vite 8** — Already configured.
- **Playwright** — Keep for e2e tests.

### Add

| Tool                         | Purpose                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **@sveltejs/adapter-static** | Static site generation — deploy anywhere (GitHub Pages, Netlify, Cloudflare Pages) |
| **sharp**                    | EXIF stripping + image optimization at build time                                  |
| **vitest**                   | Unit testing for image pipeline and data utilities                                 |

### Explicitly NOT adding

- No Tailwind — pure CSS with custom properties
- No CMS — trip data lives in TypeScript files
- No database — static data files

---

## 3. Image Storage Strategy

**Decision: Static assets in the repo.**

Processed images live in `static/images/trips/` and are served by the static site host.

| Pros                                        | Cons                                          |
| ------------------------------------------- | --------------------------------------------- |
| Zero runtime cost, no external dependencies | Repo size grows with images                   |
| No API keys or third-party accounts         | Git operations slow with many large images    |
| Works offline, full version control         | Must run build-time script when adding photos |
| Fastest possible delivery (CDN edge)        |                                               |

**Mitigation**: Use Git LFS if repo exceeds ~500MB. Keep source images outside the repo; only commit processed/optimized versions.

---

## 4. EXIF Metadata Stripping

Build-time preprocessing pipeline using **sharp**:

```
[Raw photos] --> [scripts/process-images.ts] --> [Optimized, EXIF-stripped images in static/]
```

The script will:

1. Read images from `src/content/trips/[trip-name]/raw/`
2. Strip ALL EXIF metadata (GPS coordinates, device info, timestamps, camera settings)
3. Resize to web-appropriate dimensions (max 2400px wide; 400px thumbnails)
4. Convert to WebP format
5. Output to `static/images/trips/[trip-name]/`

**Key detail**: sharp's `.rotate()` (no arguments) applies EXIF orientation then strips metadata. Omit `.withMetadata()` to ensure no EXIF survives.

Add a unit test that processes a sample image with known GPS data and verifies the output has none.

---

## 5. Data Model

### Type definitions — `src/lib/types/trip.ts`

```typescript
export interface TripPhoto {
  filename: string; // "beach-sunset.webp"
  alt: string; // Accessibility description
  caption?: string; // Optional display caption
  width: number; // For layout / aspect ratio
  height: number;
}

export interface Trip {
  slug: string; // URL-friendly: "japan-2024"
  title: string; // "Two Weeks in Japan"
  destination: string;
  region?: string; // Optional grouping, e.g. "East Asia"
  dates: {
    start: string; // "2024-03-15" ISO date
    end: string; // "2024-03-29"
  };
  tags: string[]; // ["temples", "food", "hiking"]
  coverPhoto: string; // filename of hero image
  description: string;
  body?: string; // Longer narrative
  photos: TripPhoto[];
}
```

### Example trip file — `src/content/trips/japan-2024/trip.ts`

```typescript
import type { Trip } from '$lib/types/trip';

export const trip: Trip = {
  slug: 'japan-2024',
  title: 'Two Weeks in Japan',
  destination: 'Japan',
  region: 'East Asia',
  dates: { start: '2024-03-15', end: '2024-03-29' },
  tags: ['temples', 'food', 'hiking', 'cherry-blossoms'],
  coverPhoto: 'fushimi-inari.webp',
  description: 'Exploring Tokyo, Kyoto, and the Japanese Alps.',
  photos: [
    {
      filename: 'fushimi-inari.webp',
      alt: 'Fushimi Inari shrine gates',
      width: 2400,
      height: 1600
    },
    { filename: 'ramen-shop.webp', alt: 'Bowl of tonkotsu ramen', width: 2400, height: 1800 }
  ]
};
```

### Trip aggregation — `src/lib/data/trips.ts`

```typescript
import { trip as japan2024 } from '../../content/trips/japan-2024/trip';
import { trip as iceland2023 } from '../../content/trips/iceland-2023/trip';

export const allTrips: Trip[] = [japan2024, iceland2023];

export const allDestinations = [...new Set(allTrips.map((t) => t.destination))].sort();
export const allTags = [...new Set(allTrips.flatMap((t) => t.tags))].sort();
```

---

## 6. Filtering and Sorting

Client-side filtering using Svelte 5 `$state` / `$derived`. URL search params drive filter state for shareable/bookmarkable URLs.

### Filter controls

- **Destination dropdown** — populated from `allDestinations`
- **Tag pills** — multi-select, populated from `allTags`
- **Sort** — date (newest first, default) or destination (alphabetical)

### Implementation pattern

```typescript
let selectedDestination = $state('');
let selectedTags = $state<string[]>([]);
let sortBy = $state<'date' | 'destination'>('date');

let filteredTrips = $derived(
  allTrips
    .filter((t) => !selectedDestination || t.destination === selectedDestination)
    .filter((t) => selectedTags.length === 0 || selectedTags.every((tag) => t.tags.includes(tag)))
    .sort((a, b) =>
      sortBy === 'date' ? new Date(b.dates.start).getTime() - new Date(a.dates.start).getTime() : a.destination.localeCompare(b.destination)
    )
);
```

---

## 7. Project Structure

```
blog/
  src/
    app.html
    app.css                         # Global styles + CSS custom properties
    app.d.ts
    lib/
      types/
        trip.ts                     # Trip, TripPhoto interfaces
      data/
        trips.ts                    # Trip registry + derived filter data
      components/
        layout/
          Header.svelte             # Site navigation
          Footer.svelte
          Nav.svelte
        travel/
          TripCard.svelte           # Trip preview card
          TripGallery.svelte        # Photo gallery/lightbox
          TripFilters.svelte        # Filter controls
          PhotoGrid.svelte          # Responsive photo grid
        shared/
          ImageOptimized.svelte     # Responsive <picture> wrapper
          TagPill.svelte            # Reusable tag/chip
          Hero.svelte               # Hero section
      utils/
        filters.ts                  # Filter/sort logic (pure functions)
    content/
      trips/
        japan-2024/
          trip.ts
          raw/                      # Source images (gitignored)
        iceland-2023/
          trip.ts
          raw/
    routes/
      +layout.svelte                # Root layout
      +page.svelte                  # Landing page
      travel/
        +page.svelte                # Travel index (all trips + filters)
        +page.ts                    # Load function
        [slug]/
          +page.svelte              # Trip detail
          +page.ts
  static/
    images/
      trips/
        japan-2024/                 # Processed images (EXIF stripped)
        iceland-2023/
    robots.txt
    favicon.svg
  scripts/
    process-images.ts               # EXIF strip + resize + WebP pipeline
  tests/
    e2e/
      landing.spec.ts
      travel.spec.ts
    unit/
      process-images.test.ts        # Verify EXIF stripping
      filters.test.ts
  design-system.md                  # UX design spec (CSS tokens, components)
  implementation-plan.md            # This file
```

---

## 8. Implementation Phases

### Phase 0: Foundation

**Goal**: Dev environment fully ready.

- [ ] Install `@sveltejs/adapter-static`, `sharp`, `vitest`
- [ ] Switch adapter in `svelte.config.js` to `adapter-static` with `prerender: { default: true }`
- [ ] Add vitest config to `vite.config.ts`
- [ ] Remove demo routes (`src/routes/demo/`)
- [ ] Define TypeScript interfaces in `src/lib/types/trip.ts`
- [ ] Set up `src/app.css` with CSS custom properties from `design-system.md`
- [ ] Add `**/raw/` to `.gitignore`

### Phase 1: Layout Shell and Landing Page

**Goal**: Working, styled site with navigation.

- [ ] Build `Header.svelte`, `Footer.svelte`, `Nav.svelte`
- [ ] Update `+layout.svelte` to use layout shell
- [ ] Build landing page with hero section, intro, CTA to travel page
- [ ] Implement responsive navigation (mobile hamburger menu)
- [ ] Apply design tokens (colors, typography, spacing) from `design-system.md`

### Phase 2: Image Processing Pipeline

**Goal**: Automated, tested EXIF stripping and image optimization.

- [ ] Write `scripts/process-images.ts` using sharp
- [ ] Read from `content/trips/*/raw/`, strip EXIF, resize, convert to WebP, output to `static/images/trips/*/`
- [ ] Generate thumbnail variants (400px wide)
- [ ] Add verification logging (confirm zero EXIF on output)
- [ ] Add `process-images` script to `package.json`
- [ ] Write unit tests verifying EXIF data is fully removed

### Phase 3: Travel Page — Trip Index with Filtering

**Goal**: Browsable, filterable travel page.

- [ ] Create sample trip data files (at least 2 trips with placeholder images)
- [ ] Build `src/lib/data/trips.ts` aggregation module
- [ ] Build travel index page (`src/routes/travel/+page.svelte`)
- [ ] Implement `TripFilters.svelte` (destination dropdown, tag pills, sort toggle)
- [ ] Implement `TripCard.svelte` (cover photo, title, destination, date, tags)
- [ ] Wire up reactive filtering with `$state` / `$derived`
- [ ] Sync filter state to URL search params
- [ ] Responsive grid layout for trip cards

### Phase 4: Trip Detail Page

**Goal**: Individual trip pages with photo galleries.

- [ ] Build trip detail route (`src/routes/travel/[slug]/+page.svelte`)
- [ ] Build `TripGallery.svelte` — responsive photo grid
- [ ] Build lightbox (click to view full-size, keyboard nav: Escape/arrows)
- [ ] Display trip narrative/description
- [ ] Back-navigation to travel index
- [ ] Lazy-load images below the fold

### Phase 5: Polish and Testing

**Goal**: Production-ready quality.

- [x] Accessibility audit (alt text, keyboard navigation, focus management, color contrast)
- [x] SEO: meta tags, Open Graph per page
- [ ] Performance: Lighthouse score, image sizes, lazy loading
  - **5.3a ✅ — Switch to Fontsource variable fonts** (WOFF2, all weights in one file each)
    - Installed `@fontsource-variable/inter` and `@fontsource-variable/lora`
    - Replaced all `@font-face` blocks in `src/app.css` with `@import '@fontsource-variable/inter'` and `@import '@fontsource-variable/lora'`
    - Updated `--font-sans` → `'Inter Variable'` and `--font-serif` → `'Lora Variable'`
    - Deleted `static/fonts/` directory
    - Vite bundles and hashes the WOFF2 files; `<link rel="preload">` not needed (browser-hint via CSS)
  - **5.3b ✅ — Add `<meta name="theme-color">`** to `src/app.html` (light `#faf9f8` / dark `#231f1c`)
  - **5.3e ✅ — Run Lighthouse** — Landing: 98/100/100/100, Travel: 97/100/100/100
    - Fixed: favicon 404 (added `static/favicon.svg` + `<link rel="icon">` in app.html) → best-practices 96→100
    - Fixed: heading-order H1→H3 skip in TripCard (changed to H2) → a11y 98→100 on travel
    - Fixed: first trip card had `loading=lazy` — added `priority` prop (eager + fetchpriority=high)
    - Remaining: FCP ~1.9s (just above 1.8s threshold) from CSS→font loading chain; render-blocking CSS is inherent to SvelteKit; both non-actionable at this stage
  - **5.3c ✅ — Add `<link rel="prefetch">` for `/travel`** on homepage `<svelte:head>`
  - **5.3d — Pre-compression** (deferred — implement after deployment target is chosen)
- [ ] Write Playwright e2e tests (landing, travel index filtering, trip detail)
- [ ] Cross-browser check (Chrome, Firefox, Safari)
- [ ] Choose deployment target and configure adapter

---

## 9. Key Technical Decisions

| Decision                      | Choice           | Trade-off                                                                                             |
| ----------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| Static site generation        | `adapter-static` | Cannot do server-side dynamic content; acceptable for a personal blog. Zero hosting cost.             |
| Trip data in TypeScript files | Yes              | Adding a trip requires editing code + re-deploying. Fine for a solo dev blog.                         |
| EXIF stripping at build time  | Yes (sharp)      | Must run script when adding photos. Mitigated by adding to build pipeline.                            |
| Images as static assets       | Yes              | Repo grows with photos. Mitigated by WebP optimization; Git LFS if needed.                            |
| Client-side filtering         | Yes              | All trip data shipped to client. Fine for dozens of trips.                                            |
| Pure CSS                      | Yes              | No framework lock-in. CSS custom properties for the design system.                                    |
| No CMS                        | Yes              | If non-technical collaborators ever needed, revisit. For a solo blog, file-based content is superior. |
