<script lang="ts">
  import type { TripTag } from "$lib/types/trip";

  interface Props {
    destinations: string[];
    tags: TripTag[];
    selectedDestination?: string;
    selectedTags?: TripTag[];
    sortBy?: "date" | "destination";
  }

  let {
    destinations,
    tags,
    selectedDestination = $bindable(""),
    selectedTags = $bindable<TripTag[]>([]),
    sortBy = $bindable<"date" | "destination">("date")
  }: Props = $props();

  let activeFilterCount = $derived((selectedDestination ? 1 : 0) + selectedTags.length);

  function toggleTag(tag: TripTag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  function clearFilters() {
    selectedDestination = "";
    selectedTags = [];
    sortBy = "date";
  }
</script>

<div class="filters" aria-label="Filter and sort trips">
  <div class="filters__row">
    <!-- Destination filter -->
    <div class="filters__field">
      <label for="destination-filter" class="filters__label">Destination</label>
      <select id="destination-filter" class="filters__select" bind:value={selectedDestination}>
        <option value="">All destinations</option>
        {#each destinations as dest (dest)}
          <option value={dest}>{dest}</option>
        {/each}
      </select>
    </div>

    <!-- Sort toggle -->
    <div class="filters__field filters__field--sort">
      <span class="filters__label" id="sort-label">Sort by</span>
      <div class="filters__sort-group" role="group" aria-labelledby="sort-label">
        <button
          type="button"
          class="filters__sort-btn"
          class:is-active={sortBy === "date"}
          onclick={() => (sortBy = "date")}
          aria-pressed={sortBy === "date"}
        >
          Newest
        </button>
        <button
          type="button"
          class="filters__sort-btn"
          class:is-active={sortBy === "destination"}
          onclick={() => (sortBy = "destination")}
          aria-pressed={sortBy === "destination"}
        >
          A–Z
        </button>
      </div>
    </div>

    <!-- Clear button -->
    {#if activeFilterCount > 0}
      <button type="button" class="filters__clear" onclick={clearFilters}>
        Clear
        <span class="filters__clear-count" aria-label="{activeFilterCount} active filter{activeFilterCount === 1 ? '' : 's'}"
          >{activeFilterCount}</span
        >
      </button>
    {/if}
  </div>

  <!-- Tag pills -->
  {#if tags.length > 0}
    <div class="filters__tags" role="group" aria-label="Filter by tag">
      {#each tags as tag (tag)}
        <button
          type="button"
          class="tag-pill tag-pill--toggle"
          class:is-active={selectedTags.includes(tag)}
          onclick={() => toggleTag(tag)}
          aria-pressed={selectedTags.includes(tag)}
        >
          {tag}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .filters {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .filters__row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--space-4);
  }

  .filters__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .filters__field--sort {
    flex-direction: column;
  }

  .filters__label {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    color: var(--color-text-tertiary);
  }

  .filters__select {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--color-text-primary);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
    min-width: 180px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-3) center;
    transition: var(--transition-color);
  }

  .filters__select:hover {
    border-color: var(--color-border-strong);
  }

  .filters__select:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 2px;
    border-color: var(--color-border-focus);
  }

  .filters__sort-group {
    display: flex;
    gap: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .filters__sort-btn {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    background: var(--color-surface);
    border: none;
    padding: var(--space-2) var(--space-4);
    cursor: pointer;
    transition: var(--transition-color);
  }

  .filters__sort-btn:not(:last-child) {
    border-right: 1px solid var(--color-border);
  }

  .filters__sort-btn:hover {
    background: var(--color-bg-subtle);
    color: var(--color-text-primary);
  }

  .filters__sort-btn.is-active {
    background: var(--color-accent);
    color: var(--color-text-inverse);
  }

  .filters__sort-btn:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: -1px;
  }

  .filters__clear {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    cursor: pointer;
    transition: var(--transition-color);
    align-self: flex-end;
  }

  .filters__clear:hover {
    color: var(--color-text-primary);
    border-color: var(--color-border-strong);
  }

  .filters__clear:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  .filters__clear-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    border-radius: var(--radius-pill);
  }

  .filters__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  /* Restore native select arrow when CSS background-image is hidden
	   by the browser in Windows High Contrast / Forced Colors mode.
	   The data-URI SVG chevron is not recoloured by the UA, so it
	   disappears; reverting to appearance:auto restores the OS control. */
  @media (forced-colors: active) {
    .filters__select {
      background-image: none;
      appearance: auto;
    }
  }
</style>
