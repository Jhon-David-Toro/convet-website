import { SCHEDULE_STATUS_VIEWS } from "@/components/patterns/ScheduleEvent";
import type { SelectOption } from "@/components/ui/Select";
import { STAFF_VETS } from "@/lib/staff/staff.constants";

import type { AppointmentFilters, RangeValue } from "./StaffAppointments.types";

export const TITLE = "Appointments";

export const SUBTITLE = "Main clinic · Thursday, October 1";

export const NEW_APPOINTMENT_LABEL = "New appointment";

export const PAGE_SIZE = 8;

export const ALL_VALUE = "all";

export const INITIAL_FILTERS: AppointmentFilters = { query: "", range: "today", vet: ALL_VALUE, status: ALL_VALUE };

export const SEARCH_LABEL = "Search pet, owner or phone";

export const SEARCH_SHORTCUT = "Ctrl K";

export const RANGES: { value: RangeValue; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "week", label: "This week" },
];

export const RANGES_LABEL = "Date range";

export const RANGE_HAS_DATA: Record<RangeValue, boolean> = { today: true, tomorrow: false, week: true };

export const VET_FILTER_LABEL = "Vet";

export const STATUS_FILTER_LABEL = "Status";

export const VET_OPTIONS: SelectOption[] = [{ value: ALL_VALUE, label: "All vets" }, ...STAFF_VETS.map((vet) => ({ value: vet.id, label: vet.name }))];

export const STATUS_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "All statuses" },
  ...Object.entries(SCHEDULE_STATUS_VIEWS).map(([value, view]) => ({ value, label: view.label })),
];

export const COLUMNS = ["Time", "Patient", "Service", "Vet", "Status"];

export const ACTIONS_COLUMN_LABEL = "Actions";

export const TABLE_LABEL = "Appointments of the day";

export const TABLE_ORDER = ["toby", "nala", "luna", "max", "coco", "kira", "duke", "rocky", "simba", "oreo", "pepper", "rex", "bella", "milo"];

export const EMPTY_TITLE = "No appointments found";

export const EMPTY_MESSAGE = "Try another day, vet or status.";
