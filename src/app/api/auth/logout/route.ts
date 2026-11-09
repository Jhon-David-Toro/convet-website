import { NextResponse } from "next/server";

import { setSessionCookie } from "@/lib/auth/auth.route";

/**
 * Signs the user out by clearing the access token cookie.
 *
 * @returns A success answer with the cookie removed.
 */
export async function POST() {
  return setSessionCookie(NextResponse.json({ success: true }), "");
}
