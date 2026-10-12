import type { SelectOption } from "@/components/ui/Select";
import { STAFF_HOME_HREF, STAFF_PATIENTS_HREF } from "@/lib/staff/staff.paths.constants";

export const TITLE_PREFIX = "New visit";

export const IN_PROGRESS_LABEL = "In progress";

export const REASON_LABEL = "Reason for visit";

export const WEIGHT_LABEL = "Weight (kg)";

export const TEMPERATURE_LABEL = "Temperature (°C)";

export const HEART_RATE_LABEL = "Heart rate (bpm)";

export const FINDINGS_LABEL = "Exam findings";

export const DIAGNOSIS_LABEL = "Diagnosis";

export const PLAN_LABEL = "Plan";

export const VACCINATION_TITLE = "Vaccination given today";

export const REMOVE_LABEL = "Remove";

export const VACCINE_LABEL = "Vaccine";

export const NEXT_DOSE_LABEL = "Next dose";

export const LOT_LABEL = "Lot (required)";

export const CHANGE_LOT_LABEL = "Change lot";

export const FEFO_NOTE = "Suggested: expires first (FEFO)";

export const ADD_VACCINE_LABEL = "Add vaccination";

export const ADD_TREATMENT_LABEL = "Add treatment";

export const ATTACH_FILE_LABEL = "Attach file";

export const INTERNAL_NOTES_LABEL = "Internal notes";

export const INTERNAL_NOTES_PLACEHOLDER = "Staff only — not visible to the owner";

export const INTERNAL_NOTES_HELPER = "Visible to vets and admins.";

export const OWNER_SUMMARY_LABEL = "Summary for the owner";

export const OWNER_SUMMARY_HELPER = "Shown in Anna's account after you sign.";

export const SAVE_DRAFT_LABEL = "Save draft";

export const FINISH_LABEL = "Finish & sign";

export const DRAFT_SAVED_MESSAGE = "Draft saved.";

export const SIGNED_MESSAGE = "Visit signed. Anna can now see the summary.";

export const MICROCHIP_LABEL = "Microchip";

export const WEIGHT_FACT_LABEL = "Weight";

export const NEXT_VISIT_LABEL = "Next visit";

export const VIEW_PROFILE_LABEL = "View profile";

export const FINISH_HREF = STAFF_HOME_HREF;

export const PROFILE_HREF = STAFF_PATIENTS_HREF;

export const VACCINE_OPTIONS: SelectOption[] = [
  { value: "leptospirosis", label: "Leptospirosis" },
  { value: "rabies", label: "Rabies" },
  { value: "dhpp", label: "DHPP" },
];

export const EXPIRED_LOT_NOTE = "Expired lots are hidden and can’t be selected.";

