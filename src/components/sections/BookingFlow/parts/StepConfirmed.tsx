import { AppointmentCard } from "@/components/patterns/AppointmentCard";
import { BookingSummary } from "@/components/patterns/BookingSummary";

import { APPOINTMENTS_HREF } from "../BookingFlow.constants";
import type { StepConfirmedProps } from "../BookingFlow.types";
import {
  bookingSummary,
  confirmedAppointment,
} from "../BookingFlow.utils";
import { ConfirmedActions } from "./ConfirmedActions";
import { ConfirmedHeader } from "./ConfirmedHeader";
import { WhatsAppBanner } from "./WhatsAppBanner";
import styles from "../BookingFlow.module.scss";

/**
 * Confirmation: a green check, what was booked, the WhatsApp banner and the next actions.
 *
 * @param props Props of the component, see {@link StepConfirmedProps}.
 * @param props.selection What was booked.
 * @param props.pets Customer's registered pets.
 * @param props.restart Starts a new booking for another pet.
 * @returns The rendered element.
 */
export function StepConfirmed({
  selection,
  pets,
  restart,
}: StepConfirmedProps) {
  return (
    <div className={styles.confirmed}>
      <ConfirmedHeader date={selection.date} />

      <AppointmentCard
        status="upcoming"
        {...confirmedAppointment(selection, pets)}
        primaryHref={APPOINTMENTS_HREF}
        className={styles.confirmedCard}
      />

      <BookingSummary
        {...bookingSummary(selection, pets)}
        className={styles.confirmedSummary}
      />

      <WhatsAppBanner selection={selection} pets={pets} />

      <ConfirmedActions
        selection={selection}
        pets={pets}
        restart={restart}
      />
    </div>
  );
}