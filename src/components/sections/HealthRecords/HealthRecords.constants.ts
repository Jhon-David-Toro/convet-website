import { Box, Calendar } from "@/components/ui/Icon";

import type { RecordFilter } from "./HealthRecords.types";

export const TITLE = "Health records";

export const SUBTITLE = "Visits, vaccines, treatments and vet notes for your pets.";

export const SWITCH_LABEL = "Viewing records for";

export const SWITCH_NOTE = "Only pets linked to your account";

export const SAMPLE_NOTE = "Sample design data — fictional records";

export const DEFAULT_PET_ID = "luna";

export const PET_TAB_LABELS: Record<string, string> = { luna: "Luna · Dog", milo: "Milo · Cat" };

export const STAT_ICONS = [Box, Calendar, Calendar, Calendar];

export const STAT_LABELS = ["Vaccines", "Active treatments", "Last visit", "Next appointment"];

export const HISTORY_TITLE = "Clinical history";

export const HISTORY_FILTERS_LABEL = "Filter the history";

export const HISTORY_FILTERS: { value: RecordFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "visit", label: "Visits" },
  { value: "vaccine", label: "Vaccines" },
  { value: "treatment", label: "Treatments" },
  { value: "document", label: "Documents" },
];

export const MEDICATIONS_TITLE = "Medications on record";

export const DIAGNOSES_TITLE = "Diagnoses & vet observations";

export const ACTIVE_LABEL = "Active";

export const COMPLETED_LABEL = "Completed";

export const INFO_TITLE = "What you see here";

export const INFO_TEXT = "Your vet shares a summary after each visit. Full clinical notes stay with the clinic — ask us for a copy.";

export const EMPTY_TITLE = "No health records yet";

export const ADD_PET_LABEL = "Add a pet";

export const VIEW_APPOINTMENT_LABEL = "View appointment";

export const PAPER_RECORDS_LABEL = "Ask about paper records";

export const RABIES_BADGE = "Rabies due Oct 20";
