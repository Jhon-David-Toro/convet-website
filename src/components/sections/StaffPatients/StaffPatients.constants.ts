import type { StatGridItem } from "@/components/patterns/StatGrid";
import type { BadgeProps } from "@/components/ui/Badge";
import { AlertTriangle, Box, Calendar, Check, Syringe } from "@/components/ui/Icon";
import type { SelectOption } from "@/components/ui/Select";
import type { PatientSpecies, PatientVaccineStatus } from "@/lib/staff/staff.types";

import type { PatientFilters } from "./StaffPatients.types";

export const TITLE = "Patients";

export const SUBTITLE = "Animals registered at Main clinic. Their owners are managed in Clients.";

export const NEW_PATIENT_LABEL = "New patient";

export const SEARCH_LABEL = "Pet name, owner, phone or microchip";

export const SEARCH_SHORTCUT = "Ctrl K";

export const TABLE_LABEL = "Patients";

export const COLUMNS = ["Patient (pet)", "Born · age", "Color", "Owner (client)", "Next appointment", "Vaccines"];

export const CHIPS_LABEL = "Show";

export const SPECIES_LABEL = "Species";

export const VET_LABEL = "Vet";

export const VACCINE_LABEL = "Vaccine status";

export const ALL_VALUE = "all";

export const CHIP_UPCOMING = "upcoming";

export const CHIP_OTHER = "other";

export const MAIN_SPECIES = ["dog", "cat"];

export const INITIAL_FILTERS: PatientFilters = { query: "", chip: ALL_VALUE, species: ALL_VALUE, vet: ALL_VALUE, vaccine: ALL_VALUE };

export const CHIP_OPTIONS = [
  { value: ALL_VALUE, label: "All", count: 214 },
  { value: "dog", label: "Dogs", count: 132 },
  { value: "cat", label: "Cats", count: 61 },
  { value: CHIP_OTHER, label: "Other species", count: 21 },
  { value: CHIP_UPCOMING, label: "Upcoming visit", count: 27 },
];

export const SPECIES_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "All species" },
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
  { value: "bird", label: "Birds" },
  { value: "horse", label: "Horses" },
];

export const VET_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "Any vet" },
  { value: "shirley", label: "Dr. Shirley" },
  { value: "larry", label: "Dr. Larry" },
  { value: "ricardo", label: "Dr. Ricardo" },
];

export const VACCINE_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "Any" },
  { value: "ok", label: "Up to date" },
  { value: "due", label: "Due soon" },
  { value: "overdue", label: "Overdue" },
  { value: "none", label: "No records yet" },
];

export const STATS: StatGridItem[] = [
  { label: "Patients", value: 214, caption: "132 dogs · 61 cats · 21 other", icon: Calendar, tone: "default" },
  { label: "Seen this month", value: 38, caption: "Since Oct 1, 2026", icon: Calendar, tone: "default" },
  { label: "Vaccines due ≤ 30 days", value: 12, caption: "Reminders sent automatically", icon: Box, tone: "warning" },
  { label: "Overdue vaccines", value: 4, caption: "Call or message owners", icon: AlertTriangle, tone: "critical" },
];

export const SPECIES_NAMES: Record<PatientSpecies, string> = { dog: "Dog", cat: "Cat", bird: "Bird", horse: "Horse" };

export const TOTAL = 214;

export const PAGE_SIZE = 6;

export const PAGE_COUNT = 36;

export const VACCINE_BADGES: Record<PatientVaccineStatus, { tone: NonNullable<BadgeProps["tone"]>; icon?: BadgeProps["icon"] }> = {
  due: { tone: "warning", icon: Syringe },
  ok: { tone: "success", icon: Check },
  overdue: { tone: "error", icon: AlertTriangle },
  none: { tone: "neutral" },
  "not-required": { tone: "neutral" },
};

export const OWNER_PREFIX = "Owner:";

export const EMPTY_ADD_LABEL = "Add a pet";

export const EMPTY_CLEAR_LABEL = "Clear filters";

export const EMPTY_MESSAGE = "Check the spelling, search by owner phone or microchip, or clear filters.";

export const ACTIONS_LABEL_PREFIX = "Actions for";
