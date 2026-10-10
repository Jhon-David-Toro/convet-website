import { SECOND_MS, SECONDS_PER_MINUTE } from "./VerifyEmailForm.constants";

/**
 * Formats a number of seconds as `m:ss`.
 *
 * @param seconds Seconds left.
 * @returns The time, e.g. `0:42`.
 */
export function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  return `${minutes}:${String(seconds % SECONDS_PER_MINUTE).padStart(2, "0")}`;
}

/**
 * Calls a function every second while it is enabled.
 *
 * @param callback Function to call on every tick.
 * @param enabled Whether the ticking is on.
 * @returns A function that stops the ticking, or `undefined` when it is not enabled.
 */
export function repeatEverySecond(callback: () => void, enabled: boolean): (() => void) | undefined {
  if (!enabled) return undefined;
  const timer = window.setInterval(callback, SECOND_MS);
  return () => window.clearInterval(timer);
}

/**
 * Subtitle of the page: where the code was sent and how long it lasts.
 *
 * @param email Address the code was sent to.
 * @returns The subtitle.
 */
export function verifySubtitle(email: string): string {
  return `We sent a 6-digit code to ${email}. It expires in 10 minutes.`;
}
