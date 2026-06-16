import type { RequestEvent } from "@sveltejs/kit";
import { error } from "console";

export const requireAdmin = (event: RequestEvent) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, "Unauthorized");
    }

    if (!user.isAdmin) {
        throw error(403, "Forbidden")
    }
}