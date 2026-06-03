<script lang="ts">
	// No imports needed for the landing page
</script>

<svelte:head>
	<title>Wandering Pages</title>
	<meta
		name="description"
		content="A personal travel journal — field notes, photographs, and stories from the road."
	/>
</svelte:head>

<!-- Hero -->
<section class="hero hero--landing" aria-label="Introduction">
	<div class="hero__media" aria-hidden="true">
		<!-- Placeholder gradient background; replace with real image later -->
		<div class="hero__image-placeholder"></div>
		<div class="hero__scrim" aria-hidden="true"></div>
	</div>
	<div class="hero__content container">
		<span class="eyebrow">A personal travel journal</span>
		<h1 class="hero__title">Wandering Pages</h1>
		<p class="hero__tagline">Field notes, photographs, and stories from the road.</p>
		<a href="/travel" class="btn btn--primary">
			Explore Trips
			<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
				<path
					d="M3 8h10M9 4l4 4-4 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
				/>
			</svg>
		</a>
	</div>
</section>

<!-- Intro -->
<section class="section section--sm" aria-label="About this blog">
	<div class="container container--narrow">
		<h2>Hello, I'm Shane.</h2>
		<p class="prose">
			This is where I document my travels — the places, the people, and the moments that stick with
			you long after you've come home. Part photo journal, part field notes, all wandering.
		</p>
		<a href="/travel" class="btn btn--primary" style="margin-block-start: var(--space-6)"
			>See all trips</a
		>
	</div>
</section>

<style>
	/* Placeholder gradient for hero until real photo is added */
	.hero__image-placeholder {
		display: block;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			oklch(25% 0.04 240) 0%,
			oklch(18% 0.06 30) 50%,
			oklch(22% 0.08 50) 100%
		);
	}

	/* Intro section heading spacing */
	.section h2 {
		margin-block-end: var(--space-6);
	}
</style>
