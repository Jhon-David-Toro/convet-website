"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { StatGrid } from "@/components/patterns/StatGrid";
import { ModalButton } from "@/components/sections/ModalButton";
import { Plus } from "@/components/ui/Icon";
import { Pagination } from "@/components/ui/Pagination";

import { NEW_PATIENT_LABEL, PAGE_COUNT, PAGE_SIZE, STATS, SUBTITLE, TITLE, TOTAL } from "./StaffPatients.constants";
import { usePatientsState } from "./hooks/usePatientsState";
import { PatientsEmpty } from "./parts/PatientsEmpty";
import { PatientsFilters } from "./parts/PatientsFilters";
import { PatientsList } from "./parts/PatientsList";

/**
 * Patients page of the staff area: title with the new patient button, the figures of the clinic, filters, the list of patients and its pagination.
 *
 * @returns The rendered element.
 */
export function StaffPatients() {
  const { filters, setFilter, clearFilters, rows, page, setPage } = usePatientsState();

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        compactHidden
        actions={
          <ModalButton modal="patient" leadingIcon={Plus}>
            {NEW_PATIENT_LABEL}
          </ModalButton>
        }
      />
      <StatGrid stats={STATS} mobileHidden />
      <PatientsFilters filters={filters} setFilter={setFilter} />
      {rows.length === 0 ? (
        <PatientsEmpty query={filters.query} onClear={clearFilters} />
      ) : (
        <>
          <PatientsList rows={rows} />
          <Pagination page={page} pageCount={PAGE_COUNT} total={TOTAL} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </>
      )}
    </PageStack>
  );
}
