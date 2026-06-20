import { db } from "$lib/server/db";
import { platforms } from "$lib/server/db/schema";
import { requireAdmin } from "$lib/server/require-admin";
import type { Actions } from "./$types";

export const actions: Actions = {
    submit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();

        await db.insert(platforms).values({
            name: String(data.get("name")),
            slug: String(data.get("slug")),
        });
    }
}
