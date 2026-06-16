<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children } = $props();
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Header />
<main id="main-content">
  {@render children()}
</main>
<Footer />
