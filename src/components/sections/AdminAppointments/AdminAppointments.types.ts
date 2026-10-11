import type { AdminAppointment } from "@/lib/admin/admin.types";

export type AppointmentCellsProps = AppointmentRowProps;

export type AppointmentRowProps = {
  appointment: AdminAppointment;
};
