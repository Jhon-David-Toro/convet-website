import type { TimelineType } from "@/components/patterns/TimelineItem";
import type { PetEvent, PetHealthRecord, PetItem } from "@/lib/customer/customer.types";

export type RecordFilter = TimelineType | "all";

export type RecordYearGroup = {
  year: string;
  events: PetEvent[];
};

export type HealthRecordsState = {
  pet: PetItem;
  record: PetHealthRecord;
  selectPet: (id: string) => void;
};

export type PetSwitchProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export type RecordProps = {
  pet: PetItem;
  record: PetHealthRecord;
};

export type RecordStatsProps = {
  record: PetHealthRecord;
};

export type RecordHistoryProps = {
  events: PetEvent[];
};

export type RecordMedicationsProps = {
  record: PetHealthRecord;
};

export type RecordDiagnosesProps = {
  record: PetHealthRecord;
};
