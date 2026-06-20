<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children, data } = $props();
</script>

<svelte:head>
  <title>Darkade</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav data-topnav>
  <a href="/">Home</a>
  {#if data.user}
  <a href="/logout">Log out</a>
  {:else}
  <a href="/login">Log in</a>
  <a href="/register">Register</a>
  {/if}
</nav>

<main>
  {@render children()}
</main>
