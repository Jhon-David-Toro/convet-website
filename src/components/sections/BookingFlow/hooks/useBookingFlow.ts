import { useState } from "react";

import type { BookingSlot } from "@/lib/booking/booking.types";

import type { BookingFlowState, UseBookingFlowParams } from "../BookingFlow.types";
import { canContinueFrom } from "../BookingFlow.utils";
import { useBookingSelection } from "./useBookingSelection";
import { useBookingSteps } from "./useBookingSteps";

/**
 * State machine of the booking: the step the customer is on, what they chose, and the confirmation that can fail when the
 * time was taken in the meantime (the customer is then offered nearby times).
 *
 * @param params Parameters of the hook, see {@link UseBookingFlowParams}.
 * @param params.initialServiceId Service chosen before the booking opens.
 * @param params.onConfirm Asks the clinic to book the visit; without it the booking is always accepted.
 * @returns The state and the functions that move through the booking.
 */
export function useBookingFlow({ initialServiceId = "", onConfirm }: UseBookingFlowParams): BookingFlowState {
  const selectionState = useBookingSelection({ initialServiceId });
  const { toStart, goTo, ...steps } = useBookingSteps();
  const { selection, setField, reset } = selectionState;
  const [alternatives, setAlternatives] = useState<BookingSlot[] | null>(null);
  const [confirming, setConfirming] = useState(false);

  /** Sends the request and moves to the confirmation, or shows the nearby times when the time was taken. */
  async function confirm() {
    setConfirming(true);
    const result = onConfirm ? await onConfirm(selection) : { ok: true as const };
    setConfirming(false);
    if (result.ok) goTo("confirmed");
    else setAlternatives(result.alternatives);
  }

  /**
   * Takes one of the nearby times after the first one was taken.
   *
   * @param time Time the customer picked.
   */
  function pickAlternative(time: string) {
    setField("time", time);
    setAlternatives(null);
  }

  /** Starts a new booking from the first step. */
  function restart() {
    reset();
    toStart();
  }

  return { ...selectionState, ...steps, goTo, alternatives, confirming, canContinue: canContinueFrom(steps.step, selection), confirm, restart, pickAlternative };
}
