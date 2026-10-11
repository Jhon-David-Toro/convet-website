import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Mail, Phone } from "@/components/ui/Icon";
import { STAFF_CLIENT, STAFF_OWNER, STAFF_TIMELINE } from "@/lib/staff/staff.constants";
import type { StaffOwner, StaffPatient, StaffTimelineEntry } from "@/lib/staff/staff.types";

import { BREADCRUMBS_OWNER_HREF, TAB_TYPES } from "./PatientRecord.constants";
import type { ContactItem, PatientTab } from "./PatientRecord.types";

/**
 * Entries of the history that belong to a tab of the record.
 *
 * @param tab Tab of the record.
 * @returns The entries of the tab; the appointments tab is built from the owner's appointments.
 */
export function entriesFor(tab: PatientTab): StaffTimelineEntry[] {
  if (tab === "appointments") return appointmentEntries();
  return STAFF_TIMELINE.filter((entry) => TAB_TYPES[tab].includes(entry.type));
}

/**
 * Appointments of the pet as entries of the history.
 *
 * @returns One entry per appointment of Luna.
 */
function appointmentEntries(): StaffTimelineEntry[] {
  return STAFF_CLIENT.appointments.map(({ id, status, month, day, weekday, service, time, vet }) => ({
    id,
    type: "visit",
    title: service,
    meta: `${weekday}, ${month} ${Number(day)} · ${time} · ${vet}`,
    summary: status === "today" ? "Today" : "Completed",
  }));
}

/**
 * Path shown above the record: the patients, the owner and the patient.
 *
 * @param patient Patient of the record.
 * @returns The breadcrumb items; the last one is the current page.
 */
export function patientCrumbs(patient: StaffPatient): BreadcrumbItem[] {
  return [{ label: "Patients" }, { label: STAFF_OWNER.name, href: BREADCRUMBS_OWNER_HREF }, { label: patient.name }];
}

/**
 * Phone and email of the owner as list items.
 *
 * @param owner Owner of the patient.
 * @returns The icon and text of each contact way.
 */
export function ownerContacts(owner: StaffOwner): ContactItem[] {
  return [
    { icon: Phone, text: owner.phone },
    { icon: Mail, text: owner.email },
  ];
}
