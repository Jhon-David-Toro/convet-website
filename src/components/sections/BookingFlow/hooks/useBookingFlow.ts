import { useState } from "react";

import type { BookingSlot } from "@/lib/booking/booking.types";

import type {
  BookingFlowState,
  UseBookingFlowParams,
} from "../BookingFlow.types";
import { canContinueFrom } from "../BookingFlow.utils";
import { useBookingSelection } from "./useBookingSelection";
import { useBookingSteps } from "./useBookingSteps";

/**
 * Manages the booking flow state, selection and navigation between steps.
 *
 * @param params Initial pet, service and optional confirmation callback.
 * @returns The booking state and navigation helpers.
 */
export function useBookingFlow({
  initialPetId,
  initialServiceId = "",
  onConfirm,
}: UseBookingFlowParams): BookingFlowState {
  const selectionState = useBookingSelection({
    initialPetId,
    initialServiceId,
  });

  const { toStart, goTo, ...steps } = useBookingSteps();

  const { selection, setField, reset } = selectionState;

  const [alternatives, setAlternatives] =
    useState<BookingSlot[] | null>(null);

  const [confirming, setConfirming] = useState(false);

  /**
   * Confirms the booking and moves to the confirmation step,
   * or displays alternative slots when the selected time is unavailable.
   */
  async function confirm() {
    setConfirming(true);

    try {
      const result = onConfirm
        ? await onConfirm(selection)
        : { ok: true as const };

      if (result.ok) {
        goTo("confirmed");
      } else {
        setAlternatives(result.alternatives);
      }
    } finally {
      setConfirming(false);
    }
  }

  /**
   * Selects an alternative time after the original slot becomes unavailable.
   *
   * @param time Alternative time.
   */
  function pickAlternative(time: string) {
    setField("time", time);
    setAlternatives(null);
  }

  /**
   * Restarts the booking flow using its initial selection.
   */
  function restart() {
    reset();
    setAlternatives(null);
    toStart();
  }

  return {
    ...selectionState,
    ...steps,
    goTo,
    alternatives,
    confirming,
    canContinue: canContinueFrom(steps.step, selection),
    confirm,
    restart,
    pickAlternative,
  };
}