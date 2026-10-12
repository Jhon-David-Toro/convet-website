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

export const STAFF_TODAY_LABEL = "Friday, October 9";

export const STAFF_TODAY_SHORT = "Fri, Oct 9";

export const STAFF_VETS: StaffVet[] = [
  { id: "shirley", name: "Dr. Shirley", photo: "dr-shirley" },
  { id: "larry", name: "Dr. Larry", photo: "dr-larry" },
  { id: "susana", name: "Dr. Susana", photo: "dr-andreina" },
];

export const STAFF_APPOINTMENTS: StaffAppointment[] = [
  { id: "coco", time: "8:00", duration: 30, vetId: "susana", patient: "Coco", species: "cat", owner: "Helen Werleman", reason: "Vaccination", service: "Vaccination", status: "completed" },
  { id: "simba", time: "8:30", duration: 30, vetId: "susana", patient: "Simba", species: "cat", owner: "Tom Figaroa", reason: "Consultation", service: "Consultation", status: "completed", alert: "Penicillin allergy" },
  { id: "duke", time: "9:00", duration: 30, vetId: "shirley", patient: "Duke", species: "dog", owner: "Ines Brete", reason: "Vaccination", service: "Vaccination", status: "completed" },
  { id: "luna", time: "9:30", duration: 30, vetId: "shirley", patient: "Luna", species: "dog", owner: "Anna Lee", reason: "Rabies booster & recheck", service: "Consultation", status: "in-progress", alert: "Penicillin allergy" },
  { id: "bruno", time: "10:00", duration: 30, vetId: "larry", patient: "Bruno", species: "dog", owner: "Rosa Arends", reason: "Vaccination", service: "Vaccination", status: "arrived", alert: "Bites · use muzzle" },
  { id: "lola", time: "10:00", duration: 30, vetId: "susana", patient: "Lola", species: "cat", owner: "booked online", reason: "Vaccination", service: "Vaccination", status: "new-online" },
  { id: "toby", time: "10:10", duration: 30, vetId: "shirley", patient: "Toby", species: "dog", owner: "Peter Dijkhoff", reason: "Consultation", service: "Consultation", status: "scheduled" },
  { id: "pepper", time: "10:30", duration: 30, vetId: "larry", patient: "Pepper", species: "dog", owner: "Maria Geerman", reason: "Follow-up", service: "Treatment follow-up", status: "scheduled", alert: "Bites · use muzzle" },
  { id: "daisy", time: "11:00", duration: 30, vetId: "larry", patient: "Daisy", species: "dog", owner: "Carlos Ras", reason: "Treatment", service: "Treatment follow-up", status: "scheduled" },
  { id: "kira", time: "11:30", duration: 30, vetId: "shirley", patient: "Kira", species: "dog", owner: "Jan Kock", reason: "Follow-up", service: "Treatment follow-up", status: "scheduled" },
  { id: "oscar", time: "11:40", duration: 30, vetId: "susana", patient: "Oscar", species: "cat", owner: "Lucia Croes", reason: "Consultation", service: "Consultation", status: "scheduled" },
];

export const STAFF_STATS: StaffStat[] = [
  { label: "Appointments today", value: 11, caption: "3 booked online", icon: Calendar, tone: "default" },
  { label: "Waiting now", value: 1, caption: "Bruno arrived 9:38", icon: Calendar, tone: "default" },
  { label: "Low stock", value: 3, caption: "below minimum or out of stock", icon: Box, tone: "warning" },
  { label: "Expired lots", value: 1, caption: "6 doses blocked", icon: AlertTriangle, tone: "critical" },
];

export const STAFF_ATTENTION: StaffAttention[] = [
  { id: "online", tone: "info", title: "2 new online bookings", text: "Lola (today 10:00) and Rex (Mon, Oct 12 · 9:00 AM). Confirmed automatically.", actionLabel: "Review", href: STAFF_SCHEDULE_HREF },
  { id: "gloves", tone: "warning", title: "Low stock: Carprofen 100 mg", text: "3 boxes left · minimum 5.", actionLabel: "Receive stock", href: STAFF_INVENTORY_HREF },
  { id: "rabies", tone: "warning", title: "Carprofen lot CP-7802 expires Nov 30", text: "28 tablets left. Use first.", actionLabel: "View lots", href: STAFF_INVENTORY_HREF },
  { id: "expired", tone: "error", title: "Expired lot with stock", text: "Leptospirosis lot LP-0931 · 6 doses blocked.", actionLabel: "Record disposal", href: STAFF_INVENTORY_HREF },
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
  weight: "18.4 kg · Sep 11",
  currentWeight: "18.4 kg",
  nextVisit: "Oct 9",
  rabiesBadge: "Rabies due in 11 days",
  ownerId: "anna-lee",
};

export const STAFF_LAST_VISIT: StaffVisitSummary = {
  title: "Consultation · limping",
  meta: "Sep 11, 2026 · 10:30 AM · Dr. Shirley · Main clinic",
  vitals: { weight: "18.4 kg", temperature: "38.6 °C", heartRate: "96 bpm" },
  findings: "Pain on flexion of right carpus. No swelling. Mild lameness at walk.",
  diagnosis: "Soft tissue strain, right carpus.",
  plan: "Carprofen 50 mg q12h × 5 days. Rest 7 days. Recheck if lameness persists after Sep 19.",
  internalNotes: "Owner mentions she jumps off the sofa often. Consider X-ray if no improvement.",
  sharedSummary: "Mild strain in the right front leg. Rest for a week and anti-inflammatory tablets for 5 days.",
};

export const STAFF_TIMELINE: StaffTimelineEntry[] = [
  { id: "carprofen", type: "treatment", title: "Carprofen 50 mg · 5 days", meta: "Sep 11, 2026 · Dr. Shirley", summary: "Every 12 hours with food." },
  { id: "dhpp", type: "vaccine", title: "DHPP vaccine · lot DH-11820", meta: "Mar 3, 2026 · Dr. Larry", summary: "Next dose Mar 3, 2027." },
  { id: "paper", type: "document", title: "Paper record 2023–2025 (PDF, 12 pages)", meta: "Scanned Sep 11, 2026 by Dr. Ricardo", summary: "Imported from paper files." },
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
    { id: "client-luna-today", status: "today", month: "Oct", day: "09", weekday: "Fri", service: "Vaccination · Rabies booster", time: "9:30 AM · 20 min", pet: "Luna", vet: "Dr. Shirley" },
    { id: "client-luna-sep", status: "completed", month: "Sep", day: "11", weekday: "Fri", service: "Consultation · Luna", time: "10:30 AM · 30 min", pet: "Luna", vet: "Dr. Shirley" },
  ],
};

export const STAFF_VISIT: StaffVisitForm = {
  id: "luna-today",
  patientId: "luna",
  headline: "Rabies booster & recheck · 9:30 AM · Dr. Shirley",
  reason: "Limping has not improved after a week of rest",
  weight: "18.2",
  temperature: "38.6",
  heartRate: "",
  findings: "Pain on flexion of right carpus. No swelling. Walks with mild lameness.",
  diagnosis: "Persistent soft tissue strain, right carpus.",
  plan: "X-ray today. Continue rest. Recheck in 10 days.",
  vaccine: "rabies",
  nextDose: "10 / 09 / 2027",
  lot: { code: "RB-25190", expires: "Jun 30, 2027", dosesLeft: 30 },
  internalNotes: "",
  ownerSummary: "Luna's wrist is still sore. We took an X-ray and gave her the overdue leptospirosis vaccine. Keep resting her; we'll call you with results.",
  lastWeight: "Last: 18.4 kg · Sep 11",
  lastVisit: { title: "Last visit · Sep 11", text: "Right carpus strain. Carprofen 5 days.", document: "Paper record 2023–25" },
  draftSaved: "Draft saved 10:52",
};

export const MINUTES_PER_HOUR = 60;
