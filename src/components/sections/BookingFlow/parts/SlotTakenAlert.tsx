import { TimeSlot } from "@/components/patterns/TimeSlot";
import { Alert } from "@/components/ui/Alert";
import { capacityLabel } from "@/lib/booking/booking.utils";

import { SLOT_TAKEN_TEXT, SLOT_TAKEN_TITLE } from "../BookingFlow.constants";
import type { SlotTakenAlertProps } from "../BookingFlow.types";
import styles from "../BookingFlow.module.scss";

/**
 * Warning shown when the chosen time filled up while the customer reviewed, with nearby times to pick instead.
 *
 * @param props Props of the component, see {@link SlotTakenAlertProps}.
 * @param props.time Time that is no longer available.
 * @param props.alternatives Nearby times with free places.
 * @param props.onPick Called with the time the customer picked.
 * @returns The rendered element.
 */
export function SlotTakenAlert({ time, alternatives, onPick }: SlotTakenAlertProps) {
  return (
    <>
      <Alert tone="warning" title={`${time} ${SLOT_TAKEN_TITLE}`}>
        {SLOT_TAKEN_TEXT}
      </Alert>
      <div className={styles.alternatives}>
        {alternatives.map((slot) => (
          <TimeSlot key={slot.time} time={slot.time} capacity={capacityLabel(slot)} onClick={() => onPick(slot.time)} />
        ))}
      </div>
    </>
  );
}
