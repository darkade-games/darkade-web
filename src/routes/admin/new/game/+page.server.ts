import { db } from "$lib/server/db";
import { accessibilityRating, games, gamesToPlatforms, platforms as platformsTable } from "$lib/server/db/schema";
import { requireAdmin } from "$lib/server/require-admin";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
    const platforms = await db.select().from(platformsTable);

    return {
        accessibilityRatings: accessibilityRating.enumValues,
        platforms
    }
}

export const actions: Actions = {
    submit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();
        const platforms = data.getAll("platform");

        let success = false;

        try {
            const [game] = await db.insert(games).values({
                title: String(data.get('title')),
                slug: String(data.get('slug')),
                description: String(data.get('description')),
                accessibilityRating: String(data.get('accessibilityRating')) as (typeof accessibilityRating.enumValues)[number]
            })
            .returning();

            if (platforms.length > 0) {
                await db.insert(gamesToPlatforms).values(
                    platforms.map((platform) => ({
                        gameId: game.id,
                        platformId: Number(platform)
                    }))
                );
            }

            success = true;
        } catch {
            success = false;
        }

        return {
            success
        }
    }
}
