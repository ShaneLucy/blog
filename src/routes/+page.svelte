<script lang="ts">
  import { resolve } from "$app/paths";
  import { SITE_NAME, SITE_URL } from "$lib/config";

  const description = "A personal travel journal — field notes, photographs, and stories from the road.";
</script>

<svelte:head>
  <title>Wandering Pages</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content="Wandering Pages" />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={`${SITE_URL}/`} />
  <meta name="twitter:card" content="summary" />
  <link rel="canonical" href={`${SITE_URL}/`} />
  <link rel="prefetch" href={resolve("/travel")} />
</svelte:head>

<!-- Hero -->
<section class="hero hero--landing" aria-label="Introduction">
  <div class="hero__media" aria-hidden="true">
    <svg
      style="display: block"
      width="100%"
      height="100%"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stop-color="oklch(15% 0.06 265)" />
          <stop offset="45%" stop-color="oklch(17% 0.07 275)" />
          <stop offset="75%" stop-color="oklch(20% 0.09 35)" />
          <stop offset="100%" stop-color="oklch(26% 0.11 42)" />
        </linearGradient>
        <radialGradient id="h-glow" cx="50%" cy="95%" r="55%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stop-color="oklch(40% 0.14 38)" stop-opacity="0.45" />
          <stop offset="100%" stop-color="oklch(20% 0.05 40)" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="h-mtn-far" gradientUnits="userSpaceOnUse" x1="0" y1="172" x2="0" y2="600">
          <stop offset="0%" stop-color="oklch(26% 0.06 255)" />
          <stop offset="100%" stop-color="oklch(22% 0.05 250)" />
        </linearGradient>
        <linearGradient id="h-mtn-mid" gradientUnits="userSpaceOnUse" x1="0" y1="348" x2="0" y2="600">
          <stop offset="0%" stop-color="oklch(19% 0.05 248)" />
          <stop offset="100%" stop-color="oklch(15% 0.04 245)" />
        </linearGradient>
        <linearGradient id="h-mtn-near" gradientUnits="userSpaceOnUse" x1="0" y1="455" x2="0" y2="600">
          <stop offset="0%" stop-color="oklch(13% 0.03 242)" />
          <stop offset="100%" stop-color="oklch(9% 0.02 240)" />
        </linearGradient>
      </defs>

      <rect width="1440" height="600" fill="url(#h-sky)" />
      <rect width="1440" height="600" fill="url(#h-glow)" />

      <g fill="white">
        <circle cx="72" cy="28" r="1.2" opacity="0.90" />
        <circle cx="145" cy="42" r="0.8" opacity="0.60" />
        <circle cx="231" cy="18" r="1.0" opacity="0.80" />
        <circle cx="318" cy="35" r="0.7" opacity="0.50" />
        <circle cx="412" cy="22" r="1.3" opacity="0.90" />
        <circle cx="508" cy="48" r="0.9" opacity="0.70" />
        <circle cx="634" cy="15" r="1.1" opacity="0.80" />
        <circle cx="721" cy="38" r="0.7" opacity="0.60" />
        <circle cx="845" cy="25" r="1.2" opacity="0.90" />
        <circle cx="968" cy="44" r="0.8" opacity="0.50" />
        <circle cx="1089" cy="20" r="1.0" opacity="0.80" />
        <circle cx="1176" cy="36" r="1.3" opacity="0.70" />
        <circle cx="1312" cy="28" r="0.9" opacity="0.90" />
        <circle cx="1398" cy="15" r="0.7" opacity="0.60" />
        <circle cx="38" cy="72" r="0.8" opacity="0.50" />
        <circle cx="182" cy="88" r="1.1" opacity="0.80" />
        <circle cx="295" cy="65" r="0.9" opacity="0.70" />
        <circle cx="445" cy="95" r="1.2" opacity="0.90" />
        <circle cx="567" cy="78" r="0.8" opacity="0.60" />
        <circle cx="688" cy="68" r="1.0" opacity="0.80" />
        <circle cx="789" cy="92" r="0.7" opacity="0.50" />
        <circle cx="912" cy="75" r="1.3" opacity="0.90" />
        <circle cx="1034" cy="88" r="0.9" opacity="0.70" />
        <circle cx="1155" cy="64" r="0.8" opacity="0.60" />
        <circle cx="1267" cy="90" r="1.1" opacity="0.80" />
        <circle cx="1421" cy="78" r="0.9" opacity="0.70" />
        <circle cx="95" cy="128" r="0.9" opacity="0.70" />
        <circle cx="228" cy="145" r="1.0" opacity="0.80" />
        <circle cx="378" cy="118" r="0.8" opacity="0.50" />
        <circle cx="521" cy="158" r="1.2" opacity="0.90" />
        <circle cx="672" cy="132" r="0.7" opacity="0.60" />
        <circle cx="815" cy="148" r="1.1" opacity="0.80" />
        <circle cx="945" cy="120" r="0.9" opacity="0.70" />
        <circle cx="1102" cy="155" r="0.8" opacity="0.60" />
        <circle cx="1245" cy="128" r="1.0" opacity="0.80" />
        <circle cx="1389" cy="142" r="0.7" opacity="0.50" />
        <circle cx="155" cy="185" r="0.8" opacity="0.40" />
        <circle cx="342" cy="172" r="0.7" opacity="0.30" />
        <circle cx="578" cy="195" r="0.9" opacity="0.40" />
        <circle cx="756" cy="168" r="0.8" opacity="0.40" />
        <circle cx="992" cy="178" r="0.7" opacity="0.30" />
        <circle cx="1198" cy="190" r="0.9" opacity="0.40" />
      </g>

      <path
        d="M0 600 L0 290 L90 265 L180 280 L260 240 L350 258 L450 220 L540 242 L620 200 L720 172 L820 202 L900 228 L1000 193 L1090 222 L1180 238 L1280 212 L1380 252 L1440 268 L1440 600 Z"
        fill="url(#h-mtn-far)"
      />
      <path
        d="M0 600 L0 430 L100 405 L200 420 L300 385 L400 408 L500 372 L600 398 L720 348 L840 382 L940 358 L1040 388 L1140 368 L1240 392 L1340 372 L1440 398 L1440 600 Z"
        fill="url(#h-mtn-mid)"
      />
      <path
        d="M0 600 L0 500 L120 478 L250 494 L380 462 L520 480 L660 455 L800 470 L940 458 L1080 475 L1220 462 L1360 478 L1440 468 L1440 600 Z"
        fill="url(#h-mtn-near)"
      />
    </svg>
    <div class="hero__scrim" aria-hidden="true"></div>
  </div>
  <div class="hero__content container">
    <span class="eyebrow">A personal travel journal</span>
    <h1 class="hero__title">Wandering Pages</h1>
    <p class="hero__tagline">Field notes, photographs, and stories from the road.</p>
    <a href={resolve("/travel")} class="btn btn--primary">
      Explore Trips
      <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
    </a>
  </div>
</section>

<!-- Intro -->
<section class="section section--sm" aria-label="About this blog">
  <div class="container container--narrow">
    <h2>Hello, I'm Shane.</h2>
    <p class="prose">
      This is where I document my travels — the places, the people, and the moments that stick with you long after you've come home. Part
      photo journal, part field notes, all wandering.
    </p>
    <a href={resolve("/travel")} class="btn btn--primary" style="margin-block-start: var(--space-6)">See all trips</a>
  </div>
</section>

<style>
  .section h2 {
    margin-block-end: var(--space-6);
  }
</style>
