import type { CustomerAppointment, CustomerReminder } from "@/lib/customer.types";

export type OverviewAppointmentProps = {
  appointment: CustomerAppointment;
};

export type OverviewRemindersProps = {
  reminders: CustomerReminder[];
};

export type DismissState = {
  visible: CustomerReminder[];
  dismiss: (id: string) => void;
};
