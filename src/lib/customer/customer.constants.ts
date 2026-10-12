import { AlertTriangle, Check, Clock } from "@/components/ui/Icon";

import type {
  CustomerAppointment,
  CustomerProfile,
  CustomerReminder,
  NotificationSetting,
  PetEvent,
  PetItem,
  PetVaccine,
  WeightPoint,
} from "./customer.types";

export const PET_STATUS_BADGES = {
  "up-to-date": { tone: "success", icon: Check },
  "due-soon": { tone: "warning", icon: Clock },
  overdue: { tone: "error", icon: AlertTriangle },
} as const;

export const CUSTOMER_FIRST_NAME = "Anna";

export const CUSTOMER_NAME = "Anna Lee";

export const CUSTOMER_ROLE = "Client";

export const CUSTOMER_PETS: PetItem[] = [
  {
    id: "luna",
    name: "Luna",
    subject: "dog",
    summary: "Dog · Mixed breed · Black & tan · 4 yrs 3 mos",
    profileLine: "Dog · Mixed breed · Black & tan · Female, spayed · Born 15 Jun 2022 · 4 yrs 3 mos",
    allergy: "Allergic to penicillin",
    microchip: "900164001234567",
    weight: "18.4 kg",
    weightDate: "Sep 12",
    vet: "Dr. Shirley",
    nextVisit: "Oct 9",
    vaccineStatus: "due-soon",
    vaccineBadge: "Rabies due in 20 days",
  },
  {
    id: "milo",
    name: "Milo",
    subject: "cat",
    summary: "Cat · Domestic shorthair · Orange tabby · 7 yrs 2 mos",
    profileLine: "Cat · Domestic shorthair · Orange tabby · Male, neutered · Born Jul 2019 · 7 yrs 2 mos",
    microchip: "900164001234568",
    weight: "4.6 kg",
    weightDate: "Sep 12",
    vet: "Dr. Larry",
    nextVisit: "Oct 9",
    vaccineStatus: "up-to-date",
    vaccineBadge: "Vaccines up to date",
  },
];

export const CUSTOMER_VACCINES: PetVaccine[] = [
  { petId: "luna", name: "DHPP", stamp: "DHPP", status: "up-to-date", dates: "Given Mar 3, 2026 · Next Mar 3, 2027", stampDate: "Mar 3 ’26" },
  { petId: "luna", name: "Rabies", stamp: "RABIES", status: "due-soon", dates: "Given Oct 20, 2025 · Next Oct 20, 2026", stampDate: "Oct 20 ’25" },
  { petId: "luna", name: "Leptospirosis", stamp: "LEPTO", status: "overdue", dates: "Given Aug 2, 2025 · Was due Aug 2, 2026", stampDate: "Aug 2 ’25" },
  { petId: "milo", name: "FVRCP", stamp: "FVRCP", status: "up-to-date", dates: "Given Jun 4, 2026 · Next Jun 4, 2027", stampDate: "Jun 4 ’26" },
];

export const CUSTOMER_EVENTS: PetEvent[] = [
  {
    id: "luna-consultation",
    petId: "luna",
    type: "visit",
    title: "Consultation · limping",
    meta: "Sep 12, 2026 · Dr. Shirley",
    summary: "Mild strain in the right front leg. Rest for a week and anti-inflammatory tablets for 5 days. Come back if she still limps after Sep 19.",
    year: "2026",
  },
  {
    id: "luna-carprofen",
    petId: "luna",
    type: "treatment",
    title: "Carprofen 50 mg",
    meta: "Sep 12 – Sep 17, 2026 · Completed",
    summary: "1 tablet every 12 hours with food.",
    year: "2026",
  },
  {
    id: "luna-dhpp",
    petId: "luna",
    type: "vaccine",
    title: "DHPP vaccine",
    meta: "Mar 3, 2026 · Dr. Larry",
    summary: "Next dose Mar 3, 2027.",
    year: "2026",
  },
  {
    id: "luna-checkup",
    petId: "luna",
    type: "visit",
    title: "Annual check-up",
    meta: "Mar 3, 2026 · Dr. Larry",
    summary: "Healthy. Weight 18.1 kg. Teeth cleaning recommended within the year.",
    year: "2026",
  },
  {
    id: "luna-rabies",
    petId: "luna",
    type: "vaccine",
    title: "Rabies vaccine",
    meta: "Oct 20, 2025 · Dr. Shirley",
    summary: "Next dose Oct 20, 2026.",
    year: "2025",
  },
  {
    id: "luna-paper",
    petId: "luna",
    type: "document",
    title: "Earlier records (paper)",
    meta: "2023 – 2025 · scanned",
    summary: "Available at the clinic. Ask us if you need a copy.",
    year: "2025",
  },
  {
    id: "milo-fvrcp",
    petId: "milo",
    type: "vaccine",
    title: "FVRCP vaccine",
    meta: "Jun 4, 2026 · Dr. Larry",
    summary: "Next dose Jun 4, 2027.",
    year: "2026",
  },
];

export const RECENT_ACTIVITY_IDS = ["luna-consultation", "luna-carprofen", "milo-fvrcp"];

export const WEIGHT_HISTORY: Record<string, WeightPoint[]> = {
  luna: [
    { label: "Mar 25", value: 17.4 },
    { label: "Oct 25", value: 17.8 },
    { label: "Mar 26", value: 18.1 },
    { label: "Sep 26", value: 18.4 },
  ],
  milo: [
    { label: "Mar 25", value: 17.1 },
    { label: "Oct 25", value: 17.6 },
    { label: "Mar 26", value: 18.0 },
    { label: "Sep 26", value: 18.4 },
  ],
};

export const CUSTOMER_APPOINTMENTS: CustomerAppointment[] = [
  { id: "rabies-booster", iso: "2026-10-09", startTime: "9:30 AM", vetId: "shirley", serviceId: "vaccinations", status: "upcoming", month: "Oct", day: "09", weekday: "Fri", service: "Rabies booster", time: "9:30 AM · 20 min", pet: "Luna", vet: "Dr. Shirley", location: "CONVET · Aruba" },
  { id: "annual-checkup", iso: "2026-11-12", startTime: "10:30 AM", vetId: "larry", serviceId: "consultations", status: "upcoming", month: "Nov", day: "12", weekday: "Thu", service: "Annual check-up", time: "10:30 AM · 30 min", pet: "Milo", vet: "Dr. Larry", location: "CONVET · Aruba" },
];

export const CUSTOMER_REMINDERS: CustomerReminder[] = [
  {
    id: "rabies-due",
    tone: "warning",
    title: "Luna's rabies booster is due Oct 20",
    text: "Book now and we'll pick the first time that works for you.",
    actionLabel: "Book booster",
  },
  {
    id: "lepto-overdue",
    tone: "error",
    title: "Luna's leptospirosis vaccine is overdue",
    text: "It was due Aug 2. We can give it at the same visit.",
    actionLabel: "Add to Oct 9 visit",
  },
];

export const CUSTOMER_PROFILE: CustomerProfile = {
  firstName: "Anna",
  lastName: "Lee",
  email: "anna@example.com",
  phone: "+297 560 1234",
  address: "",
};

export const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  { id: "confirmations", label: "Appointment confirmations", description: "Email · always on", enabled: true },
  { id: "day-before", label: "Reminder 24 hours before", description: "Email", enabled: true },
  { id: "vaccines", label: "Vaccine due reminders", description: "14 days before", enabled: true },
  { id: "whatsapp", label: "WhatsApp messages", description: "Coming soon", enabled: false, disabled: true },
];
