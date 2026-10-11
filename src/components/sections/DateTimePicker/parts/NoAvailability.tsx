import { Calendar, Icon } from "@/components/ui/Icon";
import { fullDayMessage, nextOpenDay, shortDay } from "@/lib/booking/booking.utils";

import { EMPTY_ICON_SIZE } from "../DateTimePicker.constants";
import type { NoAvailabilityProps } from "../DateTimePicker.types";
import { NoAvailabilityActions } from "./NoAvailabilityActions";
import styles from "../DateTimePicker.module.scss";

/**
 * Shown when the chosen day is full: explains it and offers the vet's next open day or any available vet.
 *
 * @param props Props of the component, see {@link NoAvailabilityProps}.
 * @param props.vet Vet whose agenda is shown.
 * @param props.date Day that is full.
 * @param props.onDateChange Jumps to another day.
 * @param props.onAnyVet Switches to any available vet.
 * @returns The rendered element.
 */
export function NoAvailability({ vet, date, onDateChange, onAnyVet }: NoAvailabilityProps) {
  const next = nextOpenDay(vet, date);

  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}>
        <Icon icon={Calendar} size={EMPTY_ICON_SIZE} tone="warning" />
      </span>
      <h2 className={styles.emptyTitle}>{`${shortDay(date)} is full with ${vet.name}`}</h2>
      <p className={styles.emptyText}>{fullDayMessage(vet, next)}</p>
      <NoAvailabilityActions next={next} onDateChange={onDateChange} onAnyVet={onAnyVet} />
    </div>
  );
}
