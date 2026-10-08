import { ArrowRight, Calendar, Check, Clock, MapPin, Paw, Stethoscope, X } from "@/components/ui/Icon";

import type { AppointmentStatus, AppointmentStatusView } from "./AppointmentCard.types";

/** Badge, primary action label and optional trailing icon for each appointment status. */
export const APPOINTMENT_STATUS_VIEWS: Record<AppointmentStatus, AppointmentStatusView> = {
  upcoming: { tone: "brand", icon: Calendar, label: "Scheduled", primary: "Reschedule" },
  today: { tone: "accent", icon: Clock, label: "Today", primary: "Reschedule" },
  completed: { tone: "success", icon: Check, label: "Completed", primary: "View visit summary", trailing: ArrowRight },
  cancelled: { tone: "neutral", icon: X, label: "Cancelled", primary: "Book again", trailing: ArrowRight },
};

/** Statuses whose appointment can still be cancelled. */
export const CANCELLABLE_STATUSES: readonly AppointmentStatus[] = ["upcoming", "today"];

/** Status whose badge icon is tinted with the primary color. */
export const SUCCESS_STATUS: AppointmentStatus = "completed";

/** Icons of the meta list, in display order. */
export const APPOINTMENT_META_ICONS = { time: Clock, pet: Paw, vet: Stethoscope, location: MapPin } as const;
