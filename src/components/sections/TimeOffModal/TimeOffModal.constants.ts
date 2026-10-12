import type { SelectOption } from "@/components/ui/Select";

import type { AffectedAppointment, TimeOffValues } from "./TimeOffModal.types";

export const MODAL_TITLE = "Add time off";

export const MODAL_DESCRIPTION = "Blocks the vet’s slots. Existing appointments are listed so you can reschedule them first.";

export const MODAL_WIDTH = "37.5rem";

export const INITIAL_TIME_OFF: TimeOffValues = { member: "susana", from: "10 / 20 / 2026", to: "10 / 24 / 2026", reason: "leave" };

export const MEMBER_OPTIONS: SelectOption[] = [
  { value: "shirley", label: "Dr. Shirley · VET-002" },
  { value: "larry", label: "Dr. Larry · VET-001" },
  { value: "andreina", label: "Dr. Andreina · VET-003" },
  { value: "ricardo", label: "Dr. Ricardo · VET-004" },
  { value: "susana", label: "Dr. Susana · VET-005" },
];

export const REASON_OPTIONS: SelectOption[] = [
  { value: "leave", label: "Leave" },
  { value: "sick", label: "Sick leave" },
  { value: "training", label: "Training" },
  { value: "other", label: "Other" },
];

export const AFFECTED: Record<string, AffectedAppointment[]> = {
  susana: [
    { when: "Tue, Oct 20 · 9:00 AM", pet: "Bella" },
    { when: "Wed, Oct 21 · 11:10 AM", pet: "Milo" },
    { when: "Sat, Oct 24 · 10:00 AM", pet: "Kiwi" },
  ],
};

export const REVIEW_LABEL_PREFIX = "Review";

export const SUBMIT_LABEL = "Save time off";

export const SAVED_MESSAGE = "Time off saved. The vet’s slots are blocked.";

export const FROM_ERROR = "Enter the first day, like 10 / 20 / 2026.";

export const TO_ERROR = "Enter the last day, like 10 / 24 / 2026.";

export const ORDER_ERROR = "The last day cannot be before the first.";

export const REVIEW_HREF = "/admin/appointments";
