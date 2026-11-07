import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import {
    ACCESS_TOKEN_COOKIE,
    AUTH_ME_ENDPOINT,
} from "./session.constants";

export type AuthUser = {
    idUser: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "CUSTOMER" | "STAFF" | "ADMIN";
};

const VALID_ROLES = ["CUSTOMER", "STAFF", "ADMIN"];

/**
 * Retrieves the authenticated user's public information.
 *
 * @returns The authenticated user or null when the session is invalid.
 */
export const verifySession = cache(async (): Promise<AuthUser | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

    if (!accessToken) {
        return null;
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
        return null;
    }

    try {
        const endpoint = new URL(
            AUTH_ME_ENDPOINT,
            backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`,
        );

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const user: unknown = await response.json();

        if (
            typeof user !== "object" ||
            user === null ||
            !("idUser" in user) ||
            !("firstName" in user) ||
            !("lastName" in user) ||
            !("email" in user) ||
            !("role" in user) ||
            typeof user.idUser !== "string" ||
            typeof user.firstName !== "string" ||
            typeof user.lastName !== "string" ||
            typeof user.email !== "string" ||
            typeof user.role !== "string" ||
            !VALID_ROLES.includes(user.role)
        ) {
            return null;
        }

        return {
            idUser: user.idUser,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role as AuthUser["role"],
        };
    } catch {
        return null;
    }
});