import { db } from "$lib/server/db";
import { mods, modStatus } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { requireAdmin } from "$lib/server/require-admin";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const [mod] = await db.select().from(mods).where(eq(mods.id, Number(event.params.id))).limit(1);
    const statuses = modStatus.enumValues;

    return {
        mod,
        statuses
    }
}

export const actions: Actions = {
    edit: async (event) => {
        requireAdmin(event);

        const data = await event.request.formData();

        await db.update(mods).set({
            name: String(data.get("name")),
            website: String(data.get("website")),
            status: String(data.get("status")) as (typeof modStatus.enumValues)[number]
        }).where(eq(mods.id, Number(event.params.id)))

        return {
            success: true
        }
    },
    delete: async (event) => {
        requireAdmin(event);

        await db.delete(mods).where(eq(mods.id, Number(event.params.id)))

        return redirect(303, "/");
    }
}
