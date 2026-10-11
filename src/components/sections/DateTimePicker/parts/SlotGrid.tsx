import { TimeSlot } from "@/components/patterns/TimeSlot";
import { capacityLabel, hoursLabel, longDay } from "@/lib/booking/booking.utils";

import styles from "../DateTimePicker.module.scss";
import type { SlotGridProps } from "../DateTimePicker.types";

/**
 * The day's agenda: its title, the hours of the vet and a button per time with the places left.
 *
 * @param props Props of the component, see {@link SlotGridProps}.
 * @param props.date Day shown.
 * @param props.vet Vet whose agenda is shown.
 * @param props.slots Times of the day.
 * @param props.time Selected time.
 * @param props.onTimeChange Called with the time the customer picked.
 * @returns The rendered element.
 */
export function SlotGrid({ date, vet, slots, time, onTimeChange }: SlotGridProps) {
  return (
    <div className={styles.slots}>
      <h2 className={styles.dayTitle}>{longDay(date)}</h2>
      <p className={styles.dayHours}>{`${hoursLabel(vet)} · every 10 min · up to 5 requests per time`}</p>
      <div className={styles.grid}>
        {slots.map((slot) => (
          <TimeSlot
            key={slot.time}
            time={slot.time}
            capacity={capacityLabel(slot)}
            selected={slot.time === time}
            full={slot.state === "full"}
            disabled={slot.state === "blocked"}
            onClick={() => onTimeChange(slot.time)}
          />
        ))}
      </div>
    </div>
  );
}
