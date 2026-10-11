import type { AppointmentTab } from "./CustomerAppointments.types";

export const TITLE = "Appointments";

export const SUBTITLE = "Cancel or reschedule for free up to 24 hours before.";

export const BOOK_LABEL = "Book a visit";

export const TABS: { value: AppointmentTab; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

export const TABS_LABEL = "Appointments by state";

export const PANEL_ID = "appointments-panel";

export const EMPTY_TITLES: Record<AppointmentTab, string> = {
  upcoming: "No upcoming appointments",
  past: "No past appointments",
  cancelled: "No cancelled appointments",
};

export const EMPTY_MESSAGES: Record<AppointmentTab, string> = {
  upcoming: "Luna's rabies booster is due Oct 20. Book a new time when it suits you.",
  past: "Your finished visits will appear here.",
  cancelled: "Cancelled visits will appear here.",
};

export const CHANGE_TITLE = "Need to change something within 24 hours?";

export const CHANGE_TEXT = "Message us on WhatsApp and we'll help you move it.";

export const CHANGE_ACTION = "Chat on WhatsApp";

export const APPOINTMENTS_HREF = "/app/appointments";

export const CANCEL_PARAM = "cancel";

export const BOOK_LABEL_EMPTY = "Book a visit";

export const CANCEL_MODAL = {
  title: "Can't make it? Reschedule instead",
  confirm: "Cancel appointment",
  reschedule: "Reschedule",
};

export const CANCELLED_MESSAGE = "Appointment cancelled. We emailed you a confirmation.";

export const UNDO_LABEL = "Undo";
