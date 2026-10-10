import { useSyncExternalStore } from "react";

import { readPendingEmail } from "@/lib/pendingEmail";

import { FALLBACK_EMAIL } from "../VerifyEmailForm.constants";

/**
 * Subscribes to nothing: the pending address only changes by navigating to the page.
 *
 * @returns A function that unsubscribes (it does nothing).
 */
function subscribeNever() {
  return () => {};
}

/**
 * Address the verification code was sent to, read from this tab's storage after hydration.
 *
 * @returns The saved address, or a generic text when there is none.
 */
export function usePendingEmail(): string {
  return useSyncExternalStore(subscribeNever, () => readPendingEmail() ?? FALLBACK_EMAIL, () => FALLBACK_EMAIL);
}
