import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { CUSTOMER_APPOINTMENTS, CUSTOMER_REMINDERS } from "@/lib/customer/customer.constants";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL } from "./CustomerOverview.constants";
import styles from "./CustomerOverview.module.scss";
import { OverviewActivity } from "./parts/OverviewActivity";
import { OverviewAppointment } from "./parts/OverviewAppointment";
import { OverviewPets } from "./parts/OverviewPets";
import { OverviewReminders } from "./parts/OverviewReminders";

/**
 * Overview of the customer area: next appointment, reminders, the pets and the recent activity.
 * On mobile a full-width booking button opens the page, because the top bar has no room for it.
 *
 * @returns The rendered element.
 */
export function CustomerOverview() {
  return (
    <>
      <Button variant="accent" href={BOOKING_HREF} leadingIcon={Plus} className={styles.mobileBook}>
        {BOOK_LABEL}
      </Button>
      <div className={styles.topRow}>
        <OverviewAppointment appointment={CUSTOMER_APPOINTMENTS[0]} />
        <OverviewReminders reminders={CUSTOMER_REMINDERS} />
      </div>
      <OverviewPets />
      <OverviewActivity />
    </>
  );
}
