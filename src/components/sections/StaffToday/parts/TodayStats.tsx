import { StatCard } from "@/components/ui/StatCard";
import { STAFF_STATS } from "@/lib/staff.constants";

import styles from "../StaffToday.module.scss";

/**
 * Four figures of the day: appointments, waiting patients, low stock and expired lots.
 *
 * @returns The rendered element.
 */
export function TodayStats() {
  return (
    <div className={styles.stats}>
      {STAFF_STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
