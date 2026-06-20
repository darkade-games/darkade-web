<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Add New Platform | Darkade</title>
</svelte:head>

<h1>Add new platform</h1>

<form method="post" action="?/submit">
    <label for="name">Name</label>
    <input id="name" name="name">

    <label for="slug">Slug</label>
    <input id="slug" name="slug">

    <button type="submit">Create</button>
</form>
