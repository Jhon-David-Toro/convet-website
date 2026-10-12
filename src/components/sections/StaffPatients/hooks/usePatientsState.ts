import { useState } from "react";

import { INITIAL_FILTERS } from "../StaffPatients.constants";
import type { PatientFilters, PatientsState } from "../StaffPatients.types";
import { filterPatients } from "../StaffPatients.utils";

/**
 * State of the patients page: the filters, the page and the patients that pass the filters.
 *
 * @returns The filters with their setters, the matching patients and the current page.
 */
export function usePatientsState(): PatientsState {
  const [filters, setFilters] = useState<PatientFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  return {
    filters,
    setFilter: (field, value) => {
      setFilters((current) => ({ ...current, [field]: value }));
      setPage(1);
    },
    clearFilters: () => {
      setFilters(INITIAL_FILTERS);
      setPage(1);
    },
    rows: filterPatients(filters),
    page,
    setPage,
  };
}
