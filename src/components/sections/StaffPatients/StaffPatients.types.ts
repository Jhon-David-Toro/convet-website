import type { StaffPatientRow } from "@/lib/staff/staff.types";

export type PatientFilters = {
  query: string;
  chip: string;
  species: string;
  vet: string;
  vaccine: string;
};

export type SetPatientFilter = <Field extends keyof PatientFilters>(field: Field, value: PatientFilters[Field]) => void;

export type PatientFiltersProps = {
  filters: PatientFilters;
  setFilter: SetPatientFilter;
};

export type PatientRowsProps = {
  rows: StaffPatientRow[];
};

export type PatientRowProps = {
  patient: StaffPatientRow;
};

export type VaccineBadgeProps = Pick<StaffPatientRow, "vaccine" | "vaccineLabel">;

export type PatientsEmptyProps = {
  query: string;
  onClear: () => void;
};

export type PatientsState = {
  filters: PatientFilters;
  setFilter: SetPatientFilter;
  clearFilters: () => void;
  rows: StaffPatientRow[];
  page: number;
  setPage: (page: number) => void;
};
