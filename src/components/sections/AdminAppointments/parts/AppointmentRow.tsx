import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";

import { STATUS_VIEWS } from "../AdminAppointments.constants";
import type { AppointmentRowProps } from "../AdminAppointments.types";
import { AppointmentWhenCells } from "./AppointmentWhenCells";

/**
 * Row of the appointments table: date, time, patient with the owner, service, vet, how it was booked, status and the row actions.
 *
 * @param props Props of the component, see {@link AppointmentRowProps}.
 * @param props.appointment Appointment of the row.
 * @returns The rendered element.
 */
export function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <tr>
      <AppointmentWhenCells appointment={appointment} />
      <TableCell>{appointment.service}</TableCell>
      <TableCell>{appointment.vet}</TableCell>
      <TableCell>{appointment.source}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={STATUS_VIEWS[appointment.status]} />
      </TableCell>
      <TableCell type="actions" actionLabel={`Actions for ${appointment.patient}`} />
    </tr>
  );
}
