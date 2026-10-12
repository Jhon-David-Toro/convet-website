import type { FormModalStatus } from "./useFormModal.types";

/**
 * Calls `onDone` after a delay.
 *
 * @param onDone Called when the delay is over.
 * @param delay Milliseconds to wait.
 * @returns The cleanup that cancels the wait.
 */
export function scheduleDone(onDone: () => void, delay: number): () => void {
  const timer = setTimeout(onDone, delay);
  return () => clearTimeout(timer);
}

/**
 * Finishes saving after a delay, but only while the form is saving.
 *
 * @param status Step of saving the form.
 * @param delay Milliseconds to wait.
 * @param onDone Called when the delay is over.
 * @returns The cleanup that cancels the wait, or nothing when the form is not saving.
 */
export function finishSaving(status: FormModalStatus, delay: number, onDone: () => void): (() => void) | undefined {
  return status === "saving" ? scheduleDone(onDone, delay) : undefined;
}
