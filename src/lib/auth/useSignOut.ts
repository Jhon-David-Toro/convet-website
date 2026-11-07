"use client";

import { useRouter } from "next/navigation";

import { SIGN_IN_HREF } from "./auth.constants";

/**
 * Signs the user out: asks the server to clear the httpOnly access cookie (the browser cannot touch it) and then goes to sign in.
 * It only navigates when the cookie was cleared, otherwise the sign-in page would send the user straight back into the app.
 *
 * @returns The function that signs the user out.
 */
export function useSignOut(): () => Promise<void> {
  const router = useRouter();

  return async function signOut() {
    const response = await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    if (!response?.ok) return;
    router.replace(SIGN_IN_HREF);
    router.refresh();
  };
}
