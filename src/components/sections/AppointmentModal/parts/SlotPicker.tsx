import { TimeSlot } from "@/components/patterns/TimeSlot";
import { capacityLabel } from "@/lib/booking/booking.utils";

import { NO_SLOTS_TEXT, SLOTS_LEGEND } from "../AppointmentModal.constants";
import type { SlotPickerProps } from "../AppointmentModal.types";
import { slotsOn } from "../AppointmentModal.utils";
import styles from "../AppointmentModal.module.scss";

/**
 * Free times of the chosen vet on the chosen day, with the places left in each; one can be picked.
 *
 * @param props Props of the component, see {@link SlotPickerProps}.
 * @param props.vetId Id of the vet.
 * @param props.date Date typed in the form.
 * @param props.time Time that is picked, empty when none.
 * @param props.error Message shown when no time was picked.
 * @param props.onPick Called with the time the user picked.
 * @returns The rendered element.
 */
export function SlotPicker({ vetId, date, time, error, onPick }: SlotPickerProps) {
  const slots = slotsOn(vetId, date);

  return (
    <fieldset className={styles.slots}>
      <legend className={styles.legend}>{SLOTS_LEGEND}</legend>
      {slots.length > 0 ? (
        <div className={styles.grid}>
          {slots.map((slot) => (
            <TimeSlot key={slot.time} time={slot.time} capacity={capacityLabel(slot)} full={slot.state !== "open"} selected={slot.time === time} onClick={() => onPick(slot.time)} />
          ))}
        </div>
      ) : (
        <p className={styles.message}>{NO_SLOTS_TEXT}</p>
      )}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
