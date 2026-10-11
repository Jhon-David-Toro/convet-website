import { AppointmentCard } from "@/components/patterns/AppointmentCard";
import { CUSTOMER_APPOINTMENTS_HREF } from "@/lib/customer/customer.paths.constants";
import { cardProps } from "@/lib/customer/customer.utils";

import { NEXT_TITLE } from "../CustomerOverview.constants";
import type { OverviewAppointmentProps } from "../CustomerOverview.types";
import styles from "../CustomerOverview.module.scss";

/**
 * Next appointment of the customer with the buttons to reschedule or cancel it.
 *
 * @param props Props of the component, see {@link OverviewAppointmentProps}.
 * @param props.appointment Appointment to show.
 * @returns The rendered element.
 */
export function OverviewAppointment({ appointment }: OverviewAppointmentProps) {
  const { id } = appointment;

  return (
    <section className={styles.block} aria-labelledby={`next-${id}`}>
      <h2 id={`next-${id}`} className={styles.blockTitle}>
        {NEXT_TITLE}
      </h2>
      <AppointmentCard {...cardProps(appointment)} primaryHref={CUSTOMER_APPOINTMENTS_HREF} secondaryHref={CUSTOMER_APPOINTMENTS_HREF} />
    </section>
  );
}
