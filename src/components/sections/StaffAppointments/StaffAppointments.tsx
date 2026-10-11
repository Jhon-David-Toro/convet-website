"use client";

import { Pagination } from "@/components/ui/Pagination";

import { PAGE_SIZE } from "./StaffAppointments.constants";
import styles from "./StaffAppointments.module.scss";
import { useAppointmentTable } from "./hooks/useAppointmentTable";
import { AppointmentFilters } from "./parts/AppointmentFilters";
import { AppointmentsHeader } from "./parts/AppointmentsHeader";
import { AppointmentsTable } from "./parts/AppointmentsTable";

/**
 * Appointments page of the staff area: title with the new appointment button, filters, the table of the day and its pagination.
 *
 * @returns The rendered element.
 */
export function StaffAppointments() {
  const table = useAppointmentTable();

  return (
    <div className={styles.page}>
      <AppointmentsHeader />
      <AppointmentFilters filters={table.filters} setFilter={table.setFilter} />
      <AppointmentsTable rows={table.rows} />
      {table.total > 0 && <Pagination page={table.page} pageCount={table.pageCount} total={table.total} pageSize={PAGE_SIZE} onPageChange={table.setPage} />}
    </div>
  );
}
