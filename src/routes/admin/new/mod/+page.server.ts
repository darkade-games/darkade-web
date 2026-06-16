import { db } from "$lib/server/db";
import { games as gamesTable, mods, modStatus } from "$lib/server/db/schema";
import { requireAdmin } from "$lib/server/require-admin";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
    const games = await db.select().from(gamesTable);

    return {
        games,
        statuses: modStatus.enumValues
    }
}

export const actions: Actions = {
    submit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();

        let success = false;

        await db.insert(mods).values({
            name: String(data.get('name')),
            slug: String(data.get('slug')),
            website: String(data.get('website')),
            gameId: String(data.get('gameId')),
            status: String(data.get('status'))
        })
        .then(() => success = true)

        return {
            success
        }
    }
}
