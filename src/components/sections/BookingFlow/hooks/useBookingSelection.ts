import { useState } from "react";

import { ANY_VET_ID } from "@/lib/booking/booking.constants";
import { useLoadingDelay } from "@/lib/shared/useLoadingDelay";

import { EMPTY_SELECTION, LOADING_MS } from "../BookingFlow.constants";
import type {
  BookingSelection,
  BookingSelectionState,
  UseBookingSelectionParams,
} from "../BookingFlow.types";

/**
 * Manages the customer's booking selection and clears dependent fields
 * when the veterinarian or appointment date changes.
 *
 * @param params Initial pet and service identifiers.
 * @returns The selection, loading state and selection helpers.
 */
export function useBookingSelection({
  initialPetId,
  initialServiceId,
}: UseBookingSelectionParams): BookingSelectionState {
  const initialSelection: BookingSelection = {
    ...EMPTY_SELECTION,
    petId: initialPetId,
    serviceId: initialServiceId,
  };

  const [selection, setSelection] =
    useState<BookingSelection>(initialSelection);

  const { loading, start } = useLoadingDelay(LOADING_MS);

  /**
   * Changes one value of the booking selection.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setField<Field extends keyof BookingSelection>(
    field: Field,
    value: BookingSelection[Field],
  ) {
    setSelection((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /**
   * Selects a date, clears the selected time and starts the loading state.
   *
   * @param iso Date in YYYY-MM-DD format.
   */
  function chooseDate(iso: string) {
    setSelection((current) => ({
      ...current,
      date: iso,
      time: "",
    }));

    start();
  }

  /**
   * Selects a veterinarian and clears the previously selected date and time.
   *
   * @param vetId Veterinarian identifier, or "any".
   */
  function chooseVet(vetId: string) {
    setSelection((current) => ({
      ...current,
      vetId: vetId || ANY_VET_ID,
      date: "",
      time: "",
    }));
  }

  /**
   * Restores the initial booking selection.
   */
  function reset() {
    setSelection(initialSelection);
  }

  return {
    selection,
    loading,
    setField,
    chooseDate,
    chooseVet,
    reset,
  };
}