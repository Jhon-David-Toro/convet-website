import { Button } from "@/components/ui/Button";
import { Calendar, Plus, Refresh } from "@/components/ui/Icon";

import { APPOINTMENTS_HREF, CONFIRMED_ACTIONS } from "../BookingFlow.constants";
import styles from "../BookingFlow.module.scss";
import type { ConfirmedActionsProps } from "../BookingFlow.types";
import { calendarFileHref } from "../BookingFlow.utils";

/**
 * Buttons of the confirmation: add to calendar, reschedule, go to the appointments and book for another pet.
 *
 * @param props Props of the component, see {@link ConfirmedActionsProps}.
 * @param props.selection What was booked.
 * @param props.restart Starts a new booking for another pet.
 * @returns The rendered element.
 */
export function ConfirmedActions({ selection, restart }: ConfirmedActionsProps) {
  return (
    <div className={styles.confirmedActions}>
      <Button variant="secondary" href={calendarFileHref(selection)} download="convet-visit.ics" leadingIcon={Calendar}>
        {CONFIRMED_ACTIONS.calendar}
      </Button>
      <Button variant="secondary" href={APPOINTMENTS_HREF} leadingIcon={Refresh} className={styles.reschedule}>
        {CONFIRMED_ACTIONS.reschedule}
      </Button>
      <Button href={APPOINTMENTS_HREF}>{CONFIRMED_ACTIONS.appointments}</Button>
      <Button type="button" variant="tertiary" leadingIcon={Plus} onClick={restart} className={styles.another}>
        {CONFIRMED_ACTIONS.another}
      </Button>
    </div>
  );
}
