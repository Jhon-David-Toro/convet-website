import { BookingSummary } from "@/components/patterns/BookingSummary";
import { agendaVet } from "@/lib/booking/booking.utils";

import type { StepReviewProps } from "../BookingFlow.types";
import { bookingSummary } from "../BookingFlow.utils";
import { ReviewForm } from "./ReviewForm";
import { SlotTakenAlert } from "./SlotTakenAlert";
import styles from "../BookingFlow.module.scss";

/**
 * Step 5: the summary of the visit next to the notes and contact options. When the time was taken it also offers nearby times.
 *
 * @param props Props of the component, see {@link StepReviewProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @param props.alternatives Nearby times, when the chosen time was taken.
 * @param props.pickAlternative Takes one of the nearby times.
 * @returns The rendered element.
 */
export function StepReview({ selection, setField, alternatives, pickAlternative }: StepReviewProps) {
  const summary = bookingSummary(selection);
  const time = alternatives ? `${selection.time} · no longer available` : summary.time;

  return (
    <>
      {alternatives && <SlotTakenAlert time={selection.time} alternatives={alternatives} onPick={pickAlternative} />}
      <div className={styles.review}>
        <BookingSummary {...summary} time={time} />
        <ReviewForm selection={selection} setField={setField} alternatives={alternatives} pickAlternative={pickAlternative} vet={agendaVet(selection.vetId)} />
      </div>
    </>
  );
}
