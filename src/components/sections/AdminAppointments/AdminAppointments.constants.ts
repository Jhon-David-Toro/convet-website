import type { StatusView } from "@/components/patterns/StatusBadge";
import { Bell, Calendar, Check, Stethoscope, X } from "@/components/ui/Icon";
import { APPOINTMENT_FILTER_COUNTS } from "@/lib/admin.constants";
import type { AdminAppointmentStatus } from "@/lib/admin.types";

export const TITLE = "Appointments";

export const SUBTITLE = "All vets · Main clinic";

export const DAY_VIEW_LABEL = "Day view";

export const NEW_LABEL = "New appointment";

export const FILTERS_LABEL = "Appointment status";

export const TABLE_LABEL = "Appointments";

export const COLUMNS = ["Date", "Time", "Patient", "Service", "Vet", "Source", "Status"];

export const FILTER_OPTIONS = [
  { value: "all", label: "All", count: APPOINTMENT_FILTER_COUNTS.all },
  { value: "scheduled", label: "Scheduled", count: APPOINTMENT_FILTER_COUNTS.scheduled },
  { value: "booked-online", label: "Booked online", count: APPOINTMENT_FILTER_COUNTS["booked-online"] },
  { value: "completed", label: "Completed", count: APPOINTMENT_FILTER_COUNTS.completed },
  { value: "cancelled", label: "Cancelled", count: APPOINTMENT_FILTER_COUNTS.cancelled },
  { value: "no-show", label: "No-show", count: APPOINTMENT_FILTER_COUNTS["no-show"] },
];

export const ALL_FILTER = "all";

export const STATUS_VIEWS: Record<AdminAppointmentStatus, StatusView> = {
  "in-progress": { tone: "info", icon: Stethoscope, label: "In progress" },
  "booked-online": { tone: "brand", icon: Bell, label: "Booked online" },
  scheduled: { tone: "brand", icon: Calendar, label: "Scheduled" },
  completed: { tone: "success", icon: Check, label: "Completed" },
  cancelled: { tone: "neutral", icon: X, label: "Cancelled" },
  "no-show": { tone: "error", icon: X, label: "No-show" },
};
