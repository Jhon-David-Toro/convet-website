import { AlertTriangle, Box, Calendar } from "@/components/ui/Icon";

import { STAFF_INVENTORY_HREF, STAFF_SCHEDULE_HREF } from "./staff.paths.constants";
import type {
  StaffAppointment,
  StaffAttention,
  StaffClient,
  StaffOwner,
  StaffPatient,
  StaffStat,
  StaffTimelineEntry,
  StaffVaccine,
  StaffVet,
  StaffVisitForm,
  StaffVisitSummary,
} from "./staff.types";

export const STAFF_USER = { name: "Dr. Shirley", role: "Veterinarian" };

export const STAFF_VET_ID = "shirley";

export const STAFF_BRANCH = "Main clinic";

export const STAFF_TODAY_LABEL = "Thursday, October 1";

export const STAFF_TODAY_SHORT = "Thu, Oct 1";

export const STAFF_VETS: StaffVet[] = [
  { id: "shirley", name: "Dr. Shirley", photo: "dr-shirley" },
  { id: "larry", name: "Dr. Larry", photo: "dr-larry" },
  { id: "andreina", name: "Dr. Andreina", photo: "dr-andreina" },
];

export const STAFF_APPOINTMENTS: StaffAppointment[] = [
  { id: "toby", time: "10:00", duration: 60, vetId: "shirley", patient: "Toby", species: "dog", owner: "Anna Lee", reason: "Consultation", service: "Consultation", status: "in-progress" },
  { id: "nala", time: "10:00", duration: 30, vetId: "larry", patient: "Nala", species: "cat", owner: "Rosa Arends", reason: "Vaccination", service: "Vaccination", status: "arrived", alert: "Bites" },
  { id: "luna", time: "10:15", duration: 30, vetId: "andreina", patient: "Luna", species: "dog", owner: "Anna Lee", reason: "Consultation", service: "Consultation", status: "in-progress", alert: "Penicillin" },
  { id: "max", time: "11:00", duration: 45, vetId: "larry", patient: "Max", species: "dog", owner: "Carlos Ras", reason: "Treatment", service: "Treatment follow-up", status: "scheduled" },
  { id: "coco", time: "11:00", duration: 30, vetId: "andreina", patient: "Coco", species: "cat", owner: "booked online", reason: "Vaccination", service: "Vaccination", status: "new-online" },
  { id: "kira", time: "11:30", duration: 30, vetId: "shirley", patient: "Kira", species: "dog", owner: "Peter Dijkhoff", reason: "Follow-up", service: "Treatment follow-up", status: "scheduled" },
  { id: "duke", time: "9:00", duration: 30, vetId: "andreina", patient: "Duke", species: "dog", owner: "Ines Brete", reason: "Vaccination", service: "Vaccination", status: "completed" },
  { id: "rocky", time: "8:30", duration: 45, vetId: "shirley", patient: "Rocky", species: "dog", owner: "Jan Kock", reason: "Consultation", service: "Consultation", status: "no-show" },
  { id: "milo", time: "8:00", duration: 15, vetId: "shirley", patient: "Milo", species: "cat", owner: "Helen Werleman", reason: "Vaccination", service: "Vaccination", status: "completed" },
  { id: "bella", time: "8:15", duration: 45, vetId: "larry", patient: "Bella", species: "cat", owner: "Maria Geerman", reason: "Follow-up", service: "Treatment follow-up", status: "completed" },
  { id: "simba", time: "11:45", duration: 30, vetId: "andreina", patient: "Simba", species: "cat", owner: "Tom Figaroa", reason: "Consultation", service: "Consultation", status: "scheduled" },
  { id: "oreo", time: "12:00", duration: 15, vetId: "shirley", patient: "Oreo", species: "cat", owner: "Tom Figaroa", reason: "Vaccination", service: "Vaccination", status: "scheduled", alert: "Anxious" },
  { id: "pepper", time: "14:00", duration: 30, vetId: "larry", patient: "Pepper", species: "dog", owner: "Mia Croes", reason: "Vaccination", service: "Vaccination", status: "scheduled" },
  { id: "rex", time: "14:30", duration: 30, vetId: "larry", patient: "Rex", species: "dog", owner: "Eric Lopez", reason: "Consultation", service: "Consultation", status: "scheduled" },
];

export const STAFF_STATS: StaffStat[] = [
  { label: "Appointments today", value: 14, caption: "3 booked online", icon: Calendar, tone: "default" },
  { label: "Waiting now", value: 1, caption: "Nala arrived 10:28", icon: Calendar, tone: "default" },
  { label: "Low stock", value: 2, caption: "products below minimum", icon: Box, tone: "warning" },
  { label: "Expired lots", value: 1, caption: "2 doses blocked", icon: AlertTriangle, tone: "critical" },
];

export const STAFF_ATTENTION: StaffAttention[] = [
  { id: "online", tone: "info", title: "2 new online bookings", text: "Coco (today 11:00) and Bruno (Mon 9:00). Confirmed automatically.", actionLabel: "Review", href: STAFF_SCHEDULE_HREF },
  { id: "gloves", tone: "warning", title: "Low stock: surgical gloves M", text: "3 boxes left · minimum 5.", actionLabel: "Receive stock", href: STAFF_INVENTORY_HREF },
  { id: "rabies", tone: "warning", title: "Rabies lot RB-24187 expires Nov 30", text: "6 doses left. Use first.", actionLabel: "View lots", href: STAFF_INVENTORY_HREF },
  { id: "expired", tone: "error", title: "Expired lot with stock", text: "RB-23990 · 2 doses blocked.", actionLabel: "Record disposal", href: STAFF_INVENTORY_HREF },
];

export const STAFF_OWNER: StaffOwner = {
  id: "anna-lee",
  name: "Anna Lee",
  since: "Client since 2023 · 2 pets",
  pets: 2,
  phone: "+297 560 1234",
  email: "anna@example.com",
  whatsapp: "https://wa.me/2975601234",
};

export const STAFF_PATIENT: StaffPatient = {
  id: "luna",
  name: "Luna",
  species: "dog",
  description: "Dog · Mixed breed · Black & tan · Female, spayed · Born 15 Jun 2022 · 4 yrs 3 mos",
  summary: "Dog · Mixed breed · Black & tan · 4 yrs 3 mos",
  allergy: "Allergic to penicillin",
  microchip: "900164001234567",
  weight: "18.4 kg · Sep 12",
  currentWeight: "18.4 kg",
  nextVisit: "Oct 7",
  rabiesBadge: "Rabies due in 20 days",
  ownerId: "anna-lee",
};

export const STAFF_LAST_VISIT: StaffVisitSummary = {
  title: "Consultation · limping",
  meta: "Sep 12, 2026 · 10:30 AM · Dr. Shirley · Main clinic",
  vitals: { weight: "18.4 kg", temperature: "38.6 °C", heartRate: "96 bpm" },
  findings: "Pain on flexion of right carpus. No swelling. Mild lameness at walk.",
  diagnosis: "Soft tissue strain, right carpus.",
  plan: "Carprofen 50 mg q12h × 5 days. Rest 7 days. Recheck if lameness persists after Sep 19.",
  internalNotes: "Owner mentions she jumps off the sofa often. Consider X-ray if no improvement.",
  sharedSummary: "Mild strain in the right front leg. Rest for a week and anti-inflammatory tablets for 5 days.",
};

export const STAFF_TIMELINE: StaffTimelineEntry[] = [
  { id: "carprofen", type: "treatment", title: "Carprofen 50 mg · 5 days", meta: "Sep 12, 2026 · Dr. Shirley", summary: "Every 12 hours with food." },
  { id: "dhpp", type: "vaccine", title: "DHPP vaccine · lot DH-11820", meta: "Mar 3, 2026 · Dr. Larry", summary: "Next dose Mar 3, 2027." },
  { id: "paper", type: "document", title: "Paper record 2023–2025 (PDF, 12 pages)", meta: "Scanned Sep 12, 2026 by Dr. Ricardo", summary: "Imported from paper files." },
];

export const STAFF_VACCINES: StaffVaccine[] = [
  { id: "lepto", status: "overdue", vaccine: "Leptospirosis", dates: "Was due Aug 2, 2026", lot: "Last lot LP-24011" },
  { id: "rabies", status: "due-soon", vaccine: "Rabies", dates: "Next Oct 20, 2026", lot: "Last lot RB-22109" },
];

export const STAFF_CLIENT: StaffClient = {
  id: "anna-lee",
  name: "Anna Lee",
  phone: "+297 560 1234",
  email: "anna@example.com",
  since: "Client since Mar 2023",
  pets: [
    { id: "luna", species: "dog", name: "Luna", description: "Dog · Mixed breed · Black & tan · 4 yrs 3 mos", allergy: true, vaccine: { tone: "error", label: "Lepto overdue" } },
    { id: "milo", species: "cat", name: "Milo", description: "Cat · Domestic shorthair · Orange tabby · 7 yrs 2 mos", vaccine: { tone: "success", label: "Up to date" } },
  ],
  appointments: [
    { id: "client-luna-today", status: "today", month: "Oct", day: "01", weekday: "Thu", service: "Consultation · Luna", time: "10:15 AM · 30 min", pet: "Luna", vet: "Dr. Andreina" },
    { id: "client-luna-sep", status: "completed", month: "Sep", day: "12", weekday: "Sat", service: "Consultation · Luna", time: "10:30 AM · 30 min", pet: "Luna", vet: "Dr. Shirley" },
  ],
};

export const STAFF_VISIT: StaffVisitForm = {
  id: "luna-today",
  patientId: "luna",
  headline: "Consultation · 10:15 AM · Dr. Andreina",
  reason: "Limping has not improved after a week of rest",
  weight: "18.2",
  temperature: "38.6",
  heartRate: "",
  findings: "Pain on flexion of right carpus. No swelling. Walks with mild lameness.",
  diagnosis: "Persistent soft tissue strain, right carpus.",
  plan: "X-ray today. Continue rest. Recheck in 10 days.",
  vaccine: "leptospirosis",
  nextDose: "10 / 01 / 2027",
  lot: { code: "LP-25102", expires: "Jan 31, 2027", dosesLeft: 9 },
  expiredLot: "LP-23877",
  internalNotes: "",
  ownerSummary: "Luna's wrist is still sore. We took an X-ray and gave her the overdue leptospirosis vaccine. Keep resting her; we'll call you with results.",
  lastWeight: "Last: 18.4 kg · Sep 12",
  lastVisit: { title: "Last visit · Sep 12", text: "Right carpus strain. Carprofen 5 days.", document: "Paper record 2023–25" },
  draftSaved: "Draft saved 10:52",
};

export const MINUTES_PER_HOUR = 60;
