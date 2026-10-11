import type { SelectOption } from "@/components/ui/Select";

import type { SettingsTab } from "./AdminSettings.types";

export const TITLE = "Settings";

export const SUBTITLE = "Booking rules and notifications for Main clinic.";

export const TABS: { value: SettingsTab; label: string }[] = [
  { value: "booking", label: "Booking rules" },
  { value: "notifications", label: "Notifications" },
  { value: "business", label: "Business info" },
  { value: "audit", label: "Audit log" },
];

export const TABS_LABEL = "Settings sections";

export const PANEL_ID = "settings-panel";

const options = (labels: string[]): SelectOption[] => labels.map((label) => ({ value: label, label }));

export const RULE_FIELDS = [
  { key: "notice", label: "Minimum notice for online booking", helper: "Clients can't book closer than this.", options: options(["1 hour", "2 hours", "4 hours", "12 hours", "24 hours"]) },
  { key: "horizon", label: "Booking horizon", helper: "How far ahead clients can book.", options: options(["30 days", "60 days", "90 days"]) },
  { key: "rescheduleWindow", label: "Free reschedule window", helper: "Clients are offered Reschedule first; Cancel stays available.", options: options(["12 hours before", "24 hours before", "48 hours before"]) },
  { key: "maxUpcoming", label: "Max. upcoming appointments per client", helper: "Prevents holding many slots.", options: options(["1", "2", "3", "5"]) },
  { key: "slotInterval", label: "Slot interval", helper: "Slots start at opening time and step by 10 min: 9:00, 9:10, 9:20…", options: options(["5 minutes", "10 minutes", "15 minutes", "30 minutes"]) },
  { key: "maxPerSlot", label: "Max. requests per time slot", helper: "Several pets can share one start time. At 5 requests the slot shows as Full.", options: options(["1", "3", "5", "8"]) },
] as const;

export const RULE_TOGGLES = [
  { key: "autoConfirm", label: "Confirm online bookings automatically", description: "Availability is real-time, so no manual approval is needed." },
  { key: "chooseVet", label: "Allow clients to choose a specific vet", description: "Each vet's own working hours and days off (set in Team) decide which slots are shown." },
] as const;

export const DISCARD_LABEL = "Discard";

export const SAVE_RULES_LABEL = "Save rules";

export const RULES_SAVED_MESSAGE = "Booking rules saved.";

export const NOTIFICATION_TOGGLES = [
  { key: "email", label: "Email confirmations and reminders", description: "Sent to clients when they book, reschedule or cancel." },
  { key: "whatsapp", label: "WhatsApp reminders", description: "Sent 24 hours before each appointment." },
  { key: "staff", label: "Staff alerts for new online bookings", description: "Shown on Today and sent to the clinic email." },
] as const;

export const NOTIFICATIONS_SAVED_MESSAGE = "Notification settings saved.";

export const BUSINESS_FIELDS = [
  { key: "name", label: "Business name", value: "Contreras Veterinary Services N.V." },
  { key: "email", label: "Clinic email", value: "info@convet.aw" },
  { key: "phone", label: "Phone", value: "+297 593 0404" },
  { key: "address", label: "Address", value: "Savaneta 40A, Oranjestad, Aruba" },
] as const;

export const BUSINESS_SAVED_MESSAGE = "Business info saved.";

export const SAVE_LABEL = "Save changes";

export const AUDIT_COLUMNS = ["When", "Who", "Action"];

export const AUDIT_TABLE_LABEL = "Audit log";

export const AUDIT_ENTRIES = [
  { id: "e1", when: "Oct 1 · 8:02 AM", who: "Maria Kock", action: "Changed Max. requests per time slot from 4 to 5" },
  { id: "e2", when: "Sep 28 · 4:40 PM", who: "Maria Kock", action: "Invited José Ruiz as Vet assistant" },
  { id: "e3", when: "Sep 15 · 9:15 AM", who: "Maria Kock", action: "Blocked lot RB-23990 (expired)" },
];
