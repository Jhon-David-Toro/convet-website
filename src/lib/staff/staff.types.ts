import type { LucideIcon } from "lucide-react";

import type { ScheduleStatus } from "@/components/patterns/ScheduleEvent";
import type { AlertTone } from "@/components/ui/Alert";
import type { StatTone } from "@/components/ui/StatCard";

export type StaffSpecies = "dog" | "cat";

export type StaffVet = {
  id: string;
  name: string;
  photo: string;
};

export type StaffAppointment = {
  id: string;
  time: string;
  duration: number;
  vetId: string;
  patient: string;
  species: StaffSpecies;
  owner: string;
  reason: string;
  service: string;
  status: ScheduleStatus;
  alert?: string;
};

export type StaffStat = {
  label: string;
  value: number;
  caption: string;
  icon: LucideIcon;
  tone: StatTone;
};

export type StaffAttention = {
  id: string;
  tone: AlertTone;
  title: string;
  text: string;
  actionLabel: string;
  href: string;
};

export type StaffVitals = {
  weight: string;
  temperature: string;
  heartRate: string;
};

export type StaffVisitSummary = {
  title: string;
  meta: string;
  vitals: StaffVitals;
  findings: string;
  diagnosis: string;
  plan: string;
  internalNotes: string;
  sharedSummary: string;
};

export type StaffTimelineEntry = {
  id: string;
  type: "visit" | "vaccine" | "treatment" | "document";
  title: string;
  meta: string;
  summary: string;
};

export type StaffVaccine = {
  id: string;
  status: "up-to-date" | "due-soon" | "overdue";
  vaccine: string;
  dates: string;
  lot: string;
};

export type StaffOwner = {
  id: string;
  name: string;
  since: string;
  pets: number;
  phone: string;
  email: string;
  whatsapp: string;
};

export type StaffPatient = {
  id: string;
  name: string;
  species: StaffSpecies;
  description: string;
  summary: string;
  allergy: string;
  microchip: string;
  weight: string;
  currentWeight: string;
  nextVisit: string;
  rabiesBadge: string;
  ownerId: string;
};

export type StaffClientPet = {
  id: string;
  species: StaffSpecies;
  name: string;
  description: string;
  allergy?: boolean;
  vaccine: { tone: "success" | "error"; label: string };
};

export type StaffClientAppointment = {
  id: string;
  status: "today" | "completed";
  month: string;
  day: string;
  weekday: string;
  service: string;
  time: string;
  pet: string;
  vet: string;
};

export type StaffClient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  since: string;
  pets: StaffClientPet[];
  appointments: StaffClientAppointment[];
};

export type StaffLot = {
  code: string;
  expires: string;
  dosesLeft: number;
};

export type StaffVisitForm = {
  id: string;
  patientId: string;
  headline: string;
  reason: string;
  weight: string;
  temperature: string;
  heartRate: string;
  findings: string;
  diagnosis: string;
  plan: string;
  vaccine: string;
  nextDose: string;
  lot: StaffLot;
  internalNotes: string;
  ownerSummary: string;
  lastWeight: string;
  lastVisit: { title: string; text: string; document: string };
  draftSaved: string;
};

export type PatientSpecies = "dog" | "cat" | "bird" | "horse";

export type PatientVaccineStatus = "due" | "ok" | "overdue" | "none" | "not-required";

export type StaffPatientRow = {
  id: string;
  name: string;
  species: PatientSpecies;
  breed: string;
  born: string;
  age: string;
  color: string;
  owner: string;
  phone: string;
  nextWhen: string;
  nextWhat: string;
  nextShort: string;
  vetId: string;
  vaccine: PatientVaccineStatus;
  vaccineLabel: string;
};

export type InventoryStatus = "in-stock" | "expires" | "low" | "out" | "blocked";

export type InventoryLotStatus = "use-first" | "ok";

export type InventoryLot = {
  code: string;
  expiry: string;
  quantity: number;
  status: InventoryLotStatus;
};

export type InventoryMovement = {
  id: string;
  text: string;
  meta: string;
};

export type StaffInventoryRow = {
  id: string;
  name: string;
  description: string;
  sku: string;
  type: string;
  onHand: string;
  unit: string;
  stockNote: string;
  lotCode: string;
  lotNote: string;
  status: InventoryStatus;
  statusLabel: string;
  unitName: string;
  minimum: string;
  prescription: string;
  storage: string;
  uuid: string;
  lots: InventoryLot[];
  movements: InventoryMovement[];
};
