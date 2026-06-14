import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { games, mods as modsTable } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const [game] = await db.select().from(games).where(eq(games.slug, event.params.slug)).limit(1);
    if (!game) return error(404, "Game not found");

    const mods = await db.select().from(modsTable).where(eq(modsTable.gameId, game.id));

    return {
        game,
        mods
    }
}