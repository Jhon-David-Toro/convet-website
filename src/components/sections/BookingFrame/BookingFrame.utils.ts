import type { BookingStepState } from "@/components/patterns/BookingStep";

/**
 * State of a step of the stepper compared with the one the customer is on.
 *
 * @param index Position of the step, from 0.
 * @param current Position of the current step; past the last step when everything is done.
 * @returns `done` before the current step, `current` on it and `upcoming` after it.
 */
export function stepState(index: number, current: number): BookingStepState {
  if (index < current) return "done";
  return index === current ? "current" : "upcoming";
}

/**
 * Text of the progress line on mobile, e.g. "Step 4 of 5 · Date & time".
 *
 * @param steps Names of the steps.
 * @param current Position of the current step, from 0; past the last step it shows the last one.
 * @returns The progress text.
 */
export function progressLabel(steps: string[], current: number): string {
  const position = Math.min(current, steps.length - 1);
  return `Step ${position + 1} of ${steps.length} · ${steps[position]}`;
}

/**
 * Share of the progress bar that is filled.
 *
 * @param steps Names of the steps.
 * @param current Position of the current step, from 0; past the last step the bar is full.
 * @returns A percentage from 0 to 100.
 */
export function progressPercent(steps: string[], current: number): number {
  return (Math.min(current + 1, steps.length) / steps.length) * 100;
}
