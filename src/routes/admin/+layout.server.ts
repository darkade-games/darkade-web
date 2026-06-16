import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        return redirect(303, "/login");
    }

    if (!user.isAdmin) {
        return error(403, "Forbidden");
    }
}