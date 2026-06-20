<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";

    async function logout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    goto("/");
                }
            }
        });
    }

    logout();
</script>
