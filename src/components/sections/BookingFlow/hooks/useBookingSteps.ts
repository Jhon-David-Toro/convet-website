import { useState } from "react";

import type { BookingStepId, StepsState } from "../BookingFlow.types";
import { stepAt } from "../BookingFlow.utils";

/**
 * The step of the booking the customer is on and the functions that move between steps.
 *
 * @returns The step and the functions that change it.
 */
export function useBookingSteps(): StepsState {
  const [step, setStep] = useState<BookingStepId>("pet");

  return {
    step,
    back: () => setStep((current) => stepAt(current, -1)),
    next: () => setStep((current) => stepAt(current, 1)),
    goTo: setStep,
    toStart: () => setStep("pet"),
  };
}
