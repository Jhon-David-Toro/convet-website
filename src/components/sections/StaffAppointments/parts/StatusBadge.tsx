import { SCHEDULE_STATUS_VIEWS } from "@/components/patterns/ScheduleEvent";
import { Badge } from "@/components/ui/Badge";

import type { StatusBadgeProps } from "../StaffAppointments.types";

/**
 * Badge with the status of an appointment: its icon and label, never color alone.
 *
 * @param props Props of the component, see {@link StatusBadgeProps}.
 * @param props.status Status of the appointment.
 * @returns The rendered element.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const { tone, icon, label } = SCHEDULE_STATUS_VIEWS[status];

  return (
    <Badge tone={tone} icon={icon}>
      {label}
    </Badge>
  );
}
