<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import TripCard from '$lib/components/travel/TripCard.svelte';
	import TripFilters from '$lib/components/travel/TripFilters.svelte';

	let { data }: { data: PageData } = $props();

	// Initialise filter state from URL search params (enables shareable URLs).
	// Guarded by `browser` so it doesn't run during static prerender.
	let selectedDestination = $state(
		browser ? ($page.url.searchParams.get('destination') ?? '') : ''
	);
	let selectedTags = $state<string[]>(
		browser ? ($page.url.searchParams.get('tags')?.split(',').filter(Boolean) ?? []) : []
	);
	let sortBy = $state<'date' | 'destination'>(
		browser ? (($page.url.searchParams.get('sort') as 'date' | 'destination') ?? 'date') : 'date'
	);

	let filteredTrips = $derived(
		data.trips
			.filter((t) => !selectedDestination || t.destination === selectedDestination)
			.filter((t) => selectedTags.length === 0 || selectedTags.every((tag) => t.tags.includes(tag)))
			.sort((a, b) =>
				sortBy === 'date'
					? new Date(b.dates.start).getTime() - new Date(a.dates.start).getTime()
					: a.destination.localeCompare(b.destination)
			)
	);

	// Keep URL in sync with filter state for bookmarkable/shareable links
	$effect(() => {
		const params = new SvelteURLSearchParams();
		if (selectedDestination) params.set('destination', selectedDestination);
		if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
		if (sortBy !== 'date') params.set('sort', sortBy);
		const search = params.toString();
		goto(resolve(search ? (`/travel?${search}` as `/travel?${string}`) : '/travel'), {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});
	});
</script>

<svelte:head>
	<title>Travel — Wandering Pages</title>
	<meta
		name="description"
		content="A collection of trips — photographs, notes, and stories from the road."
	/>
</svelte:head>

<div class="travel-page">
	<!-- Page header — plain div; <header> inside a non-sectioning div
	     would carry no landmark role, so a div is semantically cleaner here. -->
	<div class="travel-page__header">
		<div class="container container--narrow">
			<span class="eyebrow">All trips</span>
			<h1>Travel</h1>
			<p class="prose">Photographs, notes, and stories from the road.</p>
		</div>
	</div>

	<div class="container">
		<!-- Filters -->
		<section class="travel-page__filters" aria-label="Filter trips">
			<TripFilters
				destinations={data.destinations}
				tags={data.tags}
				bind:selectedDestination
				bind:selectedTags
				bind:sortBy
			/>
		</section>

		<!-- Results count -->
		<p class="travel-page__count" aria-live="polite" aria-atomic="true">
			{#if filteredTrips.length === data.trips.length}
				{data.trips.length} trip{data.trips.length === 1 ? '' : 's'}
			{:else}
				{filteredTrips.length} of {data.trips.length} trip{data.trips.length === 1 ? '' : 's'}
			{/if}
		</p>

		<!-- Trip grid -->
		{#if filteredTrips.length > 0}
			<ul class="trip-grid" role="list" aria-label="Trips">
				{#each filteredTrips as trip (trip.slug)}
					<li>
						<TripCard {trip} />
					</li>
				{/each}
			</ul>
		{:else}
			<div class="travel-page__empty" role="status">
				<p>No trips match the current filters.</p>
				<button
					type="button"
					class="btn btn--secondary"
					onclick={() => {
						selectedDestination = '';
						selectedTags = [];
						sortBy = 'date';
					}}
				>
					Clear filters
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.travel-page__header {
		padding-block: var(--space-2xl) var(--space-xl);
		border-block-end: 1px solid var(--color-border);
		margin-block-end: var(--space-xl);
	}

	.travel-page__header h1 {
		margin-block: var(--space-3) var(--space-4);
	}

	.travel-page__filters {
		margin-block-end: var(--space-6);
		padding-block-end: var(--space-6);
		border-block-end: 1px solid var(--color-border);
	}

	.travel-page__count {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		margin-block-end: var(--space-8);
		max-width: none;
	}

	/* Trip grid — responsive auto-fill columns */
	.trip-grid {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: var(--space-8);
		margin-block-end: var(--space-section);
	}

	.travel-page__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
		padding-block: var(--space-3xl);
		text-align: center;
		color: var(--color-text-secondary);
	}
</style>
