import { TableCell } from "@/components/patterns/Table";

import type { AppointmentCellsProps } from "../AdminAppointments.types";

/**
 * First cells of an appointment row: the date, the time and the patient with the owner.
 *
 * @param props Props of the component, see {@link AppointmentCellsProps}.
 * @param props.appointment Appointment of the row.
 * @returns The rendered element.
 */
export function AppointmentWhenCells({ appointment }: AppointmentCellsProps) {
  return (
    <>
      <TableCell>{appointment.date}</TableCell>
      <TableCell type="mono">{appointment.time}</TableCell>
      <TableCell type="avatar" avatar={appointment.species} secondary={appointment.owner}>
        {appointment.patient}
      </TableCell>
    </>
  );
}
