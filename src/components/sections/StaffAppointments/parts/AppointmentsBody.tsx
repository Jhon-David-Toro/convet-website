import type { AppointmentsBodyProps } from "../StaffAppointments.types";
import { AppointmentRow } from "./AppointmentRow";

/**
 * Body of the appointments table: one row per appointment.
 *
 * @param props Props of the component, see {@link AppointmentsBodyProps}.
 * @param props.rows Appointments of the current page.
 * @returns The rendered element.
 */
export function AppointmentsBody({ rows }: AppointmentsBodyProps) {
  return (
    <tbody>
      {rows.map((appointment) => (
        <AppointmentRow key={appointment.id} appointment={appointment} />
      ))}
    </tbody>
  );
}
