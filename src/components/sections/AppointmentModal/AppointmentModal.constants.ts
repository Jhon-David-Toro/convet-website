import type { SelectOption } from "@/components/ui/Select";
import { BOOKING_SERVICES, BOOKING_VETS } from "@/lib/booking/booking.constants";

import type { AppointmentValues } from "./AppointmentModal.types";

export const MODAL_TITLE = "New appointment";

export const MODAL_DESCRIPTION = "Booked by staff on behalf of a client. Same rules as online booking: 10-min slots, max 5 per slot.";

export const MODAL_WIDTH = "47.5rem";

export const INITIAL_APPOINTMENT: AppointmentValues = { patient: "", service: "consultations", vet: "larry", date: "10 / 14 / 2026", time: "", notes: "", notify: true };

export const SERVICE_OPTIONS: SelectOption[] = BOOKING_SERVICES.filter((service) => !service.unavailable).map((service) => ({
  value: service.id,
  label: `${service.title} · ${service.duration} min`,
}));

export const VET_OPTIONS: SelectOption[] = BOOKING_VETS.filter((vet) => !vet.unavailable && vet.license).map((vet) => ({
  value: vet.id,
  label: `${vet.name} · ${vet.schedule}`,
}));

export const PATIENT_PLACEHOLDER = "Name, phone or 15-digit microchip";

export const PATIENT_ERROR = "Search for the patient and owner.";

export const DATE_ERROR = "Enter the day, like 10 / 14 / 2026.";

export const TIME_ERROR = "Pick a time.";

export const NOTES_PLACEHOLDER = "Owner reports stiffness after walks.";

export const NOTES_HELPER = "Optional, helps the vet prepare.";

export const NOTIFY_LABEL = "Send confirmation to the owner (email + WhatsApp link)";

export const SERVER_NOTE = "Design only: availability and capacity are validated by the server when saving.";

export const SUBMIT_LABEL = "Book";

export const SAVED_MESSAGE = "Appointment booked. The owner receives a confirmation.";

export const NO_SLOTS_TEXT = "The vet has no free times that day. Pick another date or vet.";

export const SLOTS_LEGEND = "Free times";
