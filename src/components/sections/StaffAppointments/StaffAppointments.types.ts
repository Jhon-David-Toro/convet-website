import type { StaffAppointment } from "@/lib/staff.types";

export type RangeValue = "today" | "tomorrow" | "week";

export type AppointmentFilters = {
  query: string;
  range: RangeValue;
  vet: string;
  status: string;
};

export type AppointmentTableState = {
  filters: AppointmentFilters;
  page: number;
  pageCount: number;
  total: number;
  rows: StaffAppointment[];
  setFilter: <Field extends keyof AppointmentFilters>(field: Field, value: AppointmentFilters[Field]) => void;
  setPage: (page: number) => void;
};

export type AppointmentFiltersProps = Pick<AppointmentTableState, "filters" | "setFilter">;

export type RangeChipsProps = AppointmentFiltersProps;

export type VetStatusSelectsProps = AppointmentFiltersProps;

export type AppointmentsTableProps = {
  rows: StaffAppointment[];
};

export type AppointmentsBodyProps = AppointmentsTableProps;

export type AppointmentRowProps = {
  appointment: StaffAppointment;
};

export type StatusBadgeProps = Pick<StaffAppointment, "status">;
