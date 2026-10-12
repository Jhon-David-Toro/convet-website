import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar } from "@/components/ui/Icon";

import { EMPTY_MESSAGE, EMPTY_TITLE, TABLE_LABEL } from "../StaffAppointments.constants";
import type { AppointmentsTableProps } from "../StaffAppointments.types";
import { AppointmentCards } from "./AppointmentCards";
import { AppointmentsBody } from "./AppointmentsBody";
import { AppointmentsHead } from "./AppointmentsHead";
import styles from "../StaffAppointments.module.scss";

/**
 * Appointments of the day: cards on mobile and a table from tablet, or an empty state when no appointment matches the filters.
 *
 * @param props Props of the component, see {@link AppointmentsTableProps}.
 * @param props.rows Appointments of the current page.
 * @returns The rendered element.
 */
export function AppointmentsTable({ rows }: AppointmentsTableProps) {
  if (rows.length === 0) return <EmptyState icon={Calendar} title={EMPTY_TITLE} message={EMPTY_MESSAGE} />;

  return (
    <>
      <AppointmentCards rows={rows} />
      <div className={styles.tableWrap}>
        <table className={styles.table} aria-label={TABLE_LABEL}>
          <AppointmentsHead />
          <AppointmentsBody rows={rows} />
        </table>
      </div>
    </>
  );
}
