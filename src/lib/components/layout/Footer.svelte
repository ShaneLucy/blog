<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<!-- role="contentinfo" is implicit on <footer>; omitting the explicit role avoids redundancy -->
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__inner">
      <p class="site-footer__copy">
        &copy; <time datetime="2026">2026</time> Wandering Pages.
      </p>
      <nav class="site-footer__nav" aria-label="Footer navigation">
        <ul role="list">
          <li><a href={resolve("/about")}>About</a></li>
        </ul>
      </nav>
    </div>
  </div>
</footer>
