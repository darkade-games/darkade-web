<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Add New Mod | Darkade</title>
</svelte:head>

<h1>Add new mod</h1>

<form method="post" action="?/submit">
    <label for="name">Name</label>
    <input id="name" name="name">

    <label for="slug">Slug</label>
    <input id="slug" name="slug">

    <label for="website">Website</label>
    <input id="website" name="website">

    <fieldset>
        <legend>Game</legend>

        {#each data.games as game}
        <label>
            <input type="radio" name="gameId" value={game.id}>
            {game.title}
        </label>
        {/each}
    </fieldset>

    <fieldset>
        <legend>Status</legend>

        {#each data.statuses as status}
        <label>
            <input type="radio" name="status" value={status}>
            {status}
        </label>
        {/each}
    </fieldset>

    <button type="submit">Create</button>
</form>
