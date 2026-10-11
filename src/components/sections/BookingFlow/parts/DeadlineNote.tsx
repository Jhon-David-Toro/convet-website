import { Icon, Info } from "@/components/ui/Icon";

import styles from "../BookingFlow.module.scss";
import type { DeadlineNoteProps } from "../BookingFlow.types";
import { freeChangeDeadline } from "../BookingFlow.utils";

/**
 * Note about the free change window: the visit can be moved for free until 24 hours before it starts.
 *
 * @param props Props of the component, see {@link DeadlineNoteProps}.
 * @param props.selection What is selected so far.
 * @returns The rendered element.
 */
export function DeadlineNote({ selection }: DeadlineNoteProps) {
  return (
    <p className={styles.deadline}>
      <Icon icon={Info} tone="tertiary" />
      {`Plans change? Reschedule free until ${freeChangeDeadline(selection.date, selection.time)}. You can still cancel from your appointment.`}
    </p>
  );
}
