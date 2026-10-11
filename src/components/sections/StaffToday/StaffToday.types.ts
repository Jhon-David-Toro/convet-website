import type { StaffAppointment, StaffVet } from "@/lib/staff.types";

export type AgendaFilter = "mine" | "all";

export type AgendaGroup = {
  heading: string;
  tone: "now" | "muted";
  appointments: StaffAppointment[];
};

export type ScheduleGridProps = {
  vets: StaffVet[];
};

export type GridColumnsProps = ScheduleGridProps;

export type GridColumnProps = {
  vet: StaffVet;
};

export type GridEventProps = {
  appointment: StaffAppointment;
};

export type AgendaHeaderProps = {
  filter: AgendaFilter;
  onFilter: (filter: AgendaFilter) => void;
};

export type AgendaProps = AgendaHeaderProps;

export type AgendaGroupViewProps = {
  group: AgendaGroup;
};
