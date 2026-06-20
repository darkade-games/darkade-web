<script lang="ts">
    import { prettifyAccessibilityRating } from "$lib/prettify-enum";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Manage {data.game.title} | Darkade</title>
</svelte:head>

<h1>Manage {data.game.title}</h1>

<form method="post" action="?/edit">
    <label for="title">Title</label>
    <input id="Title" name="title" value={data.game.title}>

    <label for="slug">Slug</label>
    <input id="slug" name="slug" value={data.game.slug}>

    <label for="description">Description</label>
    <textarea id="description" name="description" value={data.game.description}></textarea>

    <fieldset>
        <legend>Accessibility Rating</legend>

        {#each data.accessibilityRatings as accessibilityRating}
        <label>
            <input type="radio" name="accessibilityRating" value={accessibilityRating} checked={data.game.accessibilityRating == accessibilityRating}>
            {prettifyAccessibilityRating(accessibilityRating)}
        </label>
        {/each}
    </fieldset>

    <button type="submit">Update</button>
</form>

<form method="POST" action="?/delete">
<button type="submit">Delete</button>
</form>

{#if data.mods.length > 0}
<h1>Manage mods for {data.game.title}</h1>

<ul>
    {#each data.mods as mod}
    <li><a href="/admin/manage/mod/{mod.id}">{mod.name}</a></li>
    {/each}
</ul>
{/if}
