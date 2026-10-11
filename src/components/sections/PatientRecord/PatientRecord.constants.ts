import { Heart, Scale, Thermometer } from "@/components/ui/Icon";

import type { PatientTab } from "./PatientRecord.types";

export const TABS: { value: PatientTab; label: string; count?: number }[] = [
  { value: "visits", label: "Visits", count: 4 },
  { value: "vaccines", label: "Vaccines" },
  { value: "treatments", label: "Treatments" },
  { value: "documents", label: "Documents", count: 1 },
  { value: "appointments", label: "Appointments" },
];

export const TABS_LABEL = "Patient record sections";

export const PANEL_ID = "patient-panel";

export const TAB_TYPES: Record<Exclude<PatientTab, "appointments">, string[]> = {
  visits: ["vaccine", "document"],
  vaccines: ["vaccine"],
  treatments: ["treatment"],
  documents: ["document"],
};

export const EMPTY_MESSAGES: Record<PatientTab, string> = {
  visits: "No visits yet.",
  vaccines: "No vaccines recorded.",
  treatments: "No treatments recorded.",
  documents: "No documents uploaded.",
  appointments: "No appointments scheduled.",
};

export const BREADCRUMBS_OWNER_HREF = "/staff/clients/anna-lee";

export const START_VISIT_LABEL = "Start visit";

export const NEW_APPOINTMENT_LABEL = "New appointment";

export const MICROCHIP_LABEL = "Microchip";

export const WEIGHT_LABEL = "Weight";

export const SIGNED_LABEL = "Signed";

export const INTERNAL_NOTES_TITLE = "Internal notes · Staff only";

export const SHARED_SUMMARY_TITLE = "Summary shared with Anna";

export const OWNER_LABEL = "Owner";

export const CLINICAL_FIELDS = [
  { key: "findings", label: "Findings" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "plan", label: "Plan" },
] as const;

export const ONLINE_ACCOUNT_LABEL = "Online account linked";

export const WHATSAPP_LABEL = "Message on WhatsApp";

export const VACCINES_TITLE = "Vaccines";

export const VITALS = [
  { key: "weight", label: "Weight", icon: Scale },
  { key: "temperature", label: "Temperature", icon: Thermometer },
  { key: "heartRate", label: "Heart rate", icon: Heart },
] as const;
