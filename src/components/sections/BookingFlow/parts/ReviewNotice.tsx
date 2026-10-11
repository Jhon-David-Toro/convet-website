import { Alert } from "@/components/ui/Alert";
import { SLOT_CAPACITY } from "@/lib/booking/booking.constants";
import { slotsFor } from "@/lib/booking/booking.utils";

import type { ReviewNoticeProps } from "../BookingFlow.types";

/**
 * Info alert that says how many places the chosen time has left.
 *
 * @param props Props of the component, see {@link ReviewNoticeProps}.
 * @param props.selection What is selected so far.
 * @param props.vet Vet whose agenda is used.
 * @returns The rendered element.
 */
export function ReviewNotice({ selection, vet }: ReviewNoticeProps) {
  const left = slotsFor(vet, selection.date).find((slot) => slot.time === selection.time)?.left ?? 0;

  return (
    <Alert tone="info" title={`${selection.time} has ${left} of ${SLOT_CAPACITY} places left`}>
      Your request holds one place for your pet. If the time fills up while you review, we will offer the next free 10-min slot.
    </Alert>
  );
}
