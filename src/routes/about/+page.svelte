<script lang="ts">
	import { resolve } from '$app/paths';
	import { allTrips } from '$lib/data/trips';

	const destinations = [...allTrips]
		.sort((a, b) => b.dates.start.localeCompare(a.dates.start))
		.map((t) => ({
			name: t.destination,
			year: t.dates.start.slice(0, 4),
			slug: t.slug,
			description: t.description
		}));
</script>

<svelte:head>
	<title>About — Wandering Pages</title>
	<meta
		name="description"
		content="About Shane — the traveller behind Wandering Pages. Field notes, photographs, and stories from the road."
	/>
</svelte:head>

<article class="about-page" aria-labelledby="about-heading">
	<!-- ============================================================
	     INTRO SECTION
	     ============================================================ -->
	<section class="about-intro section--sm">
		<div class="container container--narrow">
			<span class="eyebrow">About this blog</span>
			<h1 id="about-heading" class="about-intro__title">Hello, I'm Shane.</h1>

			<div class="about-intro__body prose">
				<p>
					Wandering Pages started as a way to keep honest notes about the places I visit — not the
					polished highlight reel, but the real texture of a trip. The wrong trains caught and the
					right ones missed. The little restaurants with no English menu. The view from a ridge you
					almost didn't bother climbing. I travel slowly and try to pay attention.
				</p>
				<p>
					This site is part travel diary, part photography archive. If something here makes you want
					to book a flight, or just read a little more carefully the next time you're somewhere new,
					that's more than enough for me.
				</p>
			</div>
		</div>
	</section>

	<!-- ============================================================
	     PHILOSOPHY SECTION
	     ============================================================ -->
	<section class="about-philosophy section" aria-labelledby="philosophy-heading">
		<div class="container container--narrow">
			<h2 id="philosophy-heading" class="about-philosophy__heading">How I travel</h2>
			<ul class="about-pillars" role="list">
				<li class="about-pillar">
					<h3 class="about-pillar__title">Slowly, on purpose</h3>
					<p class="about-pillar__body">
						A week in one city beats five cities in a week. I'd rather know the name of a
						neighbourhood bakery than tick off an itinerary. Moving slowly means you notice more —
						the light at a particular hour, the rhythm of a market, the way people talk to each
						other in the evening.
					</p>
				</li>
				<li class="about-pillar">
					<h3 class="about-pillar__title">Photos as field notes</h3>
					<p class="about-pillar__body">
						I photograph the things I want to remember, not the things I think other people want to
						see. That means a lot of ordinary details — doorways, food, shadows — alongside the
						landscapes. The camera is a reason to look carefully, not just a device for collecting
						proof that you were somewhere.
					</p>
				</li>
				<li class="about-pillar">
					<h3 class="about-pillar__title">Finding the unexpected</h3>
					<p class="about-pillar__body">
						The best moments on any trip are almost never the ones in the guidebook. I try to leave
						enough space in a day for things to go sideways in interesting ways. Some of my
						favourite memories started as wrong turns.
					</p>
				</li>
			</ul>
		</div>
	</section>

	<!-- ============================================================
	     DESTINATIONS SECTION
	     ============================================================ -->
	<section class="about-destinations section--sm" aria-labelledby="destinations-heading">
		<div class="container container--narrow">
			<h2 id="destinations-heading" class="about-destinations__heading">
				<span class="eyebrow">On the road so far</span>
				Recent destinations
			</h2>
			<ul class="destinations-list" role="list">
				{#each destinations as dest (dest.slug)}
					<li class="destinations-list__item">
						<a
							href={resolve(`/travel/${dest.slug}`)}
							class="destination-card"
							aria-label="{dest.name}, {dest.year} — {dest.description}"
						>
							<span class="destination-card__name">{dest.name}</span>
							<span class="destination-card__year" aria-hidden="true">{dest.year}</span>
						</a>
						<!-- Description visible to all users; aria-label on the link covers AT -->
						<p class="destinations-list__description">{dest.description}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- ============================================================
	     CTA SECTION
	     ============================================================ -->
	<section class="about-cta section--sm" aria-labelledby="cta-heading">
		<div class="container container--narrow">
			<div class="about-cta__inner">
				<h2 id="cta-heading" class="about-cta__heading">See all the trips</h2>
				<p class="about-cta__body">
					Every destination has its own page — photographs, field notes, and the stories that didn't
					quite fit anywhere else.
				</p>
				<a href={resolve('/travel')} class="btn btn--primary">
					Browse all travel
					<!-- Decorative arrow — the link text is already complete without it -->
					<span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>
	</section>
</article>

<style>
	/* ---- Intro ---- */
	.about-intro {
		border-block-end: 1px solid var(--color-border);
	}

	.about-intro__title {
		margin-block: var(--space-4) var(--space-6);
	}

	.about-intro__body {
		/* Stack paragraphs with consistent spacing */
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	/* Reset max-width imposed by the global p rule — the narrow container
	   already constrains line length to ~720px / ~72ch */
	.about-intro__body p {
		max-width: none;
	}

	/* ---- Philosophy ---- */
	.about-philosophy {
		background-color: var(--color-bg-subtle);
		border-block: 1px solid var(--color-border);
	}

	.about-philosophy__heading {
		margin-block-end: var(--space-8);
	}

	.about-pillars {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.about-pillar {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);

		/* Left accent rule for visual rhythm */
		padding-inline-start: var(--space-5);
		border-inline-start: 2px solid var(--color-accent);
	}

	.about-pillar__title {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: var(--weight-semibold);
		line-height: var(--leading-snug);
		color: var(--color-text-primary);
	}

	.about-pillar__body {
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--color-text-secondary);

		/* Remove the global p max-width — the narrow container constrains line length */
		max-width: none;
	}

	/* ---- Destinations ---- */
	.about-destinations__heading {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-block-end: var(--space-8);
	}

	.destinations-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.destinations-list__item {
		padding-block: var(--space-5);
		border-block-end: 1px solid var(--color-border);
	}

	.destinations-list__item:first-child {
		border-block-start: 1px solid var(--color-border);
	}

	.destination-card {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-4);
		text-decoration: none;
		color: var(--color-text-primary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.destination-card:hover {
		color: var(--color-accent);
		text-decoration: none;
	}

	.destination-card:focus-visible {
		outline: 3px solid var(--color-border-focus);
		outline-offset: 4px;
		border-radius: var(--radius-sm);
		box-shadow: 0 0 0 6px var(--color-accent-subtle);
	}

	.destination-card__name {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.destination-card__year {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
		color: var(--color-text-tertiary);
		letter-spacing: var(--tracking-wider);
		flex-shrink: 0;
	}

	.destinations-list__description {
		margin-block-start: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		max-width: none;
	}

	/* ---- CTA ---- */
	.about-cta {
		border-block-start: 1px solid var(--color-border);
	}

	.about-cta__inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-5);
	}

	.about-cta__heading {
		font-size: var(--text-2xl);
	}

	.about-cta__body {
		color: var(--color-text-secondary);
		max-width: none;
	}
</style>
