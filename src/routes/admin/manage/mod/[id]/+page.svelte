<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Manage {data.mod.name} | Darkade</title>
</svelte:head>

<h1>Manage {data.mod.name}</h1>

<form method="post" action="?/edit">
    <label for="name">Name</label>
    <input id="name" name="name" value={data.mod.name}>

    <label for="slug">Slug</label>
    <input id="slug" name="slug">

    <label for="website">Website</label>
    <input id="website" name="website" value={data.mod.website}>

    <fieldset>
        <legend>Status</legend>

        {#each data.statuses as status}
        <label>
            <input type="radio" name="status" value={status} checked={data.mod.status == status}>
            {status}
        </label>
        {/each}
    </fieldset>

    <button type="submit">Update</button>
</form>

<form method="post" action="?/delete">
    <button type="submit">Delete</button>
</form>
