import type { ChangeEvent } from "react";

import type { StaffLot, StaffPatient, StaffVisitForm } from "@/lib/staff.types";

export type VisitRecordProps = {
  visit: StaffVisitForm;
  patient: StaffPatient;
};

export type VisitValues = {
  reason: string;
  weight: string;
  temperature: string;
  heartRate: string;
  findings: string;
  diagnosis: string;
  plan: string;
  vaccine: string;
  nextDose: string;
  internalNotes: string;
  ownerSummary: string;
};

export type PatientFact = {
  label: string;
  value: string;
  mono?: boolean;
};

export type VisitFieldBinding = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type VisitFormState = {
  values: VisitValues;
  vaccinating: boolean;
  bind: (field: keyof VisitValues) => VisitFieldBinding;
  setValue: (field: keyof VisitValues, value: string) => void;
  removeVaccine: () => void;
  addVaccine: () => void;
  saveDraft: () => void;
  finish: () => void;
};

export type VaccineToggle = Pick<VisitFormState, "vaccinating" | "removeVaccine" | "addVaccine">;

export type UseVisitFormParams = Pick<VisitRecordProps, "visit">;

export type VisitFieldsProps = Pick<VisitFormState, "bind">;

export type VitalsFieldsProps = VisitFieldsProps & {
  lastWeight: string;
};

export type VisitHeaderProps = Pick<VisitRecordProps, "visit" | "patient">;

export type VaccinationCardProps = Pick<VisitFormState, "values" | "setValue" | "removeVaccine"> & {
  lot: StaffLot;
  expiredLot: string;
};

export type LotPickerProps = {
  lot: StaffLot;
  expiredLot: string;
};

export type VisitFooterProps = Pick<VisitFormState, "saveDraft" | "finish"> & {
  draftSaved: string;
};

export type VisitSideProps = Pick<VisitRecordProps, "visit" | "patient">;

export type VisitFormProps = {
  form: VisitFormState;
  visit: StaffVisitForm;
  patient: StaffPatient;
};

export type PatientCardProps = Pick<VisitRecordProps, "patient">;

export type PatientCardHeadProps = PatientCardProps;

export type PatientFactsProps = Pick<VisitRecordProps, "patient">;

export type ProfileLinkProps = {
  href: string;
};

export type LastVisitCardProps = Pick<VisitRecordProps, "visit" | "patient">;

export type VaccinationHeaderProps = Pick<VisitFormState, "removeVaccine">;

export type LotNoteProps = {
  text: string;
};

export type ExtrasProps = {
  vaccinating: boolean;
  onAddVaccine: () => void;
};
