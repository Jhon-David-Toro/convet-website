import { cx } from "@/lib/shared/cx";

import styles from "./ScheduleEvent.module.scss";
import { EventFooter } from "./parts/EventFooter";
import { EventHeader } from "./parts/EventHeader";
import { SCHEDULE_STATUS_VIEWS } from "./ScheduleEvent.constants";
import type { ScheduleEventProps } from "./ScheduleEvent.types";

/**
 * Schedule/Event: appointment on the schedule. The side bar and the label convey the status (never color alone).
 *
 * @param props Props of the component, see {@link ScheduleEventProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.species Species of the patient or the service (dog, cat…).
 * @param props.title Patient and reason, e.g. "Luna · Vaccination".
 * @param props.meta Time range and owner, e.g. "10:15 – 10:30 · Anna Lee".
 * @param props.alert Short medical alert, e.g. "Penicillin".
 * @param props.statusLabel Overrides the default label of the status.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ScheduleEvent({ status, species, title, meta, alert, statusLabel, className, ...rest }: ScheduleEventProps) {
  const view = SCHEDULE_STATUS_VIEWS[status];

  return (
    <article {...rest} className={cx(styles.event, styles[view.classKey], className)}>
      <span className={styles.bar} aria-hidden="true" />
      <div className={styles.body}>
        <EventHeader species={species} title={title} />
        <p className={styles.meta}>{meta}</p>
        <EventFooter status={status} statusLabel={statusLabel} alert={alert} view={view} />
      </div>
    </article>
  );
}
