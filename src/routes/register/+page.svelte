<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";

    let name = "";
    let email = "";
    let password = "";

    let error = $state("");

    async function register(event: SubmitEvent) {
        event.preventDefault();

        const result = await authClient.signUp.email({
            name,
            email,
            password
        })

        if (result.error) {
            error = result.error.message ?? "An error has occured";
        } else goto("/register/confirm")
    }
</script>

<svelte:head>
    <title>Create Account | Darkade</title>
</svelte:head>

<h1>Create Account</h1>

{#if error != ""}
<p>{error}</p>
{/if}

<form onsubmit={register}>
    <label for="username">Username</label>
    <input bind:value={name} id="username">

    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email">

    <label for="password">Password</label>
    <input bind:value={password} type="password" id="password">

    <button type="submit">Sign up</button>
</form>
