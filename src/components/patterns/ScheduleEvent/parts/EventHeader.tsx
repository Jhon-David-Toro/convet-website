import { Cat, Dog, Icon } from "@/components/ui/Icon";

import styles from "../ScheduleEvent.module.scss";
import { DOG_SPECIES, SCHEDULE_SPECIES_ICON_SIZE } from "../ScheduleEvent.constants";
import type { EventHeaderProps } from "../ScheduleEvent.types";

/**
 * Species icon with the patient and reason.
 *
 * @param props Props of the component, see {@link EventHeaderProps}.
 * @param props.species Species of the patient or the service (dog, cat…).
 * @param props.title Patient and reason, e.g. "Luna · Vaccination".
 * @returns The rendered element.
 */
export function EventHeader({ species, title }: EventHeaderProps) {
  return (
    <div className={styles.top}>
      <Icon icon={species === DOG_SPECIES ? Dog : Cat} size={SCHEDULE_SPECIES_ICON_SIZE} tone="primary" />
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
}
