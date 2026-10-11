import { Badge } from "@/components/ui/Badge";

import { SUCCESS_STATUS } from "../AppointmentCard.constants";
import type { AppointmentHeadingProps } from "../AppointmentCard.types";
import styles from "../AppointmentCard.module.scss";

/**
 * Service name with the status badge.
 *
 * @param props Props of the component, see {@link AppointmentHeadingProps}.
 * @param props.service Service name or summary row.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.statusLabel Overrides the status label ("Scheduled", "Today"…).
 * @param props.view How the status is presented.
 * @returns The rendered element.
 */
export function AppointmentHeading({ service, status, statusLabel, view }: AppointmentHeadingProps) {
  return (
    <div className={styles.heading}>
      <h3 className={styles.service}>{service}</h3>
      <Badge tone={view.tone} icon={view.icon} iconTone={status === SUCCESS_STATUS ? "primary" : undefined}>
        {statusLabel ?? view.label}
      </Badge>
    </div>
  );
}
