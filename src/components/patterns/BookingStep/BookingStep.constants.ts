import type { BookingStepState } from "./BookingStep.types";

/** Size in px of the check icon shown on completed steps. */
export const BOOKING_STEP_CHECK_SIZE = 16;

/** State of a step already completed (shows a check). */
export const DONE_STEP_STATE: BookingStepState = "done";

/** State of the step the user is on (`aria-current="step"`). */
export const CURRENT_STEP_STATE: BookingStepState = "current";
