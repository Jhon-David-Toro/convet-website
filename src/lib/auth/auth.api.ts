import type { AuthRole, SignInFailure, SignInResult, SignInValues } from "@/components/sections/SignInForm/SignInForm.types";

import { ROLES } from "./auth.contract";
import { LOGIN_ROUTE } from "./session.constants";

/** HTTP statuses of `/api/auth/login` that mean the credentials were checked and refused. */
const REFUSED_STATUSES = new Set([400, 401]);

/**
 * Why a failed sign-in failed: refused credentials, or a service that could not check them.
 *
 * @param status HTTP status of the answer.
 * @returns The reason to show.
 */
export function failureReason(status: number): SignInFailure {
  return REFUSED_STATUSES.has(status) ? "credentials" : "unavailable";
}

/**
 * Reads the role out of the answer of `/api/auth/login`.
 *
 * @param body Parsed JSON body.
 * @returns The role, or `undefined` when the answer is not a signed-in user.
 */
function roleFrom(body: unknown): AuthRole | undefined {
  const user = typeof body === "object" && body !== null && "user" in body ? body.user : undefined;
  const role = typeof user === "object" && user !== null && "role" in user ? user.role : undefined;
  return ROLES.find((candidate) => candidate === role);
}

/**
 * Signs in through the Next.js route, which keeps the token in an httpOnly cookie. Only the email and the password are sent.
 * The email is trimmed and lowercased first, as sign-up stores it; the backend matches emails exactly.
 *
 * @param values Values of the sign-in form.
 * @returns The role of the user, or why it failed.
 */
export async function signIn(values: SignInValues): Promise<SignInResult> {
  try {
    const response = await fetch(LOGIN_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email.trim().toLowerCase(), password: values.password }),
    });
    if (!response.ok) return { ok: false, reason: failureReason(response.status) };

    const role = roleFrom(await response.json().catch(() => undefined));
    return role ? { ok: true, role } : { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
