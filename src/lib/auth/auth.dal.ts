import "server-only";

import { cache } from "react";

import { apiRequest } from "@/lib/api/api.client";

import { authUserSchema } from "./auth.contract";
import type { AuthUser } from "./auth.contract";
import { AUTH_ME_ENDPOINT } from "./session.constants";

export type { AuthUser } from "./auth.contract";

/**
 * Retrieves the authenticated user's public information, once per request.
 *
 * @returns The authenticated user or null when there is no valid session (or the backend cannot confirm it).
 */
export const verifySession = cache(async (): Promise<AuthUser | null> => {
  try {
    return await apiRequest(AUTH_ME_ENDPOINT, { schema: authUserSchema });
  } catch {
    return null;
  }
});
