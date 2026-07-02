<script lang="ts">
  import type { PageData } from "./$types";
  import TripGallery from "$lib/components/travel/TripGallery.svelte";
  import { resolve } from "$app/paths";
  import { SITE_NAME, SITE_URL } from "$lib/config";
  import { parseDMY, dmyToIso } from "$lib/utils/dates";
  import { tripImageSrc, tripSrcset, tripOgSrc, HERO_SIZES, MAX_WIDTH } from "$lib/images";

  let { data }: { data: PageData } = $props();
  let trip = $derived(data.trip);

  const FALLBACK_COVER_WIDTH = 2400;
  const FALLBACK_COVER_HEIGHT = 1350;

  let coverPhoto = $derived(trip.photos.find((p) => p.filename === trip.coverPhoto.filename));

  function formatDateRange(start: string, end: string): string {
    const s = parseDMY(start);
    const e = parseDMY(end);
    const locale = "en-GB";
    if (s.getFullYear() === e.getFullYear()) {
      if (s.getMonth() === e.getMonth()) {
        return `${s.getDate()}–${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
      }
      return `${s.toLocaleDateString(locale, { day: "numeric", month: "long" })} – ${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
    }
    return `${s.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })} – ${e.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;
  }

  let dateRange = $derived(formatDateRange(trip.dates.start, trip.dates.end));
</script>

<svelte:head>
  <title>{trip.title} — Wandering Pages</title>
  <meta name="description" content={trip.description} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={trip.title} />
  <meta property="og:description" content={trip.description} />
  <meta property="og:image" content={`${SITE_URL}${tripOgSrc(trip.slug, trip.coverPhoto.filename)}`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:url" content={`${SITE_URL}/travel/${trip.slug}`} />
  <meta property="article:published_time" content={dmyToIso(trip.dates.start)} />
  {#each trip.tags as tag (tag)}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={trip.title} />
  <meta name="twitter:description" content={trip.description} />
  <meta name="twitter:image" content={`${SITE_URL}${tripOgSrc(trip.slug, trip.coverPhoto.filename)}`} />
  <link rel="canonical" href={`${SITE_URL}/travel/${trip.slug}`} />
  <link rel="preload" as="image" imagesrcset={tripSrcset(trip.slug, trip.coverPhoto.filename)} imagesizes={HERO_SIZES} />
</svelte:head>

<article class="trip-detail" aria-labelledby="trip-title">
  <!-- Back navigation -->
  <nav class="trip-detail__breadcrumb container container--narrow" aria-label="Breadcrumb">
    <a href={resolve("/travel")} class="back-link">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      All trips
    </a>
  </nav>

  <!-- Hero image -->
  <div class="trip-detail__hero" aria-hidden="true">
    <img
      src={tripImageSrc(trip.slug, trip.coverPhoto.filename, MAX_WIDTH)}
      srcset={tripSrcset(trip.slug, trip.coverPhoto.filename)}
      sizes={HERO_SIZES}
      alt={coverPhoto?.alt}
      width={coverPhoto?.width ?? FALLBACK_COVER_WIDTH}
      height={coverPhoto?.height ?? FALLBACK_COVER_HEIGHT}
      fetchpriority="high"
      decoding="async"
    />
  </div>

  <!-- Trip header -->
  <header class="trip-detail__header container container--narrow">
    <span class="eyebrow">{trip.destination}{trip.region ? ` · ${trip.region}` : ""}</span>
    <h1 id="trip-title">{trip.title}</h1>
    <p class="trip-detail__dates">
      <time datetime={dmyToIso(trip.dates.start)}>{dateRange}</time>
    </p>
    {#if trip.tags.size > 0}
      <ul class="trip-detail__tags" role="list" aria-label="Tags">
        {#each trip.tags as tag (tag)}
          <li class="tag-pill">{tag}</li>
        {/each}
      </ul>
    {/if}
  </header>

  <!-- Narrative body -->
  {#if trip.body || trip.description}
    <div class="trip-detail__body container container--narrow">
      {#if trip.body}
        <p class="prose">{trip.body}</p>
      {:else}
        <p class="prose">{trip.description}</p>
      {/if}
    </div>
  {/if}

  <!-- Photo gallery -->
  {#if trip.photos.length > 0}
    <section class="trip-detail__gallery container" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" class="trip-detail__gallery-heading">Photos</h2>
      <TripGallery photos={trip.photos} slug={trip.slug} />
    </section>
  {/if}
</article>

<style>
  .trip-detail {
    padding-block-end: var(--space-section);
  }

  /* Breadcrumb */
  .trip-detail__breadcrumb {
    padding-block: var(--space-5);
  }

  /* Hero */
  .trip-detail__hero {
    width: 100%;
    aspect-ratio: 21 / 9;
    overflow: hidden;
    background: var(--color-bg-muted);
    margin-block-end: var(--space-xl);
  }

  .trip-detail__hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (width <= 640px) {
    .trip-detail__hero {
      aspect-ratio: 16 / 9;
    }
  }

  /* Header */
  .trip-detail__header {
    margin-block-end: var(--space-xl);
  }

  .trip-detail__header h1 {
    margin-block: var(--space-3) var(--space-4);
  }

  .trip-detail__dates {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
    margin-block-end: var(--space-5);
    max-width: none;
  }

  .trip-detail__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
  }

  /* Body */
  .trip-detail__body {
    margin-block-end: var(--space-2xl);
  }

  /* Gallery */
  .trip-detail__gallery {
    margin-block-start: var(--space-2xl);
  }

  .trip-detail__gallery-heading {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: var(--weight-semibold);
    margin-block-end: var(--space-8);
  }
</style>
