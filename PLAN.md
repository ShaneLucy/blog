# Implementation Plan: Photo Tags, Error Page & Photo Detail Routes

## Summary of decisions
- Photo-level labels are called **tags** (not slugs); trip-level tags remain unchanged
- `PhotoTag` is a TypeScript enum for type safety
- Photo filter logic: **OR** (show photos matching any selected tag)
- Photo detail: **dedicated static routes** at `/travel/[tripSlug]/[photoSlug]`
- Lightbox: **removed** — gallery items become `<a>` links to the dedicated route
- Norway placeholder filenames left as-is for now (slugs added explicitly)

---

## Data model changes (`src/lib/types/trip.ts`)

Add `PhotoTag` enum:

```typescript
export enum PhotoTag {
    Architecture = 'architecture',
    Landscape    = 'landscape',
    Food         = 'food',
    Night        = 'night',
    Portrait     = 'portrait',
    Street       = 'street',
    Detail       = 'detail',
    Nature       = 'nature',
    Water        = 'water',
    Urban        = 'urban',
    Interior     = 'interior',
    Transport    = 'transport',
}
```

Update `TripPhoto` interface:

```typescript
export interface TripPhoto {
    slug: string;       // URL-safe ID within the trip, e.g. "fushimi-inari"
    filename: string;
    alt: string;
    caption?: string;
    tags?: PhotoTag[];  // photo-level tags (separate taxonomy from Trip.tags)
    width: number;
    height: number;
}
```

`Trip` interface unchanged — trip-level tags remain `string[]`.

---

## Phase A — Data model (foundation)

1. Add `PhotoTag` enum + update `TripPhoto` in `src/lib/types/trip.ts`
2. Add `slug` and `tags` to every photo in `src/content/trips/japan-2024/trip.ts`
3. Add `slug` and `tags` to every photo in `src/content/trips/norway-2026/trip.ts`
4. Add `allPhotoTags` export to `src/lib/data/trips.ts`

---

## Phase B — Error page (independent, quick win)

1. Create `src/routes/+error.svelte`
   - Message: "There is a problem with this website"
   - Show `$page.status` and `$page.error?.message`
   - Include a "Go home" link
   - Note: with `adapter-static`, true 404 handling depends on the hosting platform serving the fallback HTML

---

## Phase C — Photo detail routes

1. Create `src/routes/travel/[slug]/[photoSlug]/+page.ts`
   - `load()` — find trip by slug, find photo by photoSlug, error(404) if not found
   - `entries()` — enumerate all trip × photo combinations for static prerender

2. Create `src/routes/travel/[slug]/[photoSlug]/+page.svelte`
   - Full-size image
   - Caption and tags
   - Prev / next navigation links (adjacent photos in the trip, works without JS)
   - Link back to the trip page

3. Update `svelte.config.js` `handleHttpError` to silence `/travel/[slug]/[photoSlug]` 404s during prerender

4. Update `src/lib/components/travel/TripGallery.svelte`
   - Remove lightbox entirely
   - Gallery grid items become `<a href="/travel/[tripSlug]/[photoSlug]">` links
   - Gallery still renders the filtered set (Phase D), navigation goes to dedicated pages

---

## Phase D — Photo tag filtering on trip gallery

1. Update `TripGallery.svelte`
   - Compute `availableTags` via `$derived` from the photos prop
   - Add `selectedTags` state (string array)
   - Add `filteredPhotos` derived (OR logic — photo included if it has any selected tag; if no tags selected, show all)
   - Render tag toggle buttons above the grid using `.tag-pill--toggle`
   - Add a "Filter photos" label above the filter bar (styled like `.filters__label`)

2. Visual distinction between trip tags and photo tags is structural:
   - Trip tags: static `.tag-pill` elements in the page header (not interactive)
   - Photo tags: interactive `.tag-pill--toggle` buttons in the gallery section

---

## Files changed in total

| File | Change |
|------|--------|
| `src/lib/types/trip.ts` | Add `PhotoTag` enum; add `slug`, `tags` to `TripPhoto` |
| `src/content/trips/japan-2024/trip.ts` | Add `slug` + `tags` to each photo |
| `src/content/trips/norway-2026/trip.ts` | Add `slug` + `tags` to each photo |
| `src/lib/data/trips.ts` | Add `allPhotoTags` export |
| `src/routes/+error.svelte` | New — generic error page |
| `src/routes/travel/[slug]/[photoSlug]/+page.ts` | New — load + entries |
| `src/routes/travel/[slug]/[photoSlug]/+page.svelte` | New — photo detail page |
| `src/lib/components/travel/TripGallery.svelte` | Remove lightbox; add tag filter bar; items become links |
| `svelte.config.js` | Silence photo route prerender 404s |
