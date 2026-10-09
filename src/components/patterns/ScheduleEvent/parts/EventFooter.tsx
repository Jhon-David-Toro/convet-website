import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, Icon } from "@/components/ui/Icon";

import styles from "../ScheduleEvent.module.scss";
import { COMPLETED_STATUS, SCHEDULE_ALERT_ICON_SIZE } from "../ScheduleEvent.constants";
import type { EventFooterProps } from "../ScheduleEvent.types";

/**
 * Status badge with the optional medical alert.
 *
 * @param props Props of the component, see {@link EventFooterProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.statusLabel Overrides the default label of the status.
 * @param props.alert Short medical alert, e.g. "Penicillin".
 * @param props.view How the status is presented.
 * @returns The rendered element.
 */
export function EventFooter({ status, statusLabel, alert, view }: EventFooterProps) {
  return (
    <div className={styles.bottom}>
      <Badge tone={view.tone} icon={view.icon} iconTone={status === COMPLETED_STATUS ? "primary" : undefined}>
        {statusLabel ?? view.label}
      </Badge>
      {alert && (
        <span className={styles.alert}>
          <Icon icon={AlertTriangle} size={SCHEDULE_ALERT_ICON_SIZE} tone="error" />
          {alert}
        </span>
      )}
    </div>
  );
}
