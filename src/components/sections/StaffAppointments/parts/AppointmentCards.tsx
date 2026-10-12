import { TABLE_LABEL } from "../StaffAppointments.constants";
import type { AppointmentsTableProps } from "../StaffAppointments.types";
import { AppointmentCard } from "./AppointmentCard";
import styles from "../StaffAppointments.module.scss";

/**
 * Appointments of the day as a list of cards; it replaces the table on mobile, where the columns do not fit.
 *
 * @param props Props of the component, see {@link AppointmentsTableProps}.
 * @param props.rows Appointments of the current page.
 * @returns The rendered element.
 */
export function AppointmentCards({ rows }: AppointmentsTableProps) {
  return (
    <ul className={styles.cards} aria-label={TABLE_LABEL}>
      {rows.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </ul>
  );
}
