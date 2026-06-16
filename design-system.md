# Travel Blog Design System & Component Specification

## 1. CSS Custom Properties / Design Tokens

Complete `:root {}` block for the global CSS file:

```css
/* ============================================================
   GLOBAL CSS CUSTOM PROPERTIES
   File: src/app.css (or src/styles/tokens.css)
   ============================================================ */

:root {
  /* ----------------------------------------------------------
     COLOR — Light Mode
     Using oklch() for perceptually uniform color manipulation
     ---------------------------------------------------------- */

  /* Base surfaces */
  --color-bg: oklch(98% 0.005 80); /* ~#FAFAF8 warm off-white */
  --color-bg-subtle: oklch(95.5% 0.008 80); /* ~#F0EEEB light neutral gray */
  --color-bg-muted: oklch(92% 0.01 80); /* slightly deeper for card hover */
  --color-surface: oklch(100% 0 0); /* pure white for cards */
  --color-surface-raised: oklch(99% 0.003 80); /* elevated card surface */

  /* Text */
  --color-text-primary: oklch(22% 0.01 60); /* ~#2D2D2D near-black */
  --color-text-secondary: oklch(46% 0.012 60); /* mid-tone for metadata */
  --color-text-tertiary: oklch(62% 0.01 60); /* placeholder, captions */
  --color-text-inverse: oklch(98% 0.005 80); /* text on dark backgrounds */

  /* Accent — Terracotta (primary) */
  --color-accent: oklch(58% 0.13 42); /* ~#C4703F terracotta */
  --color-accent-subtle: oklch(94% 0.025 42); /* tinted background */
  --color-accent-hover: oklch(52% 0.13 42); /* darker on hover */
  --color-accent-active: oklch(46% 0.13 42); /* pressed state */

  /* Accent — Deep Teal (secondary, for variety) */
  --color-teal: oklch(44% 0.08 195); /* ~#2A6F6F deep teal */
  --color-teal-subtle: oklch(94% 0.02 195);
  --color-teal-hover: oklch(38% 0.08 195);

  /* Borders & dividers */
  --color-border: oklch(89% 0.01 80); /* subtle dividers */
  --color-border-strong: oklch(78% 0.015 80); /* visible borders */
  --color-border-focus: oklch(58% 0.13 42); /* focus ring — matches accent */

  /* Semantic states */
  --color-error: oklch(52% 0.18 25);
  --color-success: oklch(52% 0.13 155);

  /* Overlays */
  --color-overlay: oklch(10% 0 0 / 0.85); /* lightbox backdrop */
  --color-overlay-light: oklch(10% 0 0 / 0.4); /* hero image scrim */

  /* ----------------------------------------------------------
     COLOR — Dark Mode
     ---------------------------------------------------------- */
  @media (prefers-color-scheme: dark) {
    --color-bg: oklch(14% 0.008 60);
    --color-bg-subtle: oklch(18% 0.01 60);
    --color-bg-muted: oklch(22% 0.01 60);
    --color-surface: oklch(18% 0.01 60);
    --color-surface-raised: oklch(22% 0.012 60);

    --color-text-primary: oklch(94% 0.008 80);
    --color-text-secondary: oklch(72% 0.01 80);
    --color-text-tertiary: oklch(56% 0.008 80);
    --color-text-inverse: oklch(14% 0.008 60);

    --color-accent: oklch(68% 0.13 42); /* slightly lighter for dark bg */
    --color-accent-subtle: oklch(22% 0.04 42);
    --color-accent-hover: oklch(74% 0.13 42);
    --color-accent-active: oklch(78% 0.13 42);

    --color-teal: oklch(60% 0.08 195);
    --color-teal-subtle: oklch(20% 0.03 195);
    --color-teal-hover: oklch(66% 0.08 195);

    --color-border: oklch(28% 0.012 60);
    --color-border-strong: oklch(38% 0.015 60);
    --color-border-focus: oklch(68% 0.13 42);

    --color-overlay: oklch(5% 0 0 / 0.9);
    --color-overlay-light: oklch(5% 0 0 / 0.55);
  }

  /* ----------------------------------------------------------
     TYPOGRAPHY
     ---------------------------------------------------------- */

  /* Font families */
  --font-serif: 'Lora', 'Georgia', 'Times New Roman', serif;
  --font-sans: 'Inter', 'system-ui', '-apple-system', 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* Type scale — fluid using clamp()
     Formula: clamp(min, preferred, max)
     Preferred uses viewport width for fluid scaling */
  --text-xs: clamp(0.694rem, 0.67rem + 0.12vw, 0.75rem); /* ~11–12px */
  --text-sm: clamp(0.833rem, 0.8rem + 0.17vw, 0.9rem); /* ~13–14.4px */
  --text-base: clamp(1rem, 0.96rem + 0.2vw, 1.063rem); /* ~16–17px */
  --text-md: clamp(1.125rem, 1.07rem + 0.28vw, 1.25rem); /* ~18–20px */
  --text-lg: clamp(1.266rem, 1.18rem + 0.43vw, 1.5rem); /* ~20–24px */
  --text-xl: clamp(1.424rem, 1.29rem + 0.67vw, 1.875rem); /* ~23–30px */
  --text-2xl: clamp(1.602rem, 1.4rem + 1.01vw, 2.25rem); /* ~26–36px */
  --text-3xl: clamp(1.802rem, 1.5rem + 1.51vw, 3rem); /* ~29–48px */
  --text-4xl: clamp(2.027rem, 1.6rem + 2.14vw, 3.75rem); /* ~32–60px */
  --text-hero: clamp(2.5rem, 1.8rem + 3.5vw, 5rem); /* ~40–80px */

  /* Font weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Line heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  --leading-loose: 1.9;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.08em;
  --tracking-widest: 0.15em;

  /* ----------------------------------------------------------
     SPACING SCALE
     Base unit: 0.25rem (4px). Scale is 4px-based.
     ---------------------------------------------------------- */
  --space-1: 0.25rem; /*  4px */
  --space-2: 0.5rem; /*  8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  --space-32: 8rem; /* 128px */

  /* Semantic spacing aliases */
  --space-xs: var(--space-2); /*  8px */
  --space-sm: var(--space-3); /* 12px */
  --space-md: var(--space-4); /* 16px */
  --space-lg: var(--space-6); /* 24px */
  --space-xl: var(--space-8); /* 32px */
  --space-2xl: var(--space-12); /* 48px */
  --space-3xl: var(--space-16); /* 64px */
  --space-4xl: var(--space-24); /* 96px */
  --space-section: var(--space-20); /* 80px — consistent section vertical padding */

  /* ----------------------------------------------------------
     LAYOUT
     ---------------------------------------------------------- */
  --width-content: 1200px;
  --width-prose: 72ch; /* optimal line length for reading */
  --width-narrow: 48ch;
  --width-wide: 1400px;

  /* Page padding (inline/horizontal gutters) */
  --gutter: clamp(var(--space-4), 5vw, var(--space-12));

  /* ----------------------------------------------------------
     BORDER RADIUS
     ---------------------------------------------------------- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;

  /* ----------------------------------------------------------
     SHADOWS
     ---------------------------------------------------------- */
  --shadow-xs: 0 1px 2px oklch(10% 0 0 / 0.06);
  --shadow-sm: 0 1px 4px oklch(10% 0 0 / 0.08), 0 1px 2px oklch(10% 0 0 / 0.05);
  --shadow-md: 0 4px 12px oklch(10% 0 0 / 0.08), 0 2px 4px oklch(10% 0 0 / 0.05);
  --shadow-lg: 0 8px 24px oklch(10% 0 0 / 0.1), 0 3px 8px oklch(10% 0 0 / 0.06);
  --shadow-xl: 0 16px 48px oklch(10% 0 0 / 0.12), 0 6px 16px oklch(10% 0 0 / 0.07);
  --shadow-card: var(--shadow-sm);
  --shadow-card-hover: var(--shadow-lg);

  /* ----------------------------------------------------------
     TRANSITIONS
     ---------------------------------------------------------- */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  --ease-default: cubic-bezier(0.16, 1, 0.3, 1); /* smooth ease-out */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Shorthand transition presets */
  --transition-color:
    color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);

  --transition-shadow: box-shadow var(--duration-normal) var(--ease-out);

  --transition-transform: transform var(--duration-normal) var(--ease-default);

  /* ----------------------------------------------------------
     Z-INDEX SCALE
     ---------------------------------------------------------- */
  --z-below: -1;
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-overlay: 200;
  --z-lightbox: 300;
  --z-toast: 400;
}
```

---

## 2. Typography Scale

### Google Fonts Import

```css
/* src/app.css — place at very top of file */

/* Lora: weights 400, 500, 600, 700 (normal + italic for body editorial use) */
/* Inter: weights 400, 500, 600 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
```

Note for developer: add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in `app.html` before the stylesheet link, and consider self-hosting fonts via `@fontsource` packages for better performance and privacy.

### Heading Styles

```css
/* Applied via base layer — these are defaults, not utility classes */

h1,
.h1 {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

h2,
.h2 {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

h3,
.h3 {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  color: var(--color-text-primary);
}

h4,
.h4 {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

/* Body text */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* Prose — longer-form article text gets slightly larger with generous leading */
.prose {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  max-width: var(--width-prose);
}

/* Small / caption / metadata */
small,
.text-sm {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.caption {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-tertiary);
}

/* Eyebrow label — used above hero titles */
.eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-accent);
}
```

---

## 3. Spacing & Grid System

### Responsive Breakpoints

```css
/*
  Breakpoint system — mobile-first
  ---
  xs:   0–479px      (small phones)
  sm:   480–767px    (large phones)
  md:   768–1023px   (tablets, portrait)
  lg:   1024–1279px  (tablets landscape, small desktop)
  xl:   1280px+      (desktop)

  Usage in CSS (not Tailwind — pure media queries):
    @media (min-width: 480px)  { ... }    sm
    @media (min-width: 768px)  { ... }    md
    @media (min-width: 1024px) { ... }    lg
    @media (min-width: 1280px) { ... }    xl
*/
```

### Centered Layout Container

```css
/* Reusable container component */
.container {
  width: 100%;
  max-width: var(--width-content);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.container--narrow {
  max-width: 800px;
}

.container--prose {
  max-width: var(--width-prose);
}

.container--wide {
  max-width: var(--width-wide);
}
```

### Grid System

```css
/*
  Trip card grid — used on Travel Index page
  Responsive: 1 col → 2 col → 3 col (optional, 2 preferred for large cards)
*/
.grid-trips {
  display: grid;
  grid-template-columns: 1fr; /* mobile: single column */
  gap: var(--space-8);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr); /* tablet+: two columns */
    gap: var(--space-10);
  }

  @media (min-width: 1024px) {
    gap: var(--space-12); /* desktop: wider gaps */
  }
}

/*
  Photo gallery grid — used in Trip Detail
*/
.grid-photos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }
}

/*
  Page-level section layout helper
*/
.section {
  padding-block: var(--space-section);
}

.section--sm {
  padding-block: var(--space-2xl);
}

.section--lg {
  padding-block: calc(var(--space-section) * 1.5);
}
```

---

## 4. Component Specifications

---

### 4.1 Header / Navigation

**Semantic HTML Structure**

```html
<!-- Header is sticky at top; aria-label distinguishes from other nav elements -->
<header class="site-header" role="banner">
  <div class="container">
    <nav class="site-nav" aria-label="Main navigation">
      <!-- Logo / site name — links to home -->
      <a href="/" class="site-nav__logo" aria-label="[Blog Name] — home">
        <span class="site-nav__logo-text">Wandering Pages</span>
      </a>

      <!-- Desktop nav links -->
      <ul class="site-nav__links" role="list">
        <li><a href="/" class="site-nav__link">Home</a></li>
        <li><a href="/travel" class="site-nav__link">Travel</a></li>
        <li><a href="/about" class="site-nav__link">About</a></li>
      </ul>

      <!-- Mobile hamburger button — hidden on desktop -->
      <!-- aria-expanded reflects menu open/closed state (toggled by Svelte) -->
      <!-- aria-controls matches the id of the mobile menu panel -->
      <button class="site-nav__hamburger" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
        <!-- Three-line icon rendered via CSS, or inline SVG -->
        <span class="hamburger-bar" aria-hidden="true"></span>
        <span class="hamburger-bar" aria-hidden="true"></span>
        <span class="hamburger-bar" aria-hidden="true"></span>
      </button>
    </nav>
  </div>

  <!-- Mobile slide-down menu panel -->
  <!-- hidden attribute removed by Svelte when open; inert when closed -->
  <div class="site-nav__mobile-menu" id="mobile-menu" hidden>
    <ul class="site-nav__mobile-links" role="list">
      <li><a href="/" class="site-nav__mobile-link">Home</a></li>
      <li><a href="/travel" class="site-nav__mobile-link">Travel</a></li>
      <li><a href="/about" class="site-nav__mobile-link">About</a></li>
    </ul>
  </div>
</header>
```

**CSS**

```css
/* ---- Header shell ---- */
.site-header {
  position: sticky;
  inset-block-start: 0; /* logical property: top: 0 */
  z-index: var(--z-sticky);
  background-color: var(--color-bg);

  /* Frosted glass effect — progressive enhancement */
  @supports (backdrop-filter: blur(12px)) {
    background-color: oklch(98% 0.005 80 / 0.85);
    backdrop-filter: blur(12px) saturate(180%);
  }

  border-block-end: 1px solid var(--color-border);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

/* Add shadow when page is scrolled (class toggled via Svelte scroll listener) */
.site-header.is-scrolled {
  box-shadow: var(--shadow-md);
}

/* ---- Nav row ---- */
.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  block-size: 4rem; /* 64px nav height */
  gap: var(--space-8);
}

/* ---- Logo ---- */
.site-nav__logo {
  text-decoration: none;
  flex-shrink: 0;
}

.site-nav__logo-text {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  transition: var(--transition-color);
}

.site-nav__logo:hover .site-nav__logo-text,
.site-nav__logo:focus-visible .site-nav__logo-text {
  color: var(--color-accent);
}

/* ---- Desktop links ---- */
.site-nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text-secondary);
  padding-block: var(--space-1);

  /* Underline animation via pseudo-element */
  position: relative;
  transition: var(--transition-color);
}

.site-nav__link::after {
  content: '';
  position: absolute;
  inset-block-end: -2px;
  inset-inline: 0;
  block-size: 2px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-normal) var(--ease-default);
}

.site-nav__link:hover,
.site-nav__link:focus-visible {
  color: var(--color-text-primary);
}

.site-nav__link:hover::after,
.site-nav__link:focus-visible::after,
.site-nav__link[aria-current='page']::after {
  transform: scaleX(1);
}

.site-nav__link[aria-current='page'] {
  color: var(--color-text-primary);
  font-weight: var(--weight-semibold);
}

/* ---- Hamburger button ---- */
.site-nav__hamburger {
  display: none; /* hidden on desktop */
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  inline-size: 44px; /* minimum 44px touch target */
  block-size: 44px;
  padding: var(--space-2);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-primary);
  transition:
    var(--transition-color),
    background-color var(--duration-fast) var(--ease-out);
}

.site-nav__hamburger:hover,
.site-nav__hamburger:focus-visible {
  background-color: var(--color-bg-subtle);
}

.site-nav__hamburger:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.hamburger-bar {
  display: block;
  inline-size: 22px;
  block-size: 2px;
  background-color: currentColor;
  border-radius: var(--radius-pill);
  transition:
    transform var(--duration-normal) var(--ease-default),
    opacity var(--duration-fast) var(--ease-out);
}

/* Hamburger → X animation when menu is open */
.site-nav__hamburger[aria-expanded='true'] .hamburger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.site-nav__hamburger[aria-expanded='true'] .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.site-nav__hamburger[aria-expanded='true'] .hamburger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ---- Mobile menu panel ---- */
.site-nav__mobile-menu {
  border-block-end: 1px solid var(--color-border);
  background-color: var(--color-bg);

  /* Animate open/close — Svelte should remove [hidden] and add .is-open */
  overflow: hidden;
  max-block-size: 0;
  opacity: 0;
  transition:
    max-block-size var(--duration-slow) var(--ease-out),
    opacity var(--duration-normal) var(--ease-out);
}

/* Developer note: Svelte removes [hidden] attribute; then JS adds .is-open to trigger transition */
.site-nav__mobile-menu:not([hidden]) {
  max-block-size: 300px; /* sufficient for 3–5 links */
  opacity: 1;
}

.site-nav__mobile-links {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: var(--space-4) 0 var(--space-6);
}

.site-nav__mobile-link {
  display: block;
  padding: var(--space-3) var(--gutter);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: var(--transition-color);
}

.site-nav__mobile-link:hover,
.site-nav__mobile-link:focus-visible {
  color: var(--color-accent);
  background-color: var(--color-accent-subtle);
}

.site-nav__mobile-link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: -2px;
}

/* ---- Responsive: show hamburger, hide desktop links on mobile ---- */
@media (max-width: 767px) {
  .site-nav__links {
    display: none;
  }
  .site-nav__hamburger {
    display: flex;
  }
}
```

**Accessibility Notes**

- `aria-expanded` on the hamburger button reflects menu state; Svelte must toggle this attribute.
- `aria-controls="mobile-menu"` links button to controlled element.
- When menu opens, move focus to the first link inside `#mobile-menu`.
- When menu closes (via Escape or clicking outside), return focus to the hamburger button.
- `aria-current="page"` is set by SvelteKit on the active nav link.
- Respect `prefers-reduced-motion` — the hamburger animation and mobile menu slide use transitions that are removed below.

```css
@media (prefers-reduced-motion: reduce) {
  .hamburger-bar,
  .site-nav__mobile-menu,
  .site-nav__link::after {
    transition: none;
  }
}
```

---

### 4.2 Footer

**HTML**

```html
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="site-footer__inner">
      <p class="site-footer__copy">
        <!-- Use <time> for the year if dynamically generated -->
        &copy; <time datetime="2026">2026</time> Wandering Pages. All rights reserved.
      </p>

      <nav class="site-footer__nav" aria-label="Footer navigation">
        <ul role="list">
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy</a></li>
        </ul>
      </nav>
    </div>
  </div>
</footer>
```

**CSS**

```css
.site-footer {
  background-color: var(--color-bg-subtle);
  border-block-start: 1px solid var(--color-border);
  padding-block: var(--space-8);
  margin-block-start: var(--space-section);
}

.site-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap; /* stacks on very small screens */
}

.site-footer__copy {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin: 0;
}

.site-footer__nav ul {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-footer__nav a {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-decoration: none;
  transition: var(--transition-color);
}

.site-footer__nav a:hover,
.site-footer__nav a:focus-visible {
  color: var(--color-accent);
}

.site-footer__nav a:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

---

### 4.3 Hero Component

Used on both the Landing Page (full-viewport) and the Trip Detail page (smaller).

**HTML**

```html
<!-- Landing page variant: role="region" with descriptive label -->
<section class="hero hero--landing" aria-label="Introduction">
  <!-- Background image: use a real <img> for LCP performance, not CSS background-image -->
  <!-- alt="" because this is a decorative atmospheric image; the h1 is the meaningful content -->
  <div class="hero__media" aria-hidden="true">
    <img
      class="hero__image"
      src="/images/hero-cover.jpg"
      srcset="/images/hero-cover-800.jpg 800w, /images/hero-cover-1600.jpg 1600w"
      sizes="100vw"
      alt=""
      width="1600"
      height="900"
      fetchpriority="high"
    />
    <!-- Gradient scrim for text contrast -->
    <div class="hero__scrim" aria-hidden="true"></div>
  </div>

  <div class="hero__content container">
    <span class="eyebrow">A personal travel journal</span>
    <h1 class="hero__title">Wandering Pages</h1>
    <p class="hero__tagline">Field notes, photographs, and stories from the road.</p>
    <a href="/travel" class="btn btn--primary">
      Explore Trips
      <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
    </a>
  </div>
</section>

<!-- Trip Detail variant — medium height, bottom-aligned text -->
<section class="hero hero--trip" aria-label="[Trip title] hero">
  <div class="hero__media" aria-hidden="true">
    <img class="hero__image" src="/images/trip-cover.jpg" alt="" width="1600" height="700" fetchpriority="high" />
    <div class="hero__scrim hero__scrim--bottom"></div>
  </div>
  <div class="hero__content container">
    <nav class="hero__breadcrumb" aria-label="Breadcrumb">
      <ol role="list">
        <li><a href="/travel">Travel</a></li>
        <li aria-current="page">Morocco 2025</li>
      </ol>
    </nav>
    <h1 class="hero__title">Sands & Souks: Morocco</h1>
    <div class="hero__meta">
      <span>Marrakech, Morocco</span>
      <span aria-hidden="true">·</span>
      <time datetime="2025-03-10/2025-03-24">10–24 March 2025</time>
    </div>
  </div>
</section>
```

**CSS**

```css
/* ---- Hero base ---- */
.hero {
  position: relative;
  display: grid; /* grid makes stacking children easy */
  grid-template-areas: 'stack';
  overflow: hidden;
  isolation: isolate;
}

/* Both media and content occupy the same grid cell — they stack */
.hero__media,
.hero__content {
  grid-area: stack;
}

/* ---- Image fills container, object-fit preserves composition ---- */
.hero__media {
  position: relative;
  z-index: var(--z-below);
}

.hero__image {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
}

/* ---- Scrim (gradient overlay for text contrast) ---- */
.hero__scrim {
  position: absolute;
  inset: 0;
  /* Full scrim — center-weighted for landing hero */
  background: linear-gradient(to bottom, oklch(10% 0 0 / 0.25) 0%, oklch(10% 0 0 / 0.5) 50%, oklch(10% 0 0 / 0.7) 100%);
}

/* Bottom-only scrim for trip detail hero */
.hero__scrim--bottom {
  background: linear-gradient(to bottom, transparent 30%, oklch(10% 0 0 / 0.75) 100%);
}

/* ---- Content area ---- */
.hero__content {
  position: relative;
  z-index: var(--z-raised);
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* text sits above bottom of hero */
  padding-block-end: var(--space-16);
  color: var(--color-text-inverse);
}

/* ---- Landing hero sizing ---- */
.hero--landing {
  block-size: min(100svh, 800px); /* full viewport height, max 800px */
  min-block-size: 560px;
}

.hero--landing .hero__content {
  justify-content: center; /* vertically centered for landing */
  align-items: flex-start;
  gap: var(--space-5);
  padding-block: var(--space-16);
}

/* ---- Trip hero sizing ---- */
.hero--trip {
  block-size: clamp(320px, 50svh, 560px);
}

.hero--trip .hero__content {
  gap: var(--space-3);
}

/* ---- Hero typography ---- */
.hero__title {
  font-family: var(--font-serif);
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: inherit;
  margin: 0;

  /* Text shadow for legibility over varied images */
  text-shadow: 0 2px 16px oklch(5% 0 0 / 0.4);
}

.hero__tagline {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: inherit;
  opacity: 0.92;
  max-width: 52ch;
  margin: 0;
  text-shadow: 0 1px 8px oklch(5% 0 0 / 0.3);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: inherit;
  opacity: 0.85;
}

/* ---- Breadcrumb ---- */
.hero__breadcrumb ol {
  display: flex;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--text-sm);
}

.hero__breadcrumb a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0.75;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.hero__breadcrumb a:hover,
.hero__breadcrumb a:focus-visible {
  opacity: 1;
}

/* ---- CTA button — defined here; see Button section ---- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  min-block-size: 44px; /* accessible touch target */
  min-inline-size: 44px;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-fast) var(--ease-default);
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.btn--primary:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn--primary:active {
  background-color: var(--color-accent-active);
  transform: translateY(0);
}

.btn--primary:focus-visible {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: var(--transition-color);
  }
  .btn:hover {
    transform: none;
  }
}
```

---

### 4.4 TripCard

**HTML**

```html
<!-- Article is correct here: each card represents a standalone blog post -->
<article class="trip-card">
  <a href="/travel/morocco-2025" class="trip-card__link" tabindex="-1" aria-hidden="true">
    <div class="trip-card__media">
      <img
        class="trip-card__image"
        src="/images/morocco-thumb.jpg"
        srcset="/images/morocco-thumb-400.jpg 400w, /images/morocco-thumb-800.jpg 800w"
        sizes="(min-width: 640px) 50vw, 100vw"
        alt="Mosaic archway in the Marrakech medina, early morning light"
        width="800"
        height="533"
        loading="lazy"
      />
    </div>
  </a>

  <div class="trip-card__body">
    <!-- Tag pills — rendered before the title for screen readers is fine here -->
    <div class="trip-card__tags" aria-label="Tags">
      <span class="tag-pill">Desert</span>
      <span class="tag-pill">Culture</span>
      <span class="tag-pill">Architecture</span>
    </div>

    <h2 class="trip-card__title">
      <!-- The <a> wraps the title text; aria-hidden on the image link avoids duplicate links -->
      <a href="/travel/morocco-2025" class="trip-card__title-link"> Sands &amp; Souks: Morocco </a>
    </h2>

    <div class="trip-card__meta">
      <span class="trip-card__destination">
        <!-- Inline SVG icon, aria-hidden -->
        <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16">
          <path d="M8 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 10.5c-3.5 0-6 1.5-6 2.5h12c0-1-2.5-2.5-6-2.5z" fill="currentColor" />
        </svg>
        Marrakech, Morocco
      </span>
      <time class="trip-card__date" datetime="2025-03-10/2025-03-24"> Mar 10 – Mar 24, 2025 </time>
    </div>

    <p class="trip-card__excerpt">
      Two weeks wandering the labyrinthine medinas, trekking the High Atlas, and watching the Sahara sun blaze orange over the dunes at Erg
      Chebbi.
    </p>
  </div>
</article>
```

**CSS**

```css
.trip-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  transition:
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-default),
    border-color var(--duration-fast) var(--ease-out);
}

.trip-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
}

/* Ensure the card link for the image covers the media area */
.trip-card__link {
  display: block;
  overflow: hidden; /* contain the scale transform on the image */
  line-height: 0; /* remove inline spacing below img */
}

/* ---- Image with locked 3:2 aspect ratio ---- */
.trip-card__media {
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.trip-card__image {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--duration-slow) var(--ease-out);
}

.trip-card:hover .trip-card__image {
  transform: scale(1.04);
}

/* ---- Card body ---- */
.trip-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  flex: 1; /* stretch body to fill available height */
}

/* ---- Tags row ---- */
.trip-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* ---- Title ---- */
.trip-card__title {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  margin: 0;
  letter-spacing: var(--tracking-tight);
}

.trip-card__title-link {
  color: var(--color-text-primary);
  text-decoration: none;
  transition: var(--transition-color);

  /* Extend click area to entire card — requires card to be position: relative */
  /* We DON'T use the full-card overlay trick to keep semantics clean */
}

.trip-card__title-link:hover,
.trip-card__title-link:focus-visible {
  color: var(--color-accent);
}

.trip-card__title-link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ---- Meta (destination + date) ---- */
.trip-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  align-items: center;
}

.trip-card__destination {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.trip-card__date {
  font-variant-numeric: tabular-nums;
}

/* ---- Excerpt ---- */
.trip-card__excerpt {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;

  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .trip-card,
  .trip-card__image {
    transition: var(--transition-color);
  }
  .trip-card:hover {
    transform: none;
  }
  .trip-card:hover .trip-card__image {
    transform: none;
  }
}
```

---

### 4.5 TagPill

**HTML**

```html
<!-- Static display pill (in card or detail page) -->
<span class="tag-pill">Desert</span>

<!-- Interactive filter pill (in TripFilters) -->
<!-- role="checkbox" because it's a multi-select toggle -->
<button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="false">Desert</button>

<!-- Active/selected state — aria-checked="true" is set by Svelte -->
<button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="true">Culture</button>
```

**CSS**

```css
.tag-pill {
  display: inline-flex;
  align-items: center;
  padding-block: var(--space-1);
  padding-inline: var(--space-3);
  border-radius: var(--radius-pill);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  white-space: nowrap;
  background-color: var(--color-bg-subtle);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);

  /* Remove default button styles when used as button */
  cursor: default;
  line-height: 1;
}

/* Interactive pill — adds pointer and transitions */
.tag-pill--interactive {
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
  min-block-size: 44px; /* touch target */
  padding-inline: var(--space-4);
}

.tag-pill--interactive:hover {
  background-color: var(--color-accent-subtle);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Active/selected state — matches aria-checked="true" */
.tag-pill--interactive[aria-checked='true'] {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.tag-pill--interactive[aria-checked='true']:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.tag-pill--interactive:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .tag-pill--interactive {
    transition: none;
  }
}
```

---

### 4.6 TripFilters

**HTML**

```html
<!-- fieldset groups the controls semantically; legend is screen-reader text -->
<section class="trip-filters" aria-label="Filter trips">
  <div class="trip-filters__inner container">
    <!-- Destination dropdown -->
    <div class="trip-filters__group">
      <label class="trip-filters__label" for="filter-destination"> Destination </label>
      <div class="trip-filters__select-wrap">
        <select class="trip-filters__select" id="filter-destination" name="destination">
          <option value="">All destinations</option>
          <option value="morocco">Morocco</option>
          <option value="japan">Japan</option>
          <option value="peru">Peru</option>
        </select>
        <!-- Custom chevron icon, aria-hidden -->
        <svg class="trip-filters__chevron" aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
      </div>
    </div>

    <!-- Tag pills filter group -->
    <!-- role="group" + aria-labelledby groups the checkboxes -->
    <div class="trip-filters__group trip-filters__group--tags" role="group" aria-labelledby="filter-tags-label">
      <span class="trip-filters__label" id="filter-tags-label">Tags</span>
      <div class="trip-filters__tags">
        <button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="false">Desert</button>
        <button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="false">Culture</button>
        <button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="true">Architecture</button>
        <button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="false">Hiking</button>
        <button class="tag-pill tag-pill--interactive" type="button" role="checkbox" aria-checked="false">Food</button>
      </div>
    </div>

    <!-- Sort toggle -->
    <div class="trip-filters__group trip-filters__group--sort">
      <label class="trip-filters__label" for="filter-sort">Sort by</label>
      <div class="trip-filters__sort">
        <!-- Using <select> for accessibility; custom styling below -->
        <select class="trip-filters__select" id="filter-sort" name="sort">
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="destination">Destination A–Z</option>
        </select>
        <svg class="trip-filters__chevron" aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Active filter summary for screen readers (updated by Svelte via aria-live) -->
  <div class="trip-filters__status" aria-live="polite" aria-atomic="true">
    <!-- Svelte injects: "Showing 4 of 12 trips" or "No trips match your filters" -->
  </div>
</section>
```

**CSS**

```css
.trip-filters {
  background-color: var(--color-bg-subtle);
  border-block: 1px solid var(--color-border);
  padding-block: var(--space-5);
  position: sticky;
  inset-block-start: 4rem; /* below the 64px nav */
  z-index: var(--z-raised);
}

.trip-filters__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-6);
}

.trip-filters__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.trip-filters__group--tags {
  flex: 1; /* tags group expands to fill available space */
  min-inline-size: 200px;
}

.trip-filters__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.trip-filters__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* ---- Custom select styling ---- */
.trip-filters__select-wrap,
.trip-filters__sort {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.trip-filters__select {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding-block: var(--space-2);
  padding-inline: var(--space-4) var(--space-10); /* right padding for chevron */
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  min-block-size: 44px;
  cursor: pointer;
  inline-size: 100%;
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.trip-filters__select:hover {
  border-color: var(--color-border-focus);
}

.trip-filters__select:focus-visible {
  outline: none; /* replaced by box-shadow */
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px oklch(58% 0.13 42 / 0.25);
}

.trip-filters__chevron {
  position: absolute;
  inset-inline-end: var(--space-3);
  pointer-events: none; /* don't intercept clicks on the select */
  color: var(--color-text-tertiary);
}

.trip-filters__status {
  /* Visually hidden but available to screen readers */
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive: stack on mobile */
@media (max-width: 767px) {
  .trip-filters {
    position: static; /* don't stick filters on mobile — too much space lost */
  }

  .trip-filters__inner {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }

  .trip-filters__select {
    inline-size: 100%;
  }
}
```

---

### 4.7 PhotoGrid

**HTML**

```html
<!-- In the Trip Detail page -->
<section class="photo-gallery section--sm" aria-labelledby="gallery-heading">
  <div class="container">
    <h2 class="h4" id="gallery-heading">Photo Gallery</h2>

    <!-- The grid itself -->
    <!-- role="list" restores list semantics removed by CSS in some browsers -->
    <ul class="photo-grid" role="list">
      <li class="photo-grid__item">
        <!-- The button triggers the lightbox -->
        <button class="photo-grid__trigger" type="button" aria-label="View photo: Camel caravan at sunset, Erg Chebbi" data-index="0">
          <img
            class="photo-grid__image"
            src="/images/photo-1-thumb.jpg"
            srcset="/images/photo-1-thumb-400.jpg 400w, /images/photo-1-600.jpg 600w"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            alt="Camel caravan silhouetted against orange dunes at sunset"
            width="600"
            height="400"
            loading="lazy"
          />
        </button>
      </li>

      <!-- Repeat for each photo -->
    </ul>
  </div>
</section>
```

**CSS**

```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.photo-grid__item {
  /* intentionally empty — layout handled by grid */
}

/* ---- The clickable trigger ---- */
.photo-grid__trigger {
  display: block;
  inline-size: 100%;
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 1 / 1; /* square thumbnails */
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

.photo-grid__trigger:hover {
  box-shadow: var(--shadow-lg);
}

.photo-grid__trigger:focus-visible {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 3px;
}

/* ---- Photo image inside trigger ---- */
.photo-grid__image {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  transition:
    transform var(--duration-slow) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.photo-grid__trigger:hover .photo-grid__image {
  transform: scale(1.06);
}

/* Overlay icon on hover — using pseudo-element */
.photo-grid__trigger::after {
  content: '';
  position: absolute;
  inset: 0;
  background: oklch(10% 0 0 / 0);
  transition: background-color var(--duration-normal) var(--ease-out);
  border-radius: var(--radius-md);
}

.photo-grid__trigger {
  position: relative; /* needed for ::after overlay */
}

.photo-grid__trigger:hover::after {
  background: oklch(10% 0 0 / 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .photo-grid__image,
  .photo-grid__trigger::after {
    transition: none;
  }
  .photo-grid__trigger:hover .photo-grid__image {
    transform: none;
  }
}
```

---

### 4.8 Lightbox

**HTML**

```html
<!-- Rendered in the DOM but hidden until triggered -->
<!-- role="dialog" + aria-modal tells screen readers this is a modal dialog -->
<!-- aria-labelledby references the current photo's caption (updated by Svelte) -->
<div class="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-caption" id="lightbox" hidden>
  <!-- Backdrop — clicking closes the lightbox -->
  <div class="lightbox__backdrop" aria-hidden="true"></div>

  <!-- Close button — top right corner -->
  <button class="lightbox__close" type="button" aria-label="Close photo viewer" autofocus>
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>

  <!-- Image container -->
  <figure class="lightbox__figure">
    <img class="lightbox__image" src="" alt="" id="lightbox-image" />
    <figcaption class="lightbox__caption" id="lightbox-caption">
      <!-- Svelte populates caption text here; aria-labelledby references this -->
      Camel caravan at sunset, Erg Chebbi
    </figcaption>
  </figure>

  <!-- Navigation arrows -->
  <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  </button>

  <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
      <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  </button>

  <!-- Photo counter -->
  <div class="lightbox__counter" aria-live="polite" aria-atomic="true">
    <!-- Svelte injects: "3 / 12" -->
  </div>
</div>
```

**CSS**

```css
/* ---- Lightbox shell ---- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-lightbox);
  display: grid;
  place-items: center;

  /* Entry animation state (hidden: opacity 0, pointer-events none) */
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-normal) var(--ease-out);
}

/* Open state — triggered by Svelte removing [hidden] AND adding .is-open */
/* Developer note: use two-step: remove [hidden] first (display change), then add .is-open
   on next animation frame to trigger transition */
.lightbox:not([hidden]) {
  /* display is restored but we still need opacity transition */
}

.lightbox.is-open {
  opacity: 1;
  pointer-events: auto;
}

/* ---- Backdrop ---- */
.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--color-overlay);
  z-index: var(--z-below);
}

/* ---- Figure (image + caption container) ---- */
.lightbox__figure {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  max-inline-size: min(90vw, 1200px);
  max-block-size: calc(100svh - 8rem); /* leave room for close btn and counter */
  margin: 0;

  /* Subtle entrance scale */
  transform: scale(0.95);
  transition: transform var(--duration-normal) var(--ease-default);
}

.lightbox.is-open .lightbox__figure {
  transform: scale(1);
}

/* ---- Image ---- */
.lightbox__image {
  display: block;
  max-inline-size: 100%;
  max-block-size: calc(100svh - 12rem);
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);

  /* Fade when image src changes (transition on opacity, Svelte toggles class) */
  transition: opacity var(--duration-fast) var(--ease-out);
}

.lightbox__image.is-loading {
  opacity: 0.4;
}

/* ---- Caption ---- */
.lightbox__caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: oklch(94% 0.008 80 / 0.85);
  text-align: center;
  max-inline-size: 60ch;
}

/* ---- Close button ---- */
.lightbox__close {
  position: absolute;
  inset-block-start: var(--space-4);
  inset-inline-end: var(--space-4);
  z-index: var(--z-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 44px;
  block-size: 44px;
  background-color: oklch(100% 0 0 / 0.15);
  color: var(--color-text-inverse);
  border: 1px solid oklch(100% 0 0 / 0.25);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-default);
}

.lightbox__close:hover {
  background-color: oklch(100% 0 0 / 0.25);
  transform: scale(1.1);
}

.lightbox__close:focus-visible {
  outline: 2px solid oklch(100% 0 0 / 0.8);
  outline-offset: 2px;
}

/* ---- Navigation arrows ---- */
.lightbox__nav {
  position: absolute;
  inset-block: 50%;
  transform: translateY(-50%);
  z-index: var(--z-raised);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 52px;
  block-size: 52px;
  background-color: oklch(100% 0 0 / 0.12);
  color: var(--color-text-inverse);
  border: 1px solid oklch(100% 0 0 / 0.2);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-default);
}

.lightbox__nav--prev {
  inset-inline-start: var(--space-4);
}

.lightbox__nav--next {
  inset-inline-end: var(--space-4);
}

.lightbox__nav:hover {
  background-color: oklch(100% 0 0 / 0.25);
}

.lightbox__nav--prev:hover {
  transform: translateY(-50%) translateX(-2px);
}
.lightbox__nav--next:hover {
  transform: translateY(-50%) translateX(2px);
}

.lightbox__nav:focus-visible {
  outline: 2px solid oklch(100% 0 0 / 0.8);
  outline-offset: 2px;
}

/* Disable arrows when at first/last photo (Svelte adds disabled attr) */
.lightbox__nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ---- Counter ---- */
.lightbox__counter {
  position: absolute;
  inset-block-end: var(--space-4);
  inset-inline: 0;
  text-align: center;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: oklch(94% 0.008 80 / 0.7);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}

/* ---- Reduced motion: skip scale animation, keep opacity ---- */
@media (prefers-reduced-motion: reduce) {
  .lightbox,
  .lightbox__figure,
  .lightbox__image,
  .lightbox__close,
  .lightbox__nav {
    transition: opacity var(--duration-fast) var(--ease-out);
  }
  .lightbox__figure {
    transform: none;
  }
  .lightbox.is-open .lightbox__figure {
    transform: none;
  }
  .lightbox__nav--prev:hover,
  .lightbox__nav--next:hover {
    transform: translateY(-50%);
  }
  .lightbox__close:hover {
    transform: none;
  }
}
```

**Accessibility Notes for Lightbox**

- When opened: remove `[hidden]`, then on next animation frame add `.is-open`. Move focus to the close button (it has `autofocus` within the dialog for programmatic focus).
- Trap focus within the lightbox while open using a focus trap. The tab cycle must include: Close button, Prev arrow, Next arrow.
- Listen for `Escape` key to close; `ArrowLeft` for previous; `ArrowRight` for next.
- When closed: restore focus to the `photo-grid__trigger` that opened it.
- `aria-live="polite"` on the counter announces photo changes to screen readers.
- `aria-modal="true"` on the dialog signals to screen readers that background content is inert — Svelte should also add `inert` to `<main>` and `<header>` when lightbox is open.

---

## 5. Animation & Transition Specifications

```css
/* ============================================================
   ANIMATION REFERENCE — all transitions used in the system
   ============================================================ */

/*
  HOVER EFFECTS
  ─────────────────────────────────────────────────────────────
  TripCard lift:
    transform: translateY(-3px)
    box-shadow: var(--shadow-sm) → var(--shadow-lg)
    duration: 250ms, ease: var(--ease-out)

  TripCard image zoom:
    transform: scale(1.04)
    duration: 400ms, ease: var(--ease-out)
    (slower than card lift — creates depth layering)

  Nav link underline:
    transform: scaleX(0) → scaleX(1), transform-origin: left
    duration: 250ms, ease: var(--ease-default)

  Button:
    transform: translateY(-1px) + box-shadow increase
    duration: 150ms, ease: var(--ease-out)

  Tag pill:
    background-color + color change only
    duration: 150ms, ease: var(--ease-out)

  Photo grid image zoom:
    transform: scale(1.06)
    duration: 400ms, ease: var(--ease-out)

  LIGHTBOX
  ─────────────────────────────────────────────────────────────
  Open:
    opacity: 0 → 1, duration: 250ms, ease: var(--ease-out)
    figure scale: 0.95 → 1.0, duration: 250ms, ease: var(--ease-default)
    Sequence: opacity and scale happen simultaneously

  Close:
    opacity: 1 → 0, duration: 250ms, ease: var(--ease-in)
    (no scale-down needed — just fade out)

  Image swap (prev/next):
    opacity: 1 → 0.4 (loading state), then 0.4 → 1 when src loaded
    duration: 150ms each direction

  FILTER TRANSITIONS
  ─────────────────────────────────────────────────────────────
  The trip grid items fade and shift when filters change.
  Svelte should apply these classes:

  Leaving card:
    .trip-card.is-leaving {
      opacity: 0;
      transform: scale(0.97);
      transition:
        opacity   200ms var(--ease-in),
        transform 200ms var(--ease-in);
    }

  Entering card:
    .trip-card.is-entering {
      opacity: 0;
      transform: scale(0.97);
    }
    .trip-card.is-visible {
      opacity: 1;
      transform: scale(1);
      transition:
        opacity   300ms var(--ease-out),
        transform 300ms var(--ease-default);
    }

  Staggered entry: Svelte applies animation-delay of index × 50ms
  on each entering card, up to max 300ms.

  MOBILE MENU
  ─────────────────────────────────────────────────────────────
  Open:
    max-block-size: 0 → 300px, opacity: 0 → 1
    duration: 400ms (height), 250ms (opacity)
    ease: var(--ease-out)

  Close:
    max-block-size: 300px → 0, opacity: 1 → 0
    duration: 300ms (height), 150ms (opacity)
    ease: var(--ease-in)
*/

/* Complete filter card transition CSS */
.trip-card {
  /* Base transition already defined on .trip-card */
}

.trip-card.is-leaving {
  opacity: 0;
  transform: scale(0.97) translateY(-2px);
  transition:
    opacity 200ms var(--ease-in),
    transform 200ms var(--ease-in);
  pointer-events: none;
}

.trip-card.is-entering {
  opacity: 0;
  transform: scale(0.97) translateY(4px);
  transition: none; /* snap to start state, no flicker */
}

.trip-card.is-visible {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    opacity 300ms var(--ease-out),
    transform 300ms var(--ease-default),
    /* preserve the hover transitions */ box-shadow var(--duration-normal) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .trip-card.is-leaving,
  .trip-card.is-entering,
  .trip-card.is-visible {
    transition: opacity 150ms var(--ease-out);
    transform: none;
  }
}
```

---

## 6. Page Layout Specifications

---

### 6.1 Landing Page (`/`)

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (sticky, 64px)                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO                                                        │
│  - Full-width, min(100svh, 800px) height                     │
│  - Background photo fills, object-fit: cover                 │
│  - Gradient scrim (dark overlay)                             │
│  - Centered content: eyebrow, h1, tagline, CTA button        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  RECENT TRIPS section (padding-block: 80px)                  │
│  - h2 "Recent Trips" left-aligned, serif                     │
│  - 2-column grid of TripCards (latest 2–3 trips)             │
│  - "View all trips →" link below grid                        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘
```

**HTML Structure**

```html
<!-- src/routes/+page.svelte -->
<svelte:head>
  <title>Wandering Pages — A Personal Travel Journal</title>
  <meta name="description" content="Field notes, photographs, and stories from the road.">
</svelte:head>

<!-- Skip link — MUST be the first focusable element on the page -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Header rendered by layout -->

<main id="main-content" tabindex="-1">

  <!-- 1. Hero -->
  <section class="hero hero--landing" aria-label="Introduction">
    <!-- ... hero content ... -->
  </section>

  <!-- 2. Recent Trips preview -->
  <section class="section recent-trips" aria-labelledby="recent-trips-heading">
    <div class="container">
      <header class="section-header">
        <h2 id="recent-trips-heading">Recent Trips</h2>
        <a href="/travel" class="section-header__link">
          View all
          <svg aria-hidden="true" focusable="false"><!-- arrow icon --></svg>
        </a>
      </header>
      <div class="grid-trips">
        <!-- 2–3 TripCard components -->
      </div>
    </div>
  </section>

</main>

<!-- Footer rendered by layout -->
```

**Additional CSS for Landing Page**

```css
/* ---- Section header row (title + "view all" link side by side) ---- */
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-block-end: var(--space-10);
}

.section-header__link {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  transition: var(--transition-color);
}

.section-header__link:hover {
  color: var(--color-accent-hover);
}

.section-header__link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ---- Skip link ---- */
.skip-link {
  position: absolute;
  inset-block-start: var(--space-4);
  inset-inline-start: var(--space-4);
  z-index: var(--z-toast);

  /* Hidden until focused */
  transform: translateY(-200%);
  opacity: 0;

  /* Styled when focused */
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  text-decoration: none;

  transition:
    transform var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.skip-link:focus-visible {
  transform: translateY(0);
  opacity: 1;
  outline: 3px solid var(--color-text-inverse);
  outline-offset: 2px;
}
```

---

### 6.2 Travel Index Page (`/travel`)

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (sticky, 64px)                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PAGE HEADER section (padding: 48px top, 32px bottom)        │
│  - h1 "Travel" (serif, large)                                │
│  - Subtext: "N trips across X countries"                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  TRIP FILTERS (sticky below nav at 64px)                     │
│  - Destination dropdown + Tag pills + Sort                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIP GRID section (padding-block: 64px)                     │
│  - 2-column grid of TripCards                                │
│                                                              │
│  EMPTY STATE (shown when 0 results)                          │
│  - Centered illustration + "No trips found" message          │
│  - "Clear filters" button                                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘
```

**HTML Structure**

```html
<!-- src/routes/travel/+page.svelte -->
<svelte:head>
  <title>Travel — Wandering Pages</title>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content" tabindex="-1">
  <!-- 1. Page header -->
  <header class="page-header section--sm">
    <div class="container">
      <h1 class="page-header__title">Travel</h1>
      <p class="page-header__sub">14 trips across 11 countries</p>
    </div>
  </header>

  <!-- 2. Filters (sticky) -->
  <TripFilters />

  <!-- 3. Trip grid -->
  <section class="section" aria-label="Trip results">
    <div class="container">
      <!-- Results count (announced to screen readers) -->
      <!-- aria-live tells SR when count changes after filtering -->
      <p class="results-count" aria-live="polite" aria-atomic="true">Showing 14 trips</p>

      <!-- Grid or empty state — Svelte conditionally renders one of these -->
      <div class="grid-trips">
        <!-- TripCard × N -->
      </div>

      <!-- Empty state -->
      <div class="empty-state" hidden aria-hidden="true">
        <!-- shown/hidden by Svelte -->
        <p class="empty-state__message">No trips match your filters.</p>
        <button class="btn btn--secondary" type="button">Clear all filters</button>
      </div>
    </div>
  </section>
</main>
```

**Additional CSS**

```css
/* ---- Page header ---- */
.page-header {
  background-color: var(--color-bg-subtle);
  border-block-end: 1px solid var(--color-border);
}

.page-header__title {
  font-size: var(--text-3xl);
  margin-block-end: var(--space-2);
}

.page-header__sub {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
}

/* ---- Results count ---- */
.results-count {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-block-end: var(--space-8);
}

/* ---- Empty state ---- */
.empty-state {
  text-align: center;
  padding-block: var(--space-4xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.empty-state__message {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Secondary button variant */
.btn--secondary {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn--secondary:hover {
  background-color: var(--color-accent-subtle);
}

.btn--secondary:focus-visible {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 3px;
}
```

---

### 6.3 Trip Detail Page (`/travel/[slug]`)

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (sticky, 64px)                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO (trip variant)                                         │
│  - clamp(320px, 50svh, 560px) height                         │
│  - Cover photo + bottom scrim                                │
│  - Breadcrumb, h1, destination + date meta                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIP META BAR (padding: 32px vertical)                      │
│  - Tag pills row                                             │
│  - Back link ← All Trips                                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIP NARRATIVE (padding-block: 48px)                        │
│  - max-width: 72ch (prose width), centered                   │
│  - Article prose: paragraphs, potentially subheadings        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PHOTO GALLERY section                                       │
│  - h2 "Photo Gallery"                                        │
│  - Full content-width PhotoGrid                              │
│  - Lightbox triggered on click                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  NEXT/PREV TRIP nav (padding-block: 64px)                    │
│  - prev ← [trip name] and [trip name] → next                 │
│  - Two-column flex layout                                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘
```

**HTML Structure**

```html
<!-- src/routes/travel/[slug]/+page.svelte -->
<svelte:head>
  <title>Sands & Souks: Morocco — Wandering Pages</title>
  <meta name="description" content="Two weeks wandering Morocco...">
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content" tabindex="-1">

  <!-- 1. Hero -->
  <section class="hero hero--trip" aria-label="Morocco trip hero">
    <!-- ... trip hero ... -->
  </section>

  <!-- 2. Trip metadata bar -->
  <div class="trip-meta-bar section--sm">
    <div class="container trip-meta-bar__inner">
      <a href="/travel" class="back-link">
        <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
          <path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        All Trips
      </a>
      <div class="trip-meta-bar__tags" aria-label="Trip tags">
        <span class="tag-pill">Desert</span>
        <span class="tag-pill">Culture</span>
        <span class="tag-pill">Architecture</span>
      </div>
    </div>
  </div>

  <!-- 3. Narrative prose -->
  <article class="trip-narrative section" aria-label="Trip narrative">
    <div class="container container--prose">
      <!-- Written content — paragraphs, subheadings, quotes etc. -->
      <div class="prose">
        <p>We landed in Marrakech at midnight...</p>
        <!-- ... -->
      </div>
    </div>
  </article>

  <!-- 4. Photo gallery -->
  <section class="photo-gallery section--sm" aria-labelledby="gallery-heading">
    <div class="container">
      <h2 class="h4" id="gallery-heading">Photo Gallery</h2>
      <!-- PhotoGrid component -->
    </div>
  </section>

  <!-- 5. Prev / Next navigation -->
  <nav class="trip-pagination section--sm" aria-label="Adjacent trips">
    <div class="container">
      <div class="trip-pagination__inner">
        <a href="/travel/japan-2024" class="trip-pagination__link trip-pagination__link--prev">
          <span class="trip-pagination__dir">Previous trip</span>
          <span class="trip-pagination__title">Tokyo in November</span>
        </a>
        <a href="/travel/peru-2025" class="trip-pagination__link trip-pagination__link--next">
          <span class="trip-pagination__dir">Next trip</span>
          <span class="trip-pagination__title">Andean Altitudes: Peru</span>
        </a>
      </div>
    </div>
  </nav>

</main>

<!-- Lightbox — rendered outside main, at end of body -->
<!-- Lightbox component -->
```

**Additional CSS**

```css
/* ---- Trip meta bar ---- */
.trip-meta-bar {
  border-block: 1px solid var(--color-border);
  background-color: var(--color-bg-subtle);
}

.trip-meta-bar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  flex-shrink: 0;
  transition: var(--transition-color);
  min-block-size: 44px;
}

.back-link:hover,
.back-link:focus-visible {
  color: var(--color-accent);
}

.back-link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.trip-meta-bar__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* ---- Prose styles ---- */
.prose > * + * {
  margin-block-start: var(--space-6);
}

.prose p {
  font-size: var(--text-md);
  line-height: var(--leading-loose);
}

.prose h2 {
  font-size: var(--text-2xl);
  margin-block-start: var(--space-12);
  margin-block-end: var(--space-4);
}

.prose h3 {
  font-size: var(--text-xl);
  margin-block-start: var(--space-10);
  margin-block-end: var(--space-3);
}

.prose blockquote {
  border-inline-start: 3px solid var(--color-accent);
  padding-inline-start: var(--space-6);
  margin-inline: 0;
  font-style: italic;
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.prose figure {
  margin-block: var(--space-10);
  margin-inline: 0;
}

.prose figcaption {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-align: center;
  margin-block-start: var(--space-3);
  font-style: italic;
}

/* ---- Trip pagination ---- */
.trip-pagination__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  border-block-start: 1px solid var(--color-border);
  padding-block-start: var(--space-8);
}

.trip-pagination__link {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-decoration: none;
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-default);
}

.trip-pagination__link:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.trip-pagination__link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 3px;
  border-radius: var(--radius-lg);
}

.trip-pagination__link--next {
  text-align: right;
}

.trip-pagination__dir {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-accent);
}

.trip-pagination__title {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
}

@media (max-width: 479px) {
  .trip-pagination__inner {
    grid-template-columns: 1fr;
  }
  .trip-pagination__link--next {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trip-pagination__link {
    transition:
      var(--transition-color),
      border-color var(--duration-fast) var(--ease-out);
  }
  .trip-pagination__link:hover {
    transform: none;
  }
}
```

---

## CSS Layer Architecture

The developer should organise all CSS into `@layer` blocks in the following order in `app.css`:

```css
@layer reset, tokens, base, components, utilities, overrides;

@layer reset {
  /* Modern CSS reset — box-sizing, margin resets, img display: block, etc. */
}

@layer tokens {
  /* All :root { } custom property definitions from Section 1 */
  /* @import for Google Fonts at the file top (outside layers) */
}

@layer base {
  /* HTML element defaults: body, h1–h4, p, a, button, ul, ol, figure, time, etc. */
  /* The .prose context styles */
}

@layer components {
  /* All component CSS: .site-header, .trip-card, .tag-pill, .hero, .lightbox, etc. */
  /* Ordered: Header → Footer → Hero → TripCard → TagPill → TripFilters
              → PhotoGrid → Lightbox → Buttons → Pagination */
}

@layer utilities {
  /* .container, .container--*, .section, .section--*, .grid-trips, .grid-photos */
  /* .skip-link, .visually-hidden */
}

@layer overrides {
  /* prefers-reduced-motion overrides */
  /* prefers-color-scheme dark overrides (if not using @media inside :root) */
  /* Print styles */
}
```

---

## Final Notes for the Developer

**SvelteKit-specific implementation guidance:**

1. Place the `<a href="#main-content" class="skip-link">` at the top of `src/routes/+layout.svelte`, before the header.
2. Manage `aria-current="page"` on nav links using SvelteKit's `$page.url.pathname` compared against each link's `href`.
3. The `is-scrolled` class on the header: use a Svelte `onMount` to attach a scroll listener and toggle the class.
4. For the lightbox, use Svelte 5 `$state` rune to manage open/closed state, current index, and photo array. Use a `<dialog>` element as an alternative to the `role="dialog"` div — the native `<dialog>` element with `.showModal()` handles focus trap and Escape key out of the box.
5. Filter transitions: use Svelte's `transition:` directives or the `animate:flip` directive for the card grid reordering.
6. The hamburger `aria-expanded` attribute: bind directly to the Svelte boolean state using `aria-expanded={menuOpen}`.
7. For Google Fonts, consider using the `@fontsource` npm packages (`@fontsource/lora`, `@fontsource/inter`) instead of the `<link>` approach for zero-network-dependency builds and better privacy.
