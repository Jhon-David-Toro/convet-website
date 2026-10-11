import { AppointmentCard } from "@/components/patterns/AppointmentCard";
import { CUSTOMER_APPOINTMENTS_HREF } from "@/lib/customer/customer.paths.constants";
import { cardProps, nextAppointmentOf } from "@/lib/customer/customer.utils";

import { UPCOMING_TITLE } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { NextStepCardProps } from "../PetProfile.types";

/**
 * Upcoming appointment of the pet; shows nothing when there is none.
 *
 * @param props Props of the component, see {@link NextStepCardProps}.
 * @param props.pet Pet the appointment is for.
 * @returns The rendered element, or `null`.
 */
export function UpcomingCard({ pet }: NextStepCardProps) {
  const appointment = nextAppointmentOf(pet);
  if (!appointment) return null;
  const { id } = appointment;

  return (
    <section className={styles.upcoming} aria-labelledby={`upcoming-${id}`}>
      <h2 id={`upcoming-${id}`} className={styles.cardTitle}>
        {UPCOMING_TITLE}
      </h2>
      <AppointmentCard {...cardProps(appointment)} primaryHref={CUSTOMER_APPOINTMENTS_HREF} secondaryHref={CUSTOMER_APPOINTMENTS_HREF} />
    </section>
  );
}
