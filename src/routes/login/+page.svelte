<script lang="ts">
    import { authClient } from "$lib/auth-client";

    let email = "";
    let password = "";

    let error = $state("");

    async function login(event: SubmitEvent) {
        event.preventDefault();

        const result = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/"
        })

        if (result.error) {
            error = result.error.message ?? "An error has occured";
        }
    }
</script>

<svelte:head>
    <title>Log in | Darkade</title>
</svelte:head>

<h1>Log In</h1>

{#if error != ""}
<p>{error}</p>
{/if}

<form onsubmit={login}>
    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email">

    <label for="password">Password</label>
    <input bind:value={password} type="password" id="password">

    <button type="submit">Log in</button>
</form>

<p>Don't have an account yet? <a href="/register">Create one</a></p>
