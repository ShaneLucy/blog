<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import { resolve } from '$app/paths';
  import { SITE_NAME, SITE_URL } from '$lib/config';
  import { tripImageSrc, tripThumbSrc } from '$lib/images';

  let { data }: { data: PageData } = $props();
  let trip = $derived(data.trip);
  let photo = $derived(data.photo);
  let prevPhoto = $derived(data.prevPhoto);
  let nextPhoto = $derived(data.nextPhoto);
  let photoIndex = $derived(data.photoIndex);

  let imageSrc = $derived(tripImageSrc(trip.slug, photo.filename));
  let thumbSrc = $derived(tripThumbSrc(trip.slug, photo.filename));

  let envelopeWidth = $derived(data.envelopeWidth);
  let envelopeHeight = $derived(data.envelopeHeight);

  let imgFailed = $state(false);
  let thumbFailed = $state(false);

  // Issue 5: $derived replaces plain srcToUse() function
  let currentSrc = $derived(imgFailed ? null : thumbFailed ? imageSrc : thumbSrc);

  // Issue 7: arrow-key navigation (progressive enhancement)
  function handleKeydown(e: KeyboardEvent) {
    const target = e.target as Element;
    if (target.matches('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowLeft' && prevPhoto) {
      goto(resolve('/travel/[slug]/[photoSlug]', { slug: trip.slug, photoSlug: prevPhoto.slug }));
    } else if (e.key === 'ArrowRight' && nextPhoto) {
      goto(resolve('/travel/[slug]/[photoSlug]', { slug: trip.slug, photoSlug: nextPhoto.slug }));
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <title>{photo.caption ?? photo.alt} — {trip.title} — Wandering Pages</title>
  <meta name="description" content={photo.caption ?? photo.alt} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={`${photo.caption ?? photo.alt} — ${trip.title}`} />
  <meta property="og:description" content={photo.caption ?? photo.alt} />
  <meta property="og:image" content={`${SITE_URL}${imageSrc}`} />
  <meta property="og:url" content={`${SITE_URL}/travel/${trip.slug}/${photo.slug}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${photo.caption ?? photo.alt} — ${trip.title}`} />
  <meta name="twitter:description" content={photo.caption ?? photo.alt} />
  <meta name="twitter:image" content={`${SITE_URL}${imageSrc}`} />
  <link rel="canonical" href={`${SITE_URL}/travel/${trip.slug}/${photo.slug}`} />
</svelte:head>

<!-- Issue 10: aria-labelledby names the article landmark -->
<article class="photo-detail" aria-labelledby="photo-title">
  <!-- Issue 3: breadcrumb contains location link only — no next link -->
  <nav class="photo-detail__breadcrumb container container--narrow" aria-label="Breadcrumb">
    <a href={resolve('/travel/[slug]', { slug: trip.slug })} class="back-link">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      {trip.title}
    </a>
  </nav>

  <!-- Issue 2: image comes before metadata -->
  <!-- Envelope aspect ratio keeps container height constant across all trip photos, preventing CLS on navigation -->
  <div class="photo-detail__image-wrap" style="aspect-ratio: {envelopeWidth} / {envelopeHeight}">
    <!-- Issue 5: driven by $derived currentSrc -->
    {#if currentSrc}
      <img
        src={currentSrc}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        class="photo-detail__image"
        fetchpriority="high"
        decoding="async"
        onerror={() => {
          if (!thumbFailed) thumbFailed = true;
          else imgFailed = true;
        }}
      />
    {/if}
  </div>

  <!-- Issues 1 + 4: title uses caption ?? alt; description only shown when distinct from caption -->
  <div class="photo-detail__meta container container--narrow">
    <h1 id="photo-title" class="photo-detail__title">{photo.caption ?? photo.alt}</h1>
    {#if photo.caption && photo.alt && photo.alt !== photo.caption}
      <p class="photo-detail__description">{photo.alt}</p>
    {/if}
    <!-- Issue 9: margin-block-start separates tags from title/description -->
    {#if photo.tags && photo.tags.size > 0}
      <ul class="photo-detail__tags" role="list" aria-label="Photo tags">
        {#each photo.tags as tag (tag)}
          <li class="tag-pill">{tag}</li>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- Issue 3: unified prev/counter/next nav, always present, placed below content -->
  <!-- Issue 8: margin-block-start provides section-level separation -->
  <nav class="photo-detail__nav container container--narrow" aria-label="Photo navigation">
    <!-- Issue 7: hint for screen readers about arrow key shortcut -->
    <p class="sr-only">Use the left and right arrow keys to browse photos.</p>
    <div class="photo-nav">
      {#if prevPhoto}
        <a
          href={resolve('/travel/[slug]/[photoSlug]', {
            slug: trip.slug,
            photoSlug: prevPhoto.slug
          })}
          class="photo-nav__link photo-nav__link--prev"
          aria-label="Previous photo: {prevPhoto.alt}"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Previous
        </a>
      {:else}
        <span class="photo-nav__placeholder" aria-hidden="true"></span>
      {/if}

      <span class="photo-nav__counter" aria-label="Photo {photoIndex + 1} of {trip.photos.length}">
        {photoIndex + 1} / {trip.photos.length}
      </span>

      {#if nextPhoto}
        <a
          href={resolve('/travel/[slug]/[photoSlug]', {
            slug: trip.slug,
            photoSlug: nextPhoto.slug
          })}
          class="photo-nav__link photo-nav__link--next"
          aria-label="Next photo: {nextPhoto.alt}"
        >
          Next
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      {:else}
        <span class="photo-nav__placeholder" aria-hidden="true"></span>
      {/if}
    </div>
  </nav>
</article>

<style>
  .photo-detail {
    padding-block-end: var(--space-section);
  }

  /* Breadcrumb */
  .photo-detail__breadcrumb {
    padding-block: var(--space-5);
  }

  /* Issue 6: aspect-ratio on wrapper prevents CLS; max-height caps tall portraits */
  .photo-detail__image-wrap {
    width: 100%;
    max-height: 85dvh;
    background: var(--color-bg-muted);
    overflow: hidden;
    margin-block-end: var(--space-2xl);
    box-shadow: inset 0 0 0 1px var(--color-border);
  }

  .photo-detail__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Issue 2: metadata lives below the image */
  .photo-detail__meta {
    margin-block-end: var(--space-xl);
  }

  .photo-detail__title {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    font-weight: var(--weight-semibold);
    margin-block-end: var(--space-3);
  }

  .photo-detail__description {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    max-width: none;
    margin: 0;
  }

  /* Issue 9: top margin separates tags from title/description */
  .photo-detail__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    margin: 0;
    margin-block-start: var(--space-4);
  }

  /* Issue 8: section-level spacing above nav */
  .photo-detail__nav {
    margin-block-start: var(--space-2xl);
  }
</style>
