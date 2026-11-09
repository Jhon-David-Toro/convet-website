import type { CustomerAppointment, CustomerReminder, PetEvent, PetItem } from "@/lib/customer/customer.types";

export type CustomerOverviewProps = {
  pets: PetItem[];
  /** Message shown instead of the pets when they could not be loaded. */
  loadError?: string;
  /** Next appointment; the block is left out when there is none. */
  appointment?: CustomerAppointment;
  /** Reminders; the block is left out when there are none. */
  reminders?: CustomerReminder[];
  /** Recent activity; the block is left out when there is none. */
  activity?: PetEvent[];
};

export type OverviewPetsProps = Pick<CustomerOverviewProps, "pets" | "loadError">;

export type OverviewActivityProps = {
  events: PetEvent[];
  historyHref: string;
};

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
