import { db } from "$lib/server/db";
import { eq, inArray } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { games, gamesToPlatforms, mods as modsTable, platforms as platformsTable } from "$lib/server/db/schema";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const [game] = await db.select().from(games).where(eq(games.slug, event.params.slug)).limit(1);
    if (!game) return error(404, "Game not found");

    const mods = await db.select().from(modsTable).where(eq(modsTable.gameId, game.id));

    const platformIds = (await db.select().from(gamesToPlatforms).where(eq(gamesToPlatforms.gameId, game.id))).map((gamePlatform) => gamePlatform.platformId)
    const platforms = await db.select().from(platformsTable).where(inArray(platformsTable.id, platformIds));

    return {
        game,
        platforms,
        mods
    }
}