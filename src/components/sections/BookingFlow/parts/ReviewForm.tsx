import styles from "../BookingFlow.module.scss";
import type { ReviewFormProps } from "../BookingFlow.types";
import { DeadlineNote } from "./DeadlineNote";
import { ReviewNotes } from "./ReviewNotes";
import { ReviewNotice } from "./ReviewNotice";

/**
 * Right side of the review: how many places the time has left (unless it was taken), notes for the vet, who the confirmation goes to,
 * the WhatsApp option and the free change window.
 *
 * @param props Props of the component, see {@link ReviewFormProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @param props.alternatives Nearby times, when the chosen time was taken.
 * @param props.vet Vet whose agenda is used.
 * @returns The rendered element.
 */
export function ReviewForm({ selection, setField, alternatives, vet }: ReviewFormProps) {
  return (
    <div className={styles.reviewForm}>
      {!alternatives && <ReviewNotice selection={selection} vet={vet} />}
      <ReviewNotes selection={selection} setField={setField} />
      <DeadlineNote selection={selection} />
    </div>
  );
}
