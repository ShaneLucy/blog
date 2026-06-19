<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";

  let menuOpen = $state(false);
  let scrolled = $state(false);

  let currentPage = $derived(page.url.pathname);

  function toggleMenu() {
    menuOpen = !menuOpen;
    // Focus first mobile link when opening
    if (menuOpen) {
      // Defer to next tick so the hidden attribute is removed first
      setTimeout(() => {
        const firstLink = document.querySelector<HTMLAnchorElement>("#mobile-menu .site-nav__mobile-link");
        firstLink?.focus();
      }, 0);
    }
  }

  function closeMenu() {
    menuOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      // Return focus to the hamburger button
      const hamburger = document.querySelector<HTMLButtonElement>(".site-nav__hamburger");
      hamburger?.focus();
    }
  }

  $effect(() => {
    function onScroll() {
      scrolled = window.scrollY > 0;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Set initial state in case page loads mid-scroll
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- role="banner" is implicit on <header>; omitting the explicit role avoids redundancy -->
<header class="site-header" class:is-scrolled={scrolled}>
  <div class="container">
    <nav class="site-nav" aria-label="Main navigation">
      <a href={resolve("/")} class="site-nav__logo">
        <span class="site-nav__logo-text">Wandering Pages</span>
        <span class="sr-only"> — home</span>
      </a>
      <ul class="site-nav__links" role="list">
        <li>
          <a href={resolve("/")} class="site-nav__link" aria-current={currentPage === "/" ? "page" : undefined}>Home</a>
        </li>
        <li>
          <a href={resolve("/travel")} class="site-nav__link" aria-current={currentPage.startsWith("/travel") ? "page" : undefined}
            >Travel</a
          >
        </li>
        <li>
          <a href={resolve("/about")} class="site-nav__link" aria-current={currentPage === "/about" ? "page" : undefined}>About</a>
        </li>
      </ul>
      <button
        class="site-nav__hamburger"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen ? "true" : "false"}
        aria-controls="mobile-menu"
        onclick={toggleMenu}
      >
        <span class="hamburger-bar" aria-hidden="true"></span>
        <span class="hamburger-bar" aria-hidden="true"></span>
        <span class="hamburger-bar" aria-hidden="true"></span>
      </button>
    </nav>
  </div>
  <div class="site-nav__mobile-menu" id="mobile-menu" hidden={!menuOpen}>
    <ul class="site-nav__mobile-links" role="list">
      <li>
        <a href={resolve("/")} class="site-nav__mobile-link" aria-current={currentPage === "/" ? "page" : undefined} onclick={closeMenu}
          >Home</a
        >
      </li>
      <li>
        <a
          href={resolve("/travel")}
          class="site-nav__mobile-link"
          aria-current={currentPage.startsWith("/travel") ? "page" : undefined}
          onclick={closeMenu}>Travel</a
        >
      </li>
      <li>
        <a
          href={resolve("/about")}
          class="site-nav__mobile-link"
          aria-current={currentPage === "/about" ? "page" : undefined}
          onclick={closeMenu}>About</a
        >
      </li>
    </ul>
  </div>
</header>
