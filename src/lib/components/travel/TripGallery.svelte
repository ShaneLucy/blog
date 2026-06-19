<script lang="ts">
  import type { TripPhoto } from "$lib/types/trip";
  import type { PhotoTag } from "$lib/types/trip";
  import { resolve } from "$app/paths";
  import { tripImageSrc, tripThumbSrc } from "$lib/images";

  interface Props {
    photos: TripPhoto[];
    slug: string;
  }

  let { photos, slug }: Props = $props();

  let selectedTags = $state<PhotoTag[]>([]);

  let availableTags = $derived(
    [...new Set(photos.flatMap((p) => (p.tags ? [...p.tags] : [])))].sort((a, b) => a.localeCompare(b)) as PhotoTag[]
  );

  let filteredPhotos = $derived(selectedTags.length === 0 ? photos : photos.filter((p) => selectedTags.some((t) => p.tags?.has(t))));

  function toggleTag(tag: PhotoTag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  function imageSrc(photo: TripPhoto) {
    return tripImageSrc(slug, photo.filename);
  }

  function thumbSrc(photo: TripPhoto) {
    return tripThumbSrc(slug, photo.filename);
  }

  let thumbFailed = $state<Record<string, boolean>>({});
  let imgFailed = $state<Record<string, boolean>>({});
</script>

{#if availableTags.length > 0}
  <div class="photo-filters">
    <span class="photo-filters__label" id="photo-filter-label">Filter photos</span>
    <div class="photo-filters__pills" role="group" aria-labelledby="photo-filter-label">
      {#each availableTags as tag (tag)}
        <button
          class="tag-pill tag-pill--toggle"
          class:is-active={selectedTags.includes(tag)}
          type="button"
          aria-pressed={selectedTags.includes(tag)}
          onclick={() => toggleTag(tag)}>{tag}</button
        >
      {/each}
    </div>
  </div>
{/if}

<ul class="gallery" aria-label="Trip photos">
  {#each filteredPhotos as photo, i (photo.slug)}
    <li class="gallery__item">
      <a
        href={resolve("/travel/[slug]/[photoSlug]", { slug, photoSlug: photo.slug })}
        class="gallery__link"
        aria-label="View photo: {photo.alt}"
      >
        {#if !imgFailed[photo.slug]}
          <img
            src={thumbFailed[photo.slug] ? imageSrc(photo) : thumbSrc(photo)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading={i < 8 ? "eager" : "lazy"}
            fetchpriority={i < 8 ? "low" : "auto"}
            decoding="async"
            onerror={() => {
              if (!thumbFailed[photo.slug]) {
                thumbFailed[photo.slug] = true;
              } else {
                imgFailed[photo.slug] = true;
              }
            }}
          />
        {/if}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* ── Tag filter bar ───────────────────────────────────────── */
  .photo-filters {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-block-end: var(--space-6);
  }

  .photo-filters__label {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    color: var(--color-text-tertiary);
  }

  .photo-filters__pills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  /* ── Photo grid ──────────────────────────────────────────── */
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
    gap: var(--space-4);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .gallery__item {
    list-style: none;
  }

  .gallery__link {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: var(--radius-md);
    display: block;
    background: var(--color-bg-muted);
  }

  .gallery__link img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--ease-default);
  }

  /* Scale zoom suppressed entirely for vestibular-motion-sensitive users;
	   the transition duration is already zeroed by the global kill-switch in
	   app.css, but the transform itself must also be removed here. */
  @media (prefers-reduced-motion: no-preference) {
    .gallery__link:hover img,
    .gallery__link:focus-visible img {
      transform: scale(1.04);
    }
  }

  .gallery__link:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 3px;
  }
</style>
