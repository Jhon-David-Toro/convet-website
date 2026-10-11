import { Pill, Plus, Stethoscope, Syringe } from "@/components/ui/Icon";

import type { BookingService, BookingVet } from "./booking.types";

export const BOOKING_TODAY = "2026-10-08";

export const BOOKING_MONTH = "2026-10";

export const SLOT_MINUTES = 10;

export const SLOT_CAPACITY = 5;

export const SLOT_LEFT_PATTERN = [0, 1, 3, 2, 0, 4, 5, 2, 0, 5, 5, 3, 1, 5, 4, -1, 5, 5];

export const FULL_DAYS = ["2026-10-13"];

export const FEW_LEFT_DAYS = ["2026-10-13", "2026-10-20", "2026-10-24"];

export const ANY_VET_ID = "any";

export const BOOKING_LOCATION = { title: "CONVET Aruba", detail: "Plans change? Reschedule from your account or WhatsApp" };

export const BOOKING_SERVICES: BookingService[] = [
  { id: "consultations", title: "Consultation", description: "Check-up, new symptoms or second opinion", duration: 30, icon: Stethoscope },
  { id: "vaccinations", title: "Vaccination", description: "Core and lifestyle vaccines", duration: 20, icon: Syringe },
  { id: "treatments", title: "Treatment follow-up", description: "Booked by our team after a consultation", duration: 20, icon: Pill, unavailable: true },
];

export const BOOKING_VETS: BookingVet[] = [
  { id: ANY_VET_ID, name: "Any available vet", role: "Veterinarian", license: "", weekdays: [1, 2, 4, 5], startMinutes: 540, endMinutes: 720, schedule: "Earliest across the team: Fri, Oct 9 · 9:00 AM", nextLabel: "Fastest" },
  { id: "shirley", name: "Dr. Shirley", role: "Veterinarian", license: "VET-002", weekdays: [1, 2, 4, 5], startMinutes: 540, endMinutes: 720, schedule: "Mon, Tue, Thu, Fri · 9:00 AM – 12:00 PM · Off Wednesdays", nextLabel: "Next: Fri 9:10 AM" },
  { id: "larry", name: "Dr. Larry", role: "Veterinarian", license: "VET-003", weekdays: [1, 2, 3, 4, 5, 6], startMinutes: 600, endMinutes: 900, schedule: "Mon – Sat · 10:00 AM – 3:00 PM", nextLabel: "Next: Fri 10:00 AM" },
  { id: "ricardo", name: "Dr. Ricardo", role: "Veterinarian", license: "VET-004", weekdays: [1, 2, 3, 4, 5], startMinutes: 840, endMinutes: 1080, schedule: "Mon – Fri · 2:00 PM – 6:00 PM · Large animals", nextLabel: "Next: Fri 2:10 PM" },
  { id: "susana", name: "Dr. Susana", role: "Veterinarian", license: "VET-005", weekdays: [2, 3, 4, 5, 6], startMinutes: 480, endMinutes: 780, schedule: "Tue – Sat · 8:00 AM – 1:00 PM", nextLabel: "Next: Sat 8:00 AM" },
  { id: "andreina", name: "Dr. Andreina", role: "Veterinarian", license: "VET-006", weekdays: [], startMinutes: 540, endMinutes: 720, schedule: "Not available Oct 5 – 18 · back Oct 19", nextLabel: "Unavailable", unavailable: true },
];

export const BOOKING_PET_LINES: Record<string, string> = {
  luna: "Dog · 4 yrs 3 mos · Rabies due Oct 20",
  milo: "Cat · 7 yrs 2 mos · Vaccines up to date",
};

export const NEW_PET_OPTION = { title: "Add a new pet", subtitle: "Name and species are enough", icon: Plus };

export const BOOKING_NOTES_MAX = 500;


export const DAY_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

export const SHORT_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });

export const FULL_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const MINUTES_PER_HOUR = 60;

export const NOON = 12;

export const DAYS_IN_MONTH = 31;
