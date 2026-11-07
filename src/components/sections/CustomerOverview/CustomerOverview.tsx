import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { petHref } from "@/lib/customer/customer.utils";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL } from "./CustomerOverview.constants";
import type { CustomerOverviewProps } from "./CustomerOverview.types";
import { OverviewActivity } from "./parts/OverviewActivity";
import { OverviewAppointment } from "./parts/OverviewAppointment";
import { OverviewPets } from "./parts/OverviewPets";
import { OverviewReminders } from "./parts/OverviewReminders";
import styles from "./CustomerOverview.module.scss";

/**
 * Overview of the customer area: next appointment, reminders, the pets and the recent activity.
 * On mobile a full-width booking button opens the page, because the top bar has no room for it.
 *
 * Blocks that have no data (appointment, reminders, activity) are left out instead of showing placeholders.
 *
 * @param props Props of the component, see {@link CustomerOverviewProps}.
 * @param props.pets Pets of the customer.
 * @param props.loadError Message shown instead of the pets when they could not be loaded.
 * @param props.appointment Next appointment.
 * @param props.reminders Reminders.
 * @param props.activity Recent activity.
 * @returns The rendered element.
 */
export function CustomerOverview({ pets, loadError, appointment, reminders = [], activity = [] }: CustomerOverviewProps) {
  const hasTopRow = appointment !== undefined || reminders.length > 0;

  return (
    <>
      <Button variant="accent" href={BOOKING_HREF} leadingIcon={Plus} className={styles.mobileBook}>
        {BOOK_LABEL}
      </Button>
      {hasTopRow && (
        <div className={styles.topRow}>
          {appointment && <OverviewAppointment appointment={appointment} />}
          {reminders.length > 0 && <OverviewReminders reminders={reminders} />}
        </div>
      )}
      <OverviewPets pets={pets} loadError={loadError} />
      {activity.length > 0 && pets.length > 0 && <OverviewActivity events={activity} historyHref={petHref(pets[0], "history")} />}
    </>
  );
}
