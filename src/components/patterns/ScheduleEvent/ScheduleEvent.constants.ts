import { Bell, Calendar, Check, MapPin, Stethoscope, X } from "@/components/ui/Icon";

import type { ScheduleStatus, ScheduleStatusView } from "./ScheduleEvent.types";

export const SCHEDULE_ALERT_ICON_SIZE = 14;

export const SCHEDULE_SPECIES_ICON_SIZE = 16;

export const SCHEDULE_STATUS_VIEWS: Record<ScheduleStatus, ScheduleStatusView> = {
  scheduled: { tone: "brand", icon: Calendar, label: "Scheduled", classKey: "scheduled" },
  "new-online": { tone: "brand", icon: Bell, label: "Booked online", classKey: "newOnline" },
  arrived: { tone: "accent", icon: MapPin, label: "Arrived", classKey: "arrived" },
  "in-progress": { tone: "info", icon: Stethoscope, label: "In progress", classKey: "inProgress" },
  completed: { tone: "success", icon: Check, label: "Completed", classKey: "completed" },
  "no-show": { tone: "error", icon: X, label: "No-show", classKey: "noShow" },
};

export const COMPLETED_STATUS: ScheduleStatus = "completed";

export const DOG_SPECIES = "dog";
