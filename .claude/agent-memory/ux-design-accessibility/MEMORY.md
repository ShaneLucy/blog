# UX / Design / Accessibility Agent Memory

## Project: Wandering Pages — Travel Blog

### Stack context
- SvelteKit 2 + Svelte 5 runes mode, TypeScript, pure CSS, Bun, adapter-static
- See main MEMORY.md for full stack details

### CSS architecture (src/app.css)
- Single global CSS file — no @layer used yet, flat structure
- All design tokens defined in :root (lines 107–313), dark mode tokens nested inside @media (prefers-color-scheme: dark) within :root
- Custom properties use oklch() colour space throughout
- Component CSS is appended to src/app.css (not in component <style> blocks) unless it is genuinely component-private
- Scoped <style> blocks used only for styles that cannot be applied globally (e.g., .hero__image-placeholder placeholder gradient specific to one page)

### Component conventions (confirmed in Phase 1)
- Header: src/lib/components/layout/Header.svelte
- Footer: src/lib/components/layout/Footer.svelte
- Layout wraps children in <main id="main-content">

### Svelte 5 / SvelteKit gotchas discovered
- NEVER add role="banner" to <header> or role="contentinfo" to <footer> — Svelte's a11y plugin (vite-plugin-svelte) treats these as hard errors ("Redundant role"), not warnings. Native elements carry implicit ARIA roles; explicit matching roles are flagged.
- aria-expanded must be passed as a string: aria-expanded={String(menuOpen)} — boolean attributes behave differently in Svelte 5
- hidden={!menuOpen} works correctly in Svelte 5 for toggling the HTML hidden attribute
- $effect() scroll listener: always call the handler once immediately (onScroll()) to capture the initial scroll state before any scroll event fires
- Focus management after menu open: use setTimeout(..., 0) to defer focus until after Svelte has removed the hidden attribute from the DOM

### Prerender / build configuration
- svelte.config.js has handleHttpError configured to warn (not throw) for /travel and /about routes — these are placeholder routes for later phases
- This config must be updated (or removed) once those routes exist in Phases 3–4
- Any new route linked from a prerendered page must either exist or be explicitly handled in handleHttpError

### Accessibility patterns established
- Skip-to-content link: NOT yet implemented (deferred from Phase 1 spec)
- Mobile menu: Escape key closes menu + returns focus to hamburger button
- Mobile menu open: focus moves to first link in #mobile-menu
- aria-current="page" on nav links driven by $derived($page.url.pathname)
- All interactive elements use :focus-visible (never :focus with outline: none)
- Hamburger bars use aria-hidden="true"; button carries the full aria-label

### Design tokens in use (key values)
- Accent colour (terracotta): --color-accent = oklch(58% 0.13 42) light / oklch(68% 0.13 42) dark
- Serif font: --font-serif = 'Lora', Georgia, serif
- Sans font: --font-sans = 'Inter', system-ui, sans-serif
- Hero type: --text-hero = clamp(2.5rem, 1.8rem + 3.5vw, 5rem)
- Section spacing: --space-section = var(--space-20) = 5rem
- Layout gutter: --gutter = clamp(1rem, 5vw, 3rem)
- Sticky z-index: --z-sticky = 100

### Photo detail page patterns (src/routes/travel/[slug]/[photoSlug]/+page.svelte)
- TripPhoto has both `alt` (required, functional/screen-reader text) and `caption` (optional, editorial display text)
- Visible title and page <title> should use `photo.caption ?? photo.alt` — never expose raw `photo.slug` to users
- alt text should NOT be used as a visible description paragraph; only render caption as body text
- Image should appear before the title/metadata block on a photo detail page (photo is primary content)
- Prev/next navigation must be unified into a single <nav> below the content — do NOT embed a "next" link inside the breadcrumb <nav>
- `photoIndex` is returned by the load function — use it for "N of M" counter in photo nav
- `srcToUse()` plain function anti-pattern — use `$derived` instead for image source fallback logic
- Arrow key navigation (ArrowLeft/ArrowRight) is expected UX for photo browsing; use `<svelte:window onkeydown>` as progressive enhancement
- Image wrapper needs `aspect-ratio: {photo.width} / {photo.height}` to prevent CLS before image loads
- `.back-link` and `.photo-nav__link` styles are duplicated across trip and photo-detail pages — promote to src/app.css as global classes

### Landmark / ARIA patterns
- <article> used for photo and trip detail pages — add aria-labelledby pointing to the <h1> id
- Breadcrumb <nav aria-label="Breadcrumb"> must only contain location/hierarchy links — never sequence navigation
- Photo sequence navigation should use <nav aria-label="Photo navigation"> separately from breadcrumb

### Phase status (mirrored from main MEMORY.md for quick reference)
- Phase 0: Foundation — COMPLETE
- Phase 1: Layout shell + landing page — COMPLETE (build passes)
- Phase 2: Image processing pipeline — COMPLETE
- Phase 3: Travel page + filtering — COMPLETE
- Phase 4: Trip detail page + photo detail — COMPLETE
- PLAN.md (A–D): Photo tags, error page, photo detail routes — COMPLETE
- Phase 5: Polish + testing — pending (review of photo detail page done)
