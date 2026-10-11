import { useState } from "react";

import { INITIAL_FILTERS } from "../StaffAppointments.constants";
import type { AppointmentFilters, AppointmentTableState } from "../StaffAppointments.types";
import { filterAppointments, pageCountFor, pageRows } from "../StaffAppointments.utils";

/**
 * Filters and page of the appointments table. Changing a filter goes back to the first page.
 *
 * @returns The filters, the rows of the current page and the functions that change them.
 */
export function useAppointmentTable(): AppointmentTableState {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const matching = filterAppointments(filters);
  const pageCount = pageCountFor(matching.length);

  /**
   * Changes one filter and goes back to the first page.
   *
   * @param field Filter to change.
   * @param value New value of the filter.
   */
  function setFilter<Field extends keyof AppointmentFilters>(field: Field, value: AppointmentFilters[Field]) {
    setFilters((current) => ({ ...current, [field]: value }));
    setPage(1);
  }

  return { filters, page, pageCount, total: matching.length, rows: pageRows(matching, page), setFilter, setPage };
}
