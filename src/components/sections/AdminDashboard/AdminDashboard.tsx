import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { StatGrid } from "@/components/patterns/StatGrid";
import { DASHBOARD_STATS } from "@/lib/admin/admin.constants";

import { GREETING, SUBTITLE } from "./AdminDashboard.constants";
import { AlertsTable } from "./parts/AlertsTable";
import { OnlineBookingsNote } from "./parts/OnlineBookingsNote";
import { VetDayList } from "./parts/VetDayList";
import styles from "./AdminDashboard.module.scss";

/**
 * Dashboard of the admin area: the figures of the day, the inventory alerts, how each vet's day is going and the new online bookings.
 *
 * @returns The rendered element.
 */
export function AdminDashboard() {
  return (
    <PageStack>
      <PageHeader title={GREETING} subtitle={SUBTITLE} />
      <StatGrid stats={DASHBOARD_STATS} />
      <div className={styles.columns}>
        <AlertsTable />
        <div className={styles.side}>
          <VetDayList />
          <OnlineBookingsNote />
        </div>
      </div>
    </PageStack>
  );
}
