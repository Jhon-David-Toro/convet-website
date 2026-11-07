import "server-only";

import { redirect } from "next/navigation";

import { verifySession } from "./auth.dal";
import type { AuthUser } from "./auth.dal";

const ROLE_HOME: Record<AuthUser["role"], string> = {
    CUSTOMER: "/app",
    STAFF: "/staff",
    ADMIN: "/admin",
};

/**
 * Requires an authenticated user with one of the allowed roles.
 *
 * @param allowedRoles Roles authorized to access the protected area.
 * @returns The authenticated user.
 */
export async function requireRole(
    allowedRoles: AuthUser["role"][],
): Promise<AuthUser> {
    const user = await verifySession();

    if (!user) {
        redirect("/sign-in");
    }

    if (!allowedRoles.includes(user.role)) {
        redirect(ROLE_HOME[user.role]);
    }

    return user;
}