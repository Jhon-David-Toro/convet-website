import { AppointmentCard } from "@/components/patterns/AppointmentCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar } from "@/components/ui/Icon";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL_EMPTY, EMPTY_MESSAGES, EMPTY_TITLES, PANEL_ID } from "../CustomerAppointments.constants";
import styles from "../CustomerAppointments.module.scss";
import type { AppointmentListProps } from "../CustomerAppointments.types";
import { cardProps } from "@/lib/customer/customer.utils";

import { cancelHref, rescheduleHref } from "../CustomerAppointments.utils";

/**
 * Appointments of the selected tab as cards (the buttons reschedule or open the cancel dialog), or an empty state when there are none.
 *
 * @param props Props of the component, see {@link AppointmentListProps}.
 * @param props.tab Selected tab.
 * @param props.appointments Appointments of that tab.
 * @returns The rendered element.
 */
export function AppointmentList({ tab, appointments }: AppointmentListProps) {
  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.list}>
      {appointments.length === 0 && (
        <EmptyState icon={Calendar} title={EMPTY_TITLES[tab]} message={EMPTY_MESSAGES[tab]} action={tab === "upcoming" ? <Button href={BOOKING_HREF}>{BOOK_LABEL_EMPTY}</Button> : undefined} />
      )}
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} {...cardProps(appointment)} primaryHref={rescheduleHref(appointment)} secondaryHref={cancelHref(appointment)} />
      ))}
    </div>
  );
}
