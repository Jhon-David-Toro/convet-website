import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar } from "@/components/ui/Icon";

import { EMPTY_MESSAGE, EMPTY_TITLE, TABLE_LABEL } from "../StaffAppointments.constants";
import styles from "../StaffAppointments.module.scss";
import type { AppointmentsTableProps } from "../StaffAppointments.types";
import { AppointmentsBody } from "./AppointmentsBody";
import { AppointmentsHead } from "./AppointmentsHead";

/**
 * Table of the appointments of the day, or an empty state when no appointment matches the filters.
 *
 * @param props Props of the component, see {@link AppointmentsTableProps}.
 * @param props.rows Appointments of the current page.
 * @returns The rendered element.
 */
export function AppointmentsTable({ rows }: AppointmentsTableProps) {
  if (rows.length === 0) return <EmptyState icon={Calendar} title={EMPTY_TITLE} message={EMPTY_MESSAGE} />;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table} aria-label={TABLE_LABEL}>
        <AppointmentsHead />
        <AppointmentsBody rows={rows} />
      </table>
    </div>
  );
}
