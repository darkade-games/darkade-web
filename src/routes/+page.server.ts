import { db } from "$lib/server/db";
import { games as gamesTable } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const games = await db.select().from(gamesTable);

    return {
        games
    }
}
