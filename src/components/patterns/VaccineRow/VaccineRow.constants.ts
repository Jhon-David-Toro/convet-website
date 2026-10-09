import { AlertTriangle, Check, Clock } from "@/components/ui/Icon";

import type { VaccineStatus, VaccineStatusView } from "./VaccineRow.types";

/** Badge tone, icon and default label for each vaccine status. */
export const VACCINE_STATUS_VIEWS: Record<VaccineStatus, VaccineStatusView> = {
  "up-to-date": { tone: "success", icon: Check, label: "Up to date" },
  "due-soon": { tone: "warning", icon: Clock, label: "Due soon" },
  overdue: { tone: "error", icon: AlertTriangle, label: "Overdue" },
};

/** Status whose badge icon is tinted with the primary color. */
export const UP_TO_DATE_STATUS: VaccineStatus = "up-to-date";
