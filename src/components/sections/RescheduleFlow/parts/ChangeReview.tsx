import styles from "../RescheduleFlow.module.scss";
import { FROM_LABEL, TO_LABEL } from "../RescheduleFlow.constants";
import type { ChangeReviewProps } from "../RescheduleFlow.types";
import { whenText } from "../RescheduleFlow.utils";

/**
 * Confirmation of the change: the current day and time next to the new ones.
 *
 * @param props Props of the component, see {@link ChangeReviewProps}.
 * @param props.appointment Appointment being moved.
 * @param props.date New day.
 * @param props.time New time.
 * @returns The rendered element.
 */
export function ChangeReview({ appointment, date, time }: ChangeReviewProps) {
  return (
    <dl className={styles.changes}>
      <div className={styles.change}>
        <dt>{FROM_LABEL}</dt>
        <dd>{whenText(appointment.iso, appointment.startTime)}</dd>
      </div>
      <div className={styles.change} data-new>
        <dt>{TO_LABEL}</dt>
        <dd>{whenText(date, time)}</dd>
      </div>
    </dl>
  );
}
