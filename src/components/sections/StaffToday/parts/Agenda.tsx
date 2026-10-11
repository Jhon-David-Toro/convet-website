import { ScheduleEvent } from "@/components/patterns/ScheduleEvent";
import { cx } from "@/lib/shared/cx";
import { STAFF_APPOINTMENTS } from "@/lib/staff/staff.constants";

import styles from "../StaffToday.module.scss";
import type { AgendaProps } from "../StaffToday.types";
import { agendaAppointments, agendaGroups, eventTitle, rangeMeta } from "../StaffToday.utils";
import { AgendaFilters } from "./AgendaFilters";

/**
 * Agenda for small screens: a list of the day's appointments grouped into now, next and earlier.
 *
 * @param props Props of the component, see {@link AgendaProps}.
 * @param props.filter Selected filter.
 * @param props.onFilter Called with the filter the user picked.
 * @returns The rendered element.
 */
export function Agenda({ filter, onFilter }: AgendaProps) {
  const groups = agendaGroups(agendaAppointments(filter, STAFF_APPOINTMENTS));

  return (
    <div className={styles.agenda}>
      <AgendaFilters filter={filter} onFilter={onFilter} />
      {groups.map((group) => (
        <section key={group.heading} className={styles.group}>
          <h2 className={cx(styles.groupHeading, group.tone === "now" && styles.groupNow)}>{group.heading}</h2>
          {group.appointments.map((appointment) => (
            <ScheduleEvent key={appointment.id} status={appointment.status} species={appointment.species} title={eventTitle(appointment)} meta={rangeMeta(appointment)} alert={appointment.alert} />
          ))}
        </section>
      ))}
    </div>
  );
}
