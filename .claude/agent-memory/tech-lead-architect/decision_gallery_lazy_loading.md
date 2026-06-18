---
name: decision-gallery-lazy-loading
description: ADR — image lazy-loading strategy for TripGallery; why "load all on DOMContentLoaded" was rejected
metadata:
  type: project
---

# Gallery lazy-loading strategy (reviewed 2026-06-18)

Decision context: TripGallery.svelte thumbnails use `loading="lazy" decoding="async"`. Fast-scroll-to-bottom leaves blank tiles because native lazy heuristic queues images only near viewport.

**Rejected:** "On DOMContentLoaded, force-load all unloaded lazy images."
**Why:** DCL fires before any scroll → every thumbnail is unloaded at that point → equivalent to eager-loading the whole gallery. Regresses hero LCP (thumbnails steal bandwidth + HTTP/2 connection slots from the LCP hero image) and wastes bytes for bounce traffic. Strictly worse than just deleting `loading="lazy"`.

**Recommended path (in order):**
1. Declarative baseline (do first, zero JS): first 1-2 rows `loading="eager" fetchpriority="low"`, rest stay `loading="lazy"`. Add `fetchpriority="high"` to hero image.
2. Only if testing still shows fling-scroll blank tiles: Svelte action `use:loadWhenNear` wrapping IntersectionObserver with `rootMargin: '800px 0px'`. MUST keep a real `src` in markup (not data-src) to preserve no-JS baseline of the static site.

**How to apply:** This is a prerendered static site — the no-JS baseline and hero LCP both matter. Prefer declarative/CSS solutions; reach for IntersectionObserver only when proven necessary. Never break the no-JS image baseline. Keep width/height + aspect-ratio:4/3 (CLS protection) and the onerror thumb→full→hide fallback chain intact under any change.
