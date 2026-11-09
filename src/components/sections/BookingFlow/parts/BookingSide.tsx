import { BookingSummary } from "@/components/patterns/BookingSummary";

import type { BookingSideProps } from "../BookingFlow.types";
import { bookingSummary } from "../BookingFlow.utils";

/**
 * Card at the side of the booking with what is chosen so far.
 *
 * @param props Props of the component, see {@link BookingSideProps}.
 * @param props.selection What is selected so far.
 * @param props.pets Customer's registered pets.
 * @returns The rendered element.
 */
export function BookingSide({ selection, pets }: BookingSideProps) {
  return (
    <BookingSummary
      {...bookingSummary(selection, pets)}
    />
  );
}