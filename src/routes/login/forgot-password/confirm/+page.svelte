<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { authClient } from "$lib/auth-client";

    let password1 = "";
    let password2 = ""

    let error = $state("");

    const token = page.url.searchParams.get("token");

    async function forgotPassword(event: SubmitEvent) {
        event.preventDefault();

        if (!token) return;

        if (password1 != password2) {
            error = "Passwords do not match";
            return;
        }

        const result = await authClient.resetPassword({
            newPassword: password1,
            token
        })

        goto("/login")

        if (result.error) {
            error = result.error.message ?? "An error has occured";
        }
    }
</script>

<svelte:head>
    <title>Confirm Password Reset | Darkade</title>
</svelte:head>

{#if token}
<h1>Forgot Password</h1>

{#if error != ""}
<p>{error}</p>
{/if}

<form onsubmit={forgotPassword}>
    <label for="password1">Password</label>
    <input bind:value={password1} type="password" id="password1">

        <label for="password2">Confirm Password</label>
    <input bind:value={password2} type="password" id="password2">

    <button type="submit">Reset Password</button>
</form>
{:else}
<p>We sent you an email to confirm your password reset. Check your email!</p>
{/if}