<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Add New Game | Darkade</title>
</svelte:head>

<h1>Add new game</h1>

<form method="post" action="?/submit">
    <label for="title">Title</label>
    <input id="Title" name="title">

    <label for="slug">Slug</label>
    <input id="slug" name="slug">

    <label for="description">Description</label>
    <textarea id="description" name="description"></textarea>

    <fieldset>
        <legend>Accessibility Rating</legend>

        {#each data.accessibilityRatings as accessibilityRating}
        <label>
            <input type="radio" name="accessibilityRating" value={accessibilityRating}>
            {accessibilityRating}
        </label>
        {/each}
    </fieldset>

    <button type="submit">Create</button>
</form>
