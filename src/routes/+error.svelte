<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Error {$page.status} — Wandering Pages</title>
</svelte:head>

<div class="error-page container container--narrow">
	<p class="error-page__status">{$page.status}</p>
	<h1 class="error-page__title">There is a problem with this website</h1>
	{#if $page.error?.message}
		<p class="error-page__message">{$page.error.message}</p>
	{/if}
	<a href={resolve('/')} class="error-page__home">Go home</a>
</div>

<style>
	.error-page {
		padding-block: var(--space-section);
		text-align: center;
	}

	.error-page__status {
		font-family: var(--font-sans);
		font-size: clamp(4rem, 20vw, 8rem);
		font-weight: var(--weight-bold);
		color: var(--color-text-tertiary);
		line-height: 1;
		margin-block-end: var(--space-4);
	}

	.error-page__title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		margin-block-end: var(--space-4);
	}

	.error-page__message {
		color: var(--color-text-secondary);
		margin-block-end: var(--space-8);
	}

	.error-page__home {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
	}
</style>
