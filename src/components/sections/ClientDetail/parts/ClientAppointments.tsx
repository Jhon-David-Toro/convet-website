import { AppointmentCard } from "@/components/patterns/AppointmentCard";
import { STAFF_PATIENTS_HREF, STAFF_SCHEDULE_HREF } from "@/lib/staff.paths.constants";

import { APPOINTMENTS_TITLE } from "../ClientDetail.constants";
import styles from "../ClientDetail.module.scss";
import type { ClientAppointmentsProps } from "../ClientDetail.types";

/**
 * Appointments of the client: today's with reschedule and cancel, and past ones with the link to the visit summary.
 *
 * @param props Props of the component, see {@link ClientAppointmentsProps}.
 * @param props.appointments Appointments of the client.
 * @returns The rendered element.
 */
export function ClientAppointments({ appointments }: ClientAppointmentsProps) {
  return (
    <section className={styles.column} aria-labelledby="client-appointments">
      <h2 id="client-appointments" className={styles.sectionTitle}>
        {APPOINTMENTS_TITLE}
      </h2>
      {appointments.map(({ id, ...appointment }) => {
        const upcoming = appointment.status === "today";
        return (
          <AppointmentCard
            key={id}
            {...appointment}
            location=""
            primaryHref={upcoming ? STAFF_SCHEDULE_HREF : `${STAFF_PATIENTS_HREF}/luna`}
            secondaryHref={upcoming ? STAFF_SCHEDULE_HREF : undefined}
          />
        );
      })}
    </section>
  );
}
