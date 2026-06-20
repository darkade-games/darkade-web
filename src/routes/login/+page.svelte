<script lang="ts">
    import { page } from "$app/state";
    import { authClient } from "$lib/auth-client";

    let email = "";
    let password = "";

    let error = $state("");

    async function login(event: SubmitEvent) {
        event.preventDefault();

        let callbackURL = page.url.searchParams.get("callback")

        const result = await authClient.signIn.email({
            email,
            password,
            callbackURL: callbackURL ? callbackURL : "/"
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

<a href="/login/forgot-password">Forgot password?</a>
<p>Don't have an account yet? <a href="/register">Create one</a></p>
