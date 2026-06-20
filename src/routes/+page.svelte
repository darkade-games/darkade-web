<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Home | Darkade</title>
</svelte:head>

<h1>Welcome to Darkade</h1>
<p>Your resource for blind-accessible videogames</p>

<h1>Games</h1>
{#each data.games as game}
<article class="card">
    <header>
        <h2>{game.title}</h2>
        <p>{game.description}</p>
    </header>
    <a href={"/game/" + game.slug}>View game</a>
</article>
{/each}
