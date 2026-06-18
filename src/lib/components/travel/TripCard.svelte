<script lang="ts">
  import type { Trip } from '$lib/types/trip';
  import { resolve } from '$app/paths';
  import { tripImageSrc, tripThumbSrc } from '$lib/images';
  import { parseDMY } from '$lib/utils/dates';

  interface Props {
    trip: Trip;
  }

  let { trip }: Props = $props();

  let startDate = $derived(parseDMY(trip.dates.start));
  let endDate = $derived(parseDMY(trip.dates.end));
  let startYear = $derived(startDate.getFullYear().toString());
  let endYear = $derived(endDate.getFullYear().toString());
  let dateLabel = $derived(
    startYear === endYear ? startDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : `${startYear}–${endYear}`
  );

  let imageSrc = $derived(tripImageSrc(trip.slug, trip.coverPhoto.filename));
  let thumbSrc = $derived(tripThumbSrc(trip.slug, trip.coverPhoto.filename));
  let thumbFailed = $state(false);
  let imgFailed = $state(false);
  let displaySrc = $derived(imgFailed ? null : thumbFailed ? imageSrc : thumbSrc);
</script>

<a href={resolve('/travel/[slug]', { slug: trip.slug })} class="trip-card">
  <div class="trip-card__image" aria-hidden="true">
    {#if displaySrc}
      <img
        src={displaySrc}
        alt=""
        width="400"
        height="267"
        loading="lazy"
        decoding="async"
        onerror={() => {
          if (!thumbFailed) thumbFailed = true;
          else imgFailed = true;
        }}
      />
    {/if}
    <div class="trip-card__image-fallback" aria-hidden="true"></div>
  </div>
  <div class="trip-card__body">
    <div class="trip-card__meta">
      <span class="trip-card__destination">{trip.destination}</span>
      <span class="trip-card__date"><span class="sr-only">Dates: </span>{dateLabel}</span>
    </div>
    <h3 class="trip-card__title">{trip.title}</h3>
    <p class="trip-card__desc">{trip.description}</p>
    {#if trip.tags.size > 0}
      <ul class="trip-card__tags" role="list" aria-label="Tags">
        {#each [...trip.tags].slice(0, 4) as tag (tag)}
          <li class="tag-pill">{tag}</li>
        {/each}
      </ul>
    {/if}
  </div>
</a>

<style>
  .trip-card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-shadow: var(--shadow-card);
    transition:
      box-shadow var(--duration-normal) var(--ease-out),
      transform var(--duration-normal) var(--ease-default);
  }

  .trip-card:hover {
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-2px);
  }

  .trip-card:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 3px;
  }

  /* Image area */
  .trip-card__image {
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    background: var(--color-bg-muted);
  }

  .trip-card__image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--ease-default);
  }

  /* Scale zoom only when the user has not requested reduced motion */
  @media (prefers-reduced-motion: no-preference) {
    .trip-card:hover .trip-card__image img {
      transform: scale(1.04);
    }
  }

  /* Fallback gradient shown when image is missing */
  .trip-card__image-fallback {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, oklch(30% 0.06 220deg) 0%, oklch(22% 0.04 50deg) 100%);
    z-index: -1;
  }

  /* Card body */
  .trip-card__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-6);
    flex: 1;
  }

  .trip-card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .trip-card__destination {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .trip-card__date {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
    white-space: nowrap;
  }

  .trip-card__title {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-snug);
    color: var(--color-text-primary);
    margin: 0;
  }

  .trip-card__desc {
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--color-text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: none;
  }

  .trip-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    margin-block-start: auto;
    padding-block-start: var(--space-1);
  }
</style>
