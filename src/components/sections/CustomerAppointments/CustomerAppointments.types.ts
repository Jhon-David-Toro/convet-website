import type { CustomerAppointment } from "@/lib/customer.types";

export type AppointmentTab = "upcoming" | "past" | "cancelled";

export type AppointmentGroups = Record<AppointmentTab, CustomerAppointment[]>;

export type CustomerAppointmentsProps = {
  groups?: AppointmentGroups;
};

export type AppointmentTabsProps = {
  groups: AppointmentGroups;
  tab: AppointmentTab;
  onChange: (tab: AppointmentTab) => void;
};

export type AppointmentListProps = {
  tab: AppointmentTab;
  appointments: CustomerAppointment[];
};

export type AppointmentsState = {
  groups: AppointmentGroups;
  cancel: (id: string) => void;
  restore: (id: string) => void;
};

export type CancelFlowState = {
  target?: CustomerAppointment;
  close: () => void;
  confirm: () => void;
};

export type UseCancelFlowParams = Pick<AppointmentsState, "groups" | "cancel" | "restore">;

export type CancelModalProps = {
  appointment?: CustomerAppointment;
  onClose: () => void;
  onConfirm: () => void;
};
