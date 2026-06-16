import { db } from "$lib/server/db";
import { accessibilityRating, games, mods, mods as modsTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { requireAdmin } from "$lib/server/require-admin";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const [game] = await db.select().from(games).where(eq(games.id, Number(event.params.id))).limit(1);
    const accessibilityRatings = accessibilityRating.enumValues;
    const mods = await db.select().from(modsTable).where(eq(modsTable.gameId, Number(event.params.id)));

    return {
        game,
        mods,
        accessibilityRatings
    }
}

export const actions: Actions = {
    edit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();

        await db.update(games).set({
            title: String(data.get("title")),
            slug: String(data.get("slug")),
            description: String(data.get("description")),
            accessibilityRating: String(data.get("accessibilityRating")) as (typeof accessibilityRating.enumValues)[number]
        }).where(eq(games.id, Number(event.params.id)))

        return {
            success: true
        }
    },
    delete: async (event) => {
        requireAdmin(event);

        await db.delete(games).where(eq(games.id, Number(event.params.id)))

        return redirect(303, "/");
    }
}
