<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let trip = $derived(data.trip);
	let photo = $derived(data.photo);
	let prevPhoto = $derived(data.prevPhoto);
	let nextPhoto = $derived(data.nextPhoto);

	let imageSrc = $derived(`/images/trips/${trip.slug}/${photo.filename}`);
	let thumbSrc = $derived(`/images/trips/${trip.slug}/thumbnails/${photo.filename}`);

	let imgFailed = $state(false);
	let thumbFailed = $state(false);

	function srcToUse() {
		if (imgFailed) return null;
		return thumbFailed ? imageSrc : thumbSrc;
	}
</script>

<svelte:head>
	<title>{photo.slug} — {trip.title} — Wandering Pages</title>
	<meta name="description" content={photo.caption ?? photo.alt} />
</svelte:head>

<article class="photo-detail">
	<!-- Breadcrumb + Next navigation row -->
	<nav class="photo-detail__breadcrumb container container--narrow" aria-label="Breadcrumb">
		<a href="/travel/{trip.slug}" class="back-link">
			<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path
					d="M10 12L6 8L10 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			{trip.title}
		</a>
		{#if nextPhoto}
			<a href="/travel/{trip.slug}/{nextPhoto.slug}" class="photo-nav__link photo-nav__link--next">
				{nextPhoto.slug}
				<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path
						d="M6 4L10 8L6 12"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		{/if}
	</nav>

	<!-- Title + description + tags -->
	<header class="photo-detail__header container container--narrow">
		<h1 class="photo-detail__title">{photo.slug}</h1>
		{#if photo.alt}
			<p class="photo-detail__description">{photo.alt}</p>
		{/if}
		{#if photo.tags && photo.tags.length > 0}
			<ul class="photo-detail__tags" role="list" aria-label="Photo tags">
				{#each photo.tags as tag}
					<li class="tag-pill">{tag}</li>
				{/each}
			</ul>
		{/if}
	</header>

	<!-- Full-size image -->
	<div class="photo-detail__image-wrap">
		{#if !imgFailed}
			<img
				src={srcToUse()}
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

	<!-- Previous navigation -->
	{#if prevPhoto}
		<nav class="photo-detail__nav container container--narrow" aria-label="Photo navigation">
			<a href="/travel/{trip.slug}/{prevPhoto.slug}" class="photo-nav__link photo-nav__link--prev">
				<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path
						d="M10 12L6 8L10 4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				Previous
			</a>
		</nav>
	{/if}
</article>

<style>
	.photo-detail {
		padding-block-end: var(--space-section);
	}

	/* Breadcrumb */
	.photo-detail__breadcrumb {
		padding-block: var(--space-5);
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		transition: color var(--duration-fast) var(--ease-out);
	}

	.back-link:hover {
		color: var(--color-text-primary);
	}

	.back-link:focus-visible {
		outline: 3px solid var(--color-border-focus);
		outline-offset: 3px;
		border-radius: var(--radius-sm);
	}

	/* Header */
	.photo-detail__header {
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

	/* Image */
	.photo-detail__image-wrap {
		width: 100%;
		background: var(--color-bg-muted);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		margin-block-end: var(--space-xl);
	}

	.photo-detail__image {
		display: block;
		max-width: 100%;
		max-height: 85dvh;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.photo-detail__tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	/* Prev / Next nav */
	.photo-nav__link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.photo-nav__link:hover {
		color: var(--color-text-primary);
	}

	.photo-nav__link:focus-visible {
		outline: 3px solid var(--color-border-focus);
		outline-offset: 3px;
		border-radius: var(--radius-sm);
	}
</style>
