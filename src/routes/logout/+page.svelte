<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { authClient } from "$lib/auth-client";

    async function logout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    invalidateAll();
                    goto("/");
                }
            }
        });
    }

    logout();
</script>
