import type { BookingSummaryProps } from "@/components/patterns/BookingSummary";
import { Cat, Dog, User, Users } from "@/components/ui/Icon";
import {
  BOOKING_LOCATION,
  BOOKING_PET_LINES,
  BOOKING_SERVICES,
  BOOKING_VETS,
  NEW_PET_OPTION,
  SLOT_MINUTES,
} from "@/lib/booking/booking.constants";
import {
  agendaVet,
  findBookingService,
  fullDay,
  labelToMinutes,
  longDay,
  minutesToLabel,
  shortDay,
  timeRange,
} from "@/lib/booking/booking.utils";
import type { PetItem } from "@/lib/customer/customer.types";
import { whatsappLink } from "@/lib/site/whatsapp";

import {
  MINUTES_PER_HOUR,
  MOBILE_TITLES,
  MS_PER_DAY,
  MS_PER_MINUTE,
  NEW_PET_ID,
  SIDE_STEPS,
  STEP_COPY,
  STEP_ORDER,
} from "./BookingFlow.constants";
import type {
  BookingSelection,
  BookingStepId,
  OptionItem,
} from "./BookingFlow.types";

/**
 * Whether the customer can move on from a step with what is selected so far.
 *
 * @param step Step the customer is on.
 * @param selection What is selected so far.
 * @returns `true` when the step has what it needs.
 */
export function canContinueFrom(
  step: BookingStepId,
  selection: BookingSelection,
): boolean {
  const needs: Record<BookingStepId, boolean> = {
    pet: Boolean(selection.petId),
    service: Boolean(selection.serviceId),
    vet: Boolean(selection.vetId),
    datetime: Boolean(selection.date && selection.time),
    review: Boolean(selection.time),
    confirmed: false,
  };

  return needs[step];
}

/**
 * Step that comes after another one.
 *
 * @param step Current step.
 * @param offset 1 for the next step, -1 for the previous one.
 * @returns The step, kept inside the list of steps.
 */
export function stepAt(
  step: BookingStepId,
  offset: number,
): BookingStepId {
  const index = STEP_ORDER.indexOf(step) + offset;

  return STEP_ORDER[
    Math.min(Math.max(index, 0), STEP_ORDER.length - 1)
  ];
}

/**
 * Title and sentence of a step; the service step names the pet.
 *
 * @param step Step to describe.
 * @param petName Name of the chosen pet.
 * @returns The title and, when it has one, the sentence under it.
 */
export function stepCopy(
  step: BookingStepId,
  petName: string,
): { title: string; subtitle?: string } {
  const copy = STEP_COPY[step];

  return {
    ...copy,
    title: copy.title.replace("{pet}", petName),
  };
}

/**
 * Position of a step in the stepper above the page.
 *
 * @param step Step the customer is on.
 * @returns The index, from 0.
 */
export function stepperIndex(step: BookingStepId): number {
  return STEP_ORDER.indexOf(step);
}

/**
 * Name of the chosen pet.
 *
 * @param petId Id of the chosen pet.
 * @param pets Customer's registered pets.
 * @returns The pet name.
 */
export function petName(
  petId: string,
  pets: PetItem[],
): string {
  return (
    pets.find((pet) => pet.id === petId)?.name ??
    (petId === NEW_PET_ID ? "your pet" : "Pet")
  );
}

/**
 * Card shown next to the booking: what is chosen so far.
 *
 * @param selection What is selected so far.
 * @param pets Customer's registered pets.
 * @returns The props of the booking summary.
 */
export function bookingSummary(
  selection: BookingSelection,
  pets: PetItem[],
): Pick<
  BookingSummaryProps,
  "eyebrow" | "date" | "time" | "service" | "pet" | "vet" | "location"
> {
  const service = findBookingService(selection.serviceId);
  const pet = pets.find((item) => item.id === selection.petId);
  const vet = selection.vetId
    ? agendaVet(selection.vetId)
    : undefined;

  return {
    eyebrow: "Your visit",
    date: selection.date ? fullDay(selection.date) : "Pick a date",
    time:
      selection.time && service
        ? timeRange(selection.time, service.duration)
        : "",
    service: service
      ? {
          title: service.title,
          detail: `${service.duration} min · ${service.duration / SLOT_MINUTES} slots of ${SLOT_MINUTES} min`,
        }
      : {
          title: "Service",
          detail: "Not selected yet",
        },
    pet: pet
      ? {
          title: pet.name,
          detail: pet.summary,
        }
      : {
          title: "Pet",
          detail: selection.petId === NEW_PET_ID
            ? "New pet"
            : "Not selected yet",
        },
    vet: vet
      ? {
          title: vet.name,
          detail: `${vet.role}${vet.license ? ` · ${vet.license}` : ""}`,
        }
      : {
          title: "Vet",
          detail: "Not selected yet",
        },
    location: BOOKING_LOCATION,
  };
}

/**
 * Line of the bar fixed to the bottom on small screens.
 *
 * @param selection What is selected so far.
 * @param pets Customer's registered pets.
 * @returns The service, the pet and the vet joined with dots.
 */
export function barSummaryLine(
  selection: BookingSelection,
  pets: PetItem[],
): string {
  const service = findBookingService(selection.serviceId);
  const vet = selection.vetId
    ? agendaVet(selection.vetId)
    : undefined;

  return [
    service?.title,
    petName(selection.petId, pets),
    vet?.name,
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * Day and time of the visit in one line.
 *
 * @param selection What is selected so far.
 * @returns The day and time, or an empty string while one is missing.
 */
export function whenLine(selection: BookingSelection): string {
  return selection.date && selection.time
    ? `${shortDay(selection.date)} · ${selection.time}`
    : "";
}

/**
 * Day and time until which the visit can be moved for free.
 *
 * @param date Day of the visit as YYYY-MM-DD.
 * @param time Start time, e.g. 9:30 AM.
 * @returns The deadline.
 */
export function freeChangeDeadline(
  date: string,
  time: string,
): string {
  const start =
    Date.parse(`${date}T00:00:00Z`) +
    labelToMinutes(time) * MS_PER_MINUTE;

  const deadline = new Date(start - MS_PER_DAY);

  return `${shortDay(deadline.toISOString().slice(0, 10))} at ${minutesToLabel(
    deadline.getUTCHours() * MINUTES_PER_HOUR +
      deadline.getUTCMinutes(),
  )}`;
}

/**
 * Sentence that thanks the customer on the confirmation page.
 *
 * @param date Day of the visit as YYYY-MM-DD.
 * @returns The confirmation title.
 */
export function confirmedTitle(date: string): string {
  return `Request confirmed! See you ${longDay(date).split(",")[0]}.`;
}

/**
 * Options of the pet step: every registered pet and a way to add a new one.
 *
 * @param pets Customer's registered pets.
 * @returns The options, in display order.
 */
export function petOptions(pets: PetItem[]): OptionItem[] {
  const registeredPets = pets.map((pet) => ({
    id: pet.id,
    icon: pet.subject === "dog" ? Dog : Cat,
    title: pet.name,
    subtitle:
      BOOKING_PET_LINES[pet.id] ?? pet.profileLine,
  }));

  return [
    ...registeredPets,
    {
      id: NEW_PET_ID,
      ...NEW_PET_OPTION,
    },
  ];
}

/**
 * Options of the service step; vaccinations mention what the chosen pet needs.
 *
 * @param petId Id of the chosen pet.
 * @param pets Customer's registered pets.
 * @returns The options, in display order.
 */
export function serviceOptions(
  petId: string,
  pets: PetItem[],
): OptionItem[] {
  const pet = pets.find((item) => item.id === petId);

  const needsVaccine =
    pet?.vaccineStatus === "overdue" ||
    pet?.vaccineStatus === "due-soon";

  return BOOKING_SERVICES.map(
    ({ id, title, description, duration, icon, unavailable }) => ({
      id,
      icon,
      title,
      subtitle:
        id === "vaccinations" && needsVaccine
          ? "Rabies booster due Oct 20 · Lepto overdue"
          : description,
      meta: `${duration} min`,
      disabled: unavailable,
    }),
  );
}

/**
 * Options of the vet step.
 *
 * @returns The options, in display order.
 */
export function vetOptions(): OptionItem[] {
  return BOOKING_VETS.map(
    ({ id, name, schedule, nextLabel, unavailable }) => ({
      id,
      icon: id === "any" ? Users : User,
      title: name,
      subtitle: schedule,
      meta: nextLabel,
      disabled: unavailable,
    }),
  );
}

/**
 * Props of the appointment card shown on the confirmation page.
 *
 * @param selection What was booked.
 * @param pets Customer's registered pets.
 * @returns The date block, service, time, pet, vet and location.
 */
export function confirmedAppointment(
  selection: BookingSelection,
  pets: PetItem[],
) {
  const service = findBookingService(selection.serviceId);
  const [weekday, month, day] = shortDay(selection.date)
    .replace(",", "")
    .split(" ");

  return {
    month,
    day: day.padStart(2, "0"),
    weekday,
    service: service?.title ?? "",
    time: `${selection.time} · ${service?.duration} min`,
    pet: petName(selection.petId, pets),
    vet: agendaVet(selection.vetId).name,
    location: "Main clinic",
  };
}

/**
 * Link of a calendar file (.ics) with the visit.
 *
 * @param selection What was booked.
 * @param pets Customer's registered pets.
 * @returns A data link that downloads the calendar file.
 */
export function calendarFileHref(
  selection: BookingSelection,
  pets: PetItem[],
): string {
  const service = findBookingService(selection.serviceId);

  const start =
    selection.date.replaceAll("-", "") +
    "T" +
    minutesToStamp(labelToMinutes(selection.time));

  const end =
    selection.date.replaceAll("-", "") +
    "T" +
    minutesToStamp(
      labelToMinutes(selection.time) + (service?.duration ?? 0),
    );

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${service?.title} · ${petName(selection.petId, pets)} at CONVET`,
    `DTSTART;TZID=America/Aruba:${start}`,
    `DTEND;TZID=America/Aruba:${end}`,
    "LOCATION:CONVET Aruba",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(
    lines.join("\r\n"),
  )}`;
}

/**
 * Minutes since midnight as the time part of a calendar stamp.
 *
 * @param minutes Minutes since midnight.
 * @returns Hours, minutes and seconds with two digits each.
 */
function minutesToStamp(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);

  return `${String(hours).padStart(2, "0")}${String(
    minutes % MINUTES_PER_HOUR,
  ).padStart(2, "0")}00`;
}

/**
 * Link that opens the clinic chat with the booking already written.
 *
 * @param selection What was booked.
 * @param pets Customer's registered pets.
 * @returns The WhatsApp link.
 */
export function confirmationChatHref(
  selection: BookingSelection,
  pets: PetItem[],
): string {
  const service = findBookingService(selection.serviceId);

  return whatsappLink(
    `Hi! I booked ${service?.title} for ${petName(selection.petId, pets)} on ${whenLine(selection)}.`,
  );
}

/**
 * What the booking frame shows for a step.
 *
 * @param step Step the customer is on.
 * @param back Goes back one step.
 * @returns The mobile title, back function and visibility flags.
 */
export function frameChrome(
  step: BookingStepId,
  back: () => void,
) {
  const confirmed = step === "confirmed";

  return {
    mobileTitle: confirmed
      ? MOBILE_TITLES.confirmed
      : MOBILE_TITLES.booking,
    onBack:
      step === "pet" || confirmed
        ? undefined
        : back,
    showSide: SIDE_STEPS.includes(step),
    showActions: !confirmed,
  };
}