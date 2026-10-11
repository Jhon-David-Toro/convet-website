"use client";

import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { FilterChips } from "@/components/patterns/FilterChips";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Button } from "@/components/ui/Button";
import { Calendar, Plus } from "@/components/ui/Icon";
import { ADMIN_NAV_HREFS } from "@/lib/admin.paths.constants";
import { STAFF_NEW_APPOINTMENT_HREF } from "@/lib/staff.paths.constants";

import { COLUMNS, DAY_VIEW_LABEL, FILTERS_LABEL, FILTER_OPTIONS, NEW_LABEL, SUBTITLE, TABLE_LABEL, TITLE } from "./AdminAppointments.constants";
import { appointmentsFor } from "./AdminAppointments.utils";
import { AppointmentRow } from "./parts/AppointmentRow";

/**
 * Appointments page of the admin area: chips by status with how many there are, and the table of appointments of every vet.
 *
 * @returns The rendered element.
 */
export function AdminAppointments() {
  const [filter, setFilter] = useState("all");

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <>
            <Button href={ADMIN_NAV_HREFS.schedule} variant="secondary" leadingIcon={Calendar}>
              {DAY_VIEW_LABEL}
            </Button>
            <Button href={STAFF_NEW_APPOINTMENT_HREF} leadingIcon={Plus}>
              {NEW_LABEL}
            </Button>
          </>
        }
      />
      <FilterChips label={FILTERS_LABEL} options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
      <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="48rem">
        {appointmentsFor(filter).map((appointment) => (
          <AppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </DataTable>
    </PageStack>
  );
}
