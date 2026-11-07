import "server-only";

import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/api.errors";
import type { ApiErrorKind } from "@/lib/api/api.types";

import { loginRequestSchema } from "./auth.contract";
import type { LoginRequest } from "./auth.contract";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_MAX_AGE } from "./session.constants";

/** Status and public message the login endpoint answers for each kind of failure. */
const LOGIN_FAILURES: Partial<Record<ApiErrorKind, { status: number; message: string }>> = {
  unauthorized: { status: 401, message: "Invalid email or password" },
  validation: { status: 400, message: "Unable to authenticate" },
  "not-configured": { status: 500, message: "Authentication service is not configured" },
  network: { status: 503, message: "Authentication service is unavailable" },
  timeout: { status: 503, message: "Authentication service is unavailable" },
  "invalid-response": { status: 502, message: "Invalid authentication response" },
};

const DEFAULT_LOGIN_FAILURE = { status: 502, message: "Unable to authenticate" };

/**
 * Reads and validates the credentials a request carries.
 *
 * @param request Request to `/api/auth/login`.
 * @returns The trimmed credentials, or `null` when the body is not valid JSON or lacks them.
 */
export async function readCredentials(request: Request): Promise<LoginRequest | null> {
  const body: unknown = await request.json().catch(() => undefined);
  const parsed = loginRequestSchema.safeParse(body);
  return parsed.success ? parsed.data : null;
}

/**
 * Builds the answer of a failed login without leaking details of the backend.
 *
 * @param error What went wrong.
 * @returns A JSON response with a safe message and status.
 */
export function loginFailure(error: unknown): NextResponse {
  const { status, message } = (error instanceof ApiError && LOGIN_FAILURES[error.kind]) || DEFAULT_LOGIN_FAILURE;
  return NextResponse.json({ message }, { status });
}

/**
 * Stores the access token in an httpOnly cookie; an empty token with no age clears it.
 *
 * @param response Response to put the cookie on.
 * @param token Access token, or an empty string to sign out.
 * @returns The same response.
 */
export function setSessionCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: token ? ACCESS_TOKEN_MAX_AGE : 0,
  });
  return response;
}
