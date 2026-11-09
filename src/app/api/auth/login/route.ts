import { NextResponse } from "next/server";

import { apiRequest } from "@/lib/api/api.client";
import { loginResponseSchema } from "@/lib/auth/auth.contract";
import { loginFailure, readCredentials, setSessionCookie } from "@/lib/auth/auth.route";

/**
 * Signs a user in: validates the credentials, asks the backend for a token and stores it in an httpOnly cookie.
 * The token is never part of the JSON answer, so it never reaches the browser's JavaScript.
 *
 * @param request Request with `{ email, password }`.
 * @returns The signed-in user, or a safe error.
 */
export async function POST(request: Request) {
  const credentials = await readCredentials(request);
  if (!credentials) return NextResponse.json({ message: "Invalid login request" }, { status: 400 });

  try {
    const { accessToken, user } = await apiRequest("/auth/login", { method: "POST", body: credentials, auth: false, schema: loginResponseSchema });
    return setSessionCookie(NextResponse.json({ user }), accessToken);
  } catch (error) {
    return loginFailure(error);
  }
}
