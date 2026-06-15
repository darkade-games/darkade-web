<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { authClient } from "$lib/auth-client";

    let email = "";

    let error = $state("");

    async function forgotPassword(event: SubmitEvent) {
        event.preventDefault();

        const result = await authClient.requestPasswordReset({
            email,
            redirectTo: "/login/forgot-password/confirm"
        })

        goto("/login/forgot-password/confirm")

        if (result.error) {
            error = result.error.message ?? "An error has occured";
        }
    }
</script>

<svelte:head>
    <title>Forgot Password | Darkade</title>
</svelte:head>

<h1>Forgot Password</h1>

{#if error != ""}
<p>{error}</p>
{/if}

<form onsubmit={forgotPassword}>
    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email">

    <button type="submit">Next</button>
</form>
