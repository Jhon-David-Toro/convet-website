import { ArrowRight, Calendar, Check, Clock, MapPin, Paw, Stethoscope, X } from "@/components/ui/Icon";

import type { AppointmentStatus, AppointmentStatusView } from "./AppointmentCard.types";

export const APPOINTMENT_STATUS_VIEWS: Record<AppointmentStatus, AppointmentStatusView> = {
  upcoming: { tone: "brand", icon: Calendar, label: "Scheduled", primary: "Reschedule" },
  today: { tone: "accent", icon: Clock, label: "Today", primary: "Reschedule" },
  completed: { tone: "success", icon: Check, label: "Completed", primary: "View visit summary", trailing: ArrowRight },
  cancelled: { tone: "neutral", icon: X, label: "Cancelled", primary: "Book again", trailing: ArrowRight },
};

export const CANCELLABLE_STATUSES: readonly AppointmentStatus[] = ["upcoming", "today"];

export const SUCCESS_STATUS: AppointmentStatus = "completed";

export const APPOINTMENT_META_ICONS = { time: Clock, pet: Paw, vet: Stethoscope, location: MapPin } as const;
