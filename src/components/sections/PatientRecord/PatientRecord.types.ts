import type { LucideIcon } from "lucide-react";

import type { StaffOwner, StaffPatient, StaffTimelineEntry, StaffVisitSummary } from "@/lib/staff/staff.types";

export type PatientTab = "visits" | "vaccines" | "treatments" | "documents" | "appointments";

export type PatientRecordProps = {
  patient: StaffPatient;
};

export type PatientHeaderProps = PatientRecordProps;

export type PatientTabsProps = {
  tab: PatientTab;
  onChange: (tab: PatientTab) => void;
};

export type PatientPanelProps = {
  tab: PatientTab;
};

export type TimelineListProps = {
  entries: StaffTimelineEntry[];
};

export type VisitCardProps = {
  visit: StaffVisitSummary;
};

export type VitalsProps = Pick<StaffVisitSummary, "vitals">;

export type NoteBoxProps = {
  tone: "internal" | "shared";
  title: string;
  text: string;
};

export type ClinicalFieldProps = {
  label: string;
  text: string;
};

export type PatientIdentityProps = PatientRecordProps;

export type PatientFactsProps = PatientRecordProps;

export type ClinicalFieldsProps = VisitCardProps;

export type VisitNotesProps = VisitCardProps;

export type OwnerContactProps = OwnerCardProps;

export type OwnerHeadProps = OwnerCardProps;

export type ContactItem = {
  icon: LucideIcon;
  text: string;
};

export type OwnerCardProps = {
  owner: StaffOwner;
};
