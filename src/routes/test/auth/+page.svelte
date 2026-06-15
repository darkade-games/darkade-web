<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    async function logout() {
        await authClient.signOut();

        goto("/")
    }
</script>

<svelte:head>
    <title>Auth Test | Darkade</title>
</svelte:head>

{#if data.user}
Currently logged in as: {data.user?.name}

<button onclick={logout}>Log out</button>
{:else}
You're not logged in
{/if}
