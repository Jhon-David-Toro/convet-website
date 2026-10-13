import { TableCell } from "@/components/patterns/Table";
import { STAFF_APPOINTMENT_MENU } from "@/lib/staff/staff.menus.constants";
import { findStaffVet, timeLabel } from "@/lib/staff/staff.utils";

import type { AppointmentRowProps } from "../StaffAppointments.types";
import { StatusBadge } from "./StatusBadge";

/**
 * Row of the table: time, patient with the owner, service, vet, status and the row actions.
 *
 * @param props Props of the component, see {@link AppointmentRowProps}.
 * @param props.appointment Appointment of the row.
 * @returns The rendered element.
 */
export function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <tr>
      <TableCell type="mono">{timeLabel(appointment.time)}</TableCell>
      <TableCell type="avatar" avatar={appointment.species} secondary={appointment.owner}>
        {appointment.patient}
      </TableCell>
      <TableCell>{appointment.service}</TableCell>
      <TableCell>{findStaffVet(appointment.vetId).name}</TableCell>
      <TableCell type="badge">
        <StatusBadge status={appointment.status} />
      </TableCell>
      <TableCell type="actions" actionLabel={`Actions for ${appointment.patient}`} items={STAFF_APPOINTMENT_MENU} />
    </tr>
  );
}
