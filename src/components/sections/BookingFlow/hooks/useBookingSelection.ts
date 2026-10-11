import { useState } from "react";

import { ANY_VET_ID } from "@/lib/booking/booking.constants";
import { useLoadingDelay } from "@/lib/shared/useLoadingDelay";

import { EMPTY_SELECTION, LOADING_MS } from "../BookingFlow.constants";
import type { BookingSelection, BookingSelectionState, UseBookingSelectionParams } from "../BookingFlow.types";

/**
 * What the customer has chosen so far in the booking, with the helpers that clear what depends on a choice:
 * a new vet or day clears the time, and a new day starts the "looking for times" placeholder.
 *
 * @param params Parameters of the hook, see {@link UseBookingSelectionParams}.
 * @param params.initialServiceId Service chosen before the booking opens (the "Book" buttons of the service pages).
 * @returns The selection, whether the times are loading and the functions that change it.
 */
export function useBookingSelection({ initialServiceId }: UseBookingSelectionParams): BookingSelectionState {
  const [selection, setSelection] = useState<BookingSelection>({ ...EMPTY_SELECTION, serviceId: initialServiceId });
  const { loading, start } = useLoadingDelay(LOADING_MS);

  /**
   * Changes one value of the selection.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setField<Field extends keyof BookingSelection>(field: Field, value: BookingSelection[Field]) {
    setSelection((current) => ({ ...current, [field]: value }));
  }

  /**
   * Picks a day, clears the time and shows the loading placeholder while the times are looked up.
   *
   * @param iso Day as `YYYY-MM-DD`.
   */
  function chooseDate(iso: string) {
    setSelection((current) => ({ ...current, date: iso, time: "" }));
    start();
  }

  /**
   * Picks a vet; the day and time of another vet no longer apply.
   *
   * @param vetId Id of the vet, or "any".
   */
  function chooseVet(vetId: string) {
    setSelection((current) => ({ ...current, vetId: vetId || ANY_VET_ID, date: "", time: "" }));
  }

  return { selection, loading, setField, chooseDate, chooseVet, reset: () => setSelection(EMPTY_SELECTION) };
}
