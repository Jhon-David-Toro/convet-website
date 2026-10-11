import { Clipboard } from "@/components/ui/Icon";

import type { HistoryFilter, PetTab } from "./PetProfile.types";

export const TAB_LABELS: Record<PetTab, string> = {
  overview: "Overview",
  vaccines: "Vaccines",
  history: "History",
  treatments: "Treatments",
  appointments: "Appointments",
};

export const TABS_LABEL = "Pet profile sections";

export const PANEL_ID = "pet-panel";

export const MY_PETS_LABEL = "My pets";

export const EDIT_LABEL = "Edit pet";

export const FACT_LABELS = { microchip: "Microchip", weight: "Weight", vet: "Vet" };

export const VACCINATION_TITLE = "Vaccination card";

export const OVERDUE_BADGE = "overdue";

export const CERTIFICATE_LABEL = "Download certificate (coming soon)";

export const BOOK_BOOSTER_LABEL = "Book booster";

export const DUE_BADGE = "Due in 20 days";

export const NEXT_STEP_TEXT = "Book now — we can also give the overdue leptospirosis vaccine at the same visit.";

export const UPCOMING_TITLE = "Upcoming";

export const HISTORY_FILTERS: { value: HistoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "visit", label: "Visits" },
  { value: "vaccine", label: "Vaccines" },
  { value: "treatment", label: "Treatments" },
  { value: "document", label: "Documents" },
];

export const HISTORY_FILTERS_LABEL = "Filter the history";

export const WEIGHT_TITLE = "Weight";

export const WEIGHT_CHANGE = "+0.3 kg since March";

export const WEIGHT_MIN_HEIGHT = 40;

export const WEIGHT_HEIGHT_RANGE = 60;

export const INFO_TITLE = "What you see here";

export const INFO_TEXT = "Your vet writes a summary for you after each visit. Detailed clinical notes stay at the clinic.";

export const INFO_ACTION = "Ask for a copy";

export const EMPTY_TITLE = "Nothing here yet";

export const EMPTY_TEXT = "This section is coming soon.";

export const EMPTY_ICON = Clipboard;

export const STAMP_TONES = {
  "up-to-date": "success",
  "due-soon": "warning",
  overdue: "error",
} as const;
