<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.game.title} | Darkade</title>
</svelte:head>

<h1>{data.game.title}</h1>

{#if data.user?.isAdmin}
<a href="/admin/manage/game/{data.game.id}">Manage</a>
{/if}

{#if data.mods.length != 0}
    With
    {#each data.mods as mod, i}
        <a href={mod.website}>{mod.name} ({mod.status})</a> {i < data.mods.length - 1 ? ', ' : ''}
    {/each}
{/if}

<p>{data.game.accessibilityRating}</p>

<p>{data.game.description}</p>