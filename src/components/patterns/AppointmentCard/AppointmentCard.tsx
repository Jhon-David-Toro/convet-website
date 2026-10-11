import { cx } from "@/lib/cx";

import styles from "./AppointmentCard.module.scss";
import { APPOINTMENT_META_ICONS, APPOINTMENT_STATUS_VIEWS } from "./AppointmentCard.constants";
import type { AppointmentCardProps } from "./AppointmentCard.types";
import { AppointmentActions } from "./parts/AppointmentActions";
import { AppointmentDate } from "./parts/AppointmentDate";
import { AppointmentHeading } from "./parts/AppointmentHeading";
import { AppointmentMeta } from "./parts/AppointmentMeta";

/**
 * Card/Appointment: appointment with a date block, details and actions that depend on its status.
 *
 * @param props Props of the component, see {@link AppointmentCardProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.month Abbreviated month in uppercase, e.g. "OCT".
 * @param props.day Day of the month.
 * @param props.weekday Abbreviated weekday, e.g. "Wed".
 * @param props.service Service name or summary row.
 * @param props.time Time and duration, e.g. "9:45 AM · 15 min".
 * @param props.pet Pet name or summary row.
 * @param props.vet Veterinarian name or summary row.
 * @param props.location Place of the appointment.
 * @param props.primaryHref Link of the primary action.
 * @param props.secondaryHref Only for upcoming or same-day appointments (Cancel).
 * @param props.statusLabel Overrides the status label ("Scheduled", "Today"…).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function AppointmentCard({
  status,
  month,
  day,
  weekday,
  service,
  time,
  pet,
  vet,
  location,
  primaryHref,
  secondaryHref,
  statusLabel,
  className,
  ...rest
}: AppointmentCardProps) {
  const view = APPOINTMENT_STATUS_VIEWS[status];
  const meta = [
    { icon: APPOINTMENT_META_ICONS.time, text: time },
    { icon: APPOINTMENT_META_ICONS.pet, text: pet },
    { icon: APPOINTMENT_META_ICONS.vet, text: vet },
    { icon: APPOINTMENT_META_ICONS.location, text: location },
  ].filter(({ text }) => text);

  return (
    <article {...rest} className={cx(styles.card, styles[status], className)}>
      <AppointmentDate month={month} day={day} weekday={weekday} />
      <div className={styles.details}>
        <AppointmentHeading service={service} status={status} statusLabel={statusLabel} view={view} />
        <AppointmentMeta items={meta} />
        <AppointmentActions status={status} primaryHref={primaryHref} secondaryHref={secondaryHref} view={view} />
      </div>
    </article>
  );
}
