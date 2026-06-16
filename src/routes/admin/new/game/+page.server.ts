import { db } from "$lib/server/db";
import { accessibilityRating, games } from "$lib/server/db/schema";
import { requireAdmin } from "$lib/server/require-admin";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
    return {
        accessibilityRatings: accessibilityRating.enumValues
    }
}

export const actions: Actions = {
    submit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();

        let success = false;

        await db.insert(games).values({
            title: String(data.get('title')),
            slug: String(data.get('slug')),
            description: String(data.get('description')),
            accessibilityRating: String(data.get('accessibilityRating')) as (typeof accessibilityRating.enumValues)[number]
        })
        .then(() => success = true)

        return {
            success
        }
    }
}
