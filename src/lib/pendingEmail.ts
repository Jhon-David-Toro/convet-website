import { PENDING_EMAIL_KEY } from "./pendingEmail.constants";

/**
 * Remembers the address a verification code was sent to, for this tab only, so it never travels in a URL.
 * Storage can be blocked (private windows), in which case nothing is remembered.
 *
 * @param email Address the code was sent to.
 */
export function savePendingEmail(email: string): void {
  try {
    window.sessionStorage.setItem(PENDING_EMAIL_KEY, email);
  } catch {
    // Storage is blocked: the verification page falls back to a generic text.
  }
}

/**
 * Reads the address a verification code was sent to.
 *
 * @returns The address, or `null` when none was saved or storage is blocked.
 */
export function readPendingEmail(): string | null {
  try {
    return window.sessionStorage.getItem(PENDING_EMAIL_KEY);
  } catch {
    return null;
  }
}
