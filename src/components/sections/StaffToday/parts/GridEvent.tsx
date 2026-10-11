import { ScheduleEvent } from "@/components/patterns/ScheduleEvent";

import type { GridEventProps } from "../StaffToday.types";
import { eventMeta, eventStyle, eventTitle } from "../StaffToday.utils";
import styles from "../StaffToday.module.scss";

/**
 * Appointment placed on the schedule grid at its time, as tall as it lasts.
 *
 * @param props Props of the component, see {@link GridEventProps}.
 * @param props.appointment Appointment to show.
 * @returns The rendered element.
 */
export function GridEvent({ appointment }: GridEventProps) {
  return (
    <div className={styles.slot} style={eventStyle(appointment)}>
      <ScheduleEvent status={appointment.status} species={appointment.species} title={eventTitle(appointment)} meta={eventMeta(appointment)} alert={appointment.alert} />
    </div>
  );
}
