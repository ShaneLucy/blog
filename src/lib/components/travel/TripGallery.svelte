<script lang="ts">
	import type { TripPhoto } from '$lib/types/trip';

	interface Props {
		photos: TripPhoto[];
		slug: string;
	}

	let { photos, slug }: Props = $props();

	let lightboxIndex = $state<number | null>(null);
	let dialogEl: HTMLDialogElement;

	let currentPhoto = $derived(lightboxIndex !== null ? photos[lightboxIndex] : null);

	function openLightbox(index: number) {
		lightboxIndex = index;
		dialogEl?.showModal();
	}

	function closeLightbox() {
		dialogEl?.close();
	}

	function prev() {
		if (lightboxIndex === null) return;
		lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
	}

	function next() {
		if (lightboxIndex === null) return;
		lightboxIndex = (lightboxIndex + 1) % photos.length;
	}

	$effect(() => {
		if (lightboxIndex === null) return;

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				prev();
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault();
				next();
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	function imageSrc(photo: TripPhoto) {
		return `/images/trips/${slug}/${photo.filename}`;
	}

	function thumbSrc(photo: TripPhoto) {
		return `/images/trips/${slug}/thumbnails/${photo.filename}`;
	}
</script>

<ul class="gallery" aria-label="Trip photos">
	{#each photos as photo, i}
		<li class="gallery__item">
			<button
				class="gallery__btn"
				type="button"
				aria-label="View photo: {photo.alt}"
				onclick={() => openLightbox(i)}
			>
				<img
					src={thumbSrc(photo)}
					alt={photo.alt}
					width={photo.width}
					height={photo.height}
					loading={i < 2 ? 'eager' : 'lazy'}
					decoding="async"
					onerror={(e) => {
						const img = e.currentTarget as HTMLImageElement;
						img.src = imageSrc(photo);
						img.onerror = null;
					}}
				/>
			</button>
		</li>
	{/each}
</ul>

<!-- Lightbox -->
<dialog
	bind:this={dialogEl}
	class="lightbox"
	aria-label="Photo gallery"
	onclose={() => {
		lightboxIndex = null;
	}}
	onclick={(e) => {
		if (e.target === dialogEl) closeLightbox();
	}}
>
	{#if currentPhoto}
		<button
			class="lightbox__close"
			type="button"
			aria-label="Close lightbox"
			onclick={closeLightbox}
		>
			<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path
					d="M15 5L5 15M5 5l10 10"
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
				/>
			</svg>
		</button>

		<figure class="lightbox__figure">
			<img
				src={imageSrc(currentPhoto)}
				alt={currentPhoto.alt}
				class="lightbox__image"
				decoding="async"
			/>
			{#if currentPhoto.caption}
				<figcaption class="lightbox__caption">{currentPhoto.caption}</figcaption>
			{/if}
		</figure>

		{#if photos.length > 1}
			<button
				class="lightbox__nav lightbox__nav--prev"
				type="button"
				aria-label="Previous photo"
				onclick={prev}
			>
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M12 15l-5-5 5-5"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button
				class="lightbox__nav lightbox__nav--next"
				type="button"
				aria-label="Next photo"
				onclick={next}
			>
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M8 5l5 5-5 5"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<div class="lightbox__counter" aria-live="polite" aria-atomic="true">
				{lightboxIndex !== null ? lightboxIndex + 1 : ''} / {photos.length}
			</div>
		{/if}
	{/if}
</dialog>

<style>
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

	.gallery__btn {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border: none;
		padding: 0;
		cursor: zoom-in;
		background: var(--color-bg-muted);
		border-radius: var(--radius-md);
		display: block;
		width: 100%;
	}

	.gallery__btn img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-slow) var(--ease-default);
	}

	.gallery__btn:hover img,
	.gallery__btn:focus-visible img {
		transform: scale(1.04);
	}

	.gallery__btn:focus-visible {
		outline: 3px solid var(--color-border-focus);
		outline-offset: 3px;
	}

	/* ── Lightbox ────────────────────────────────────────────── */
	.lightbox {
		position: fixed;
		inset: 0;
		width: 100%;
		max-width: 100%;
		height: 100dvh;
		max-height: 100dvh;
		background: oklch(5% 0 0 / 0.96);
		border: none;
		padding: 0;
		margin: 0;
		display: grid;
		place-items: center;
		color: white;
	}

	.lightbox::backdrop {
		display: none;
	}

	/* dialog[open] is required — browsers hide dialog by default */
	.lightbox[open] {
		display: grid;
	}

	.lightbox__figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		max-width: 92vw;
		max-height: 92dvh;
		margin: 0;
	}

	.lightbox__image {
		max-width: 92vw;
		max-height: calc(92dvh - 3rem);
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: var(--radius-sm);
		display: block;
	}

	.lightbox__caption {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: oklch(80% 0 0);
		text-align: center;
		max-width: 60ch;
	}

	/* Close button */
	.lightbox__close {
		position: absolute;
		top: var(--space-5);
		right: var(--space-5);
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: oklch(100% 0 0 / 0.12);
		border: 1px solid oklch(100% 0 0 / 0.2);
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: background var(--duration-fast) var(--ease-out);
	}

	.lightbox__close:hover {
		background: oklch(100% 0 0 / 0.22);
	}

	.lightbox__close:focus-visible {
		outline: 3px solid oklch(100% 0 0 / 0.9);
		outline-offset: 3px;
	}

	/* Prev / Next buttons */
	.lightbox__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: oklch(100% 0 0 / 0.12);
		border: 1px solid oklch(100% 0 0 / 0.2);
		border-radius: var(--radius-full);
		color: white;
		cursor: pointer;
		transition: background var(--duration-fast) var(--ease-out);
	}

	.lightbox__nav:hover {
		background: oklch(100% 0 0 / 0.22);
	}

	.lightbox__nav:focus-visible {
		outline: 3px solid oklch(100% 0 0 / 0.9);
		outline-offset: 3px;
	}

	.lightbox__nav--prev {
		left: var(--space-5);
	}

	.lightbox__nav--next {
		right: var(--space-5);
	}

	/* Counter */
	.lightbox__counter {
		position: absolute;
		bottom: var(--space-5);
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: oklch(70% 0 0);
		white-space: nowrap;
	}

	/* Narrow screens: collapse nav buttons on tiny viewports */
	@media (max-width: 480px) {
		.lightbox__nav {
			width: 40px;
			height: 40px;
		}

		.lightbox__nav--prev {
			left: var(--space-3);
		}

		.lightbox__nav--next {
			right: var(--space-3);
		}
	}
</style>
