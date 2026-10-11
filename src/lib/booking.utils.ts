import type { MonthDayState } from "@/components/patterns/MonthCalendar";

import {
  ANY_VET_ID,
  BOOKING_MONTH,
  BOOKING_SERVICES,
  BOOKING_TODAY,
  BOOKING_VETS,
  DAY_FORMAT,
  DAYS_IN_MONTH,
  FEW_LEFT_DAYS,
  FULL_DAYS,
  FULL_FORMAT,
  MINUTES_PER_HOUR,
  NOON,
  SHORT_FORMAT,
  SLOT_CAPACITY,
  SLOT_LEFT_PATTERN,
  SLOT_MINUTES,
} from "./booking.constants";
import type { BookingService, BookingSlot, BookingVet, DayAvailability, NextAvailable, SlotState } from "./booking.types";

/**
 * Finds a vet by id.
 *
 * @param id Id of the vet.
 * @returns The vet, or the "any available vet" option when the id is unknown.
 */
export function findVet(id: string): BookingVet {
  return BOOKING_VETS.find((vet) => vet.id === id) ?? BOOKING_VETS[0];
}

/**
 * Finds a bookable service by id.
 *
 * @param id Id of the service.
 * @returns The service, or `undefined` when there is none.
 */
export function findBookingService(id: string): BookingService | undefined {
  return BOOKING_SERVICES.find((service) => service.id === id);
}

/**
 * Formats minutes since midnight as a clock time, e.g. 570 → "9:30 AM".
 *
 * @param minutes Minutes since midnight.
 * @returns The time with AM or PM.
 */
export function minutesToLabel(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const hour12 = hours % NOON === 0 ? NOON : hours % NOON;
  return `${hour12}:${String(minutes % MINUTES_PER_HOUR).padStart(2, "0")} ${hours >= NOON ? "PM" : "AM"}`;
}

/**
 * Turns a clock time such as "9:30 AM" into minutes since midnight.
 *
 * @param label Time with AM or PM.
 * @returns Minutes since midnight.
 */
export function labelToMinutes(label: string): number {
  const [clock, meridiem] = label.split(" ");
  const [hour, minute] = clock.split(":").map(Number);
  return ((hour % NOON) + (meridiem === "PM" ? NOON : 0)) * MINUTES_PER_HOUR + minute;
}

/**
 * Time range of a visit, e.g. "9:30 – 9:50 AM" (both meridiems are written when they differ).
 *
 * @param time Start time, e.g. "9:30 AM".
 * @param duration Length of the visit in minutes.
 * @returns The range of the visit.
 */
export function timeRange(time: string, duration: number): string {
  const end = minutesToLabel(labelToMinutes(time) + duration);
  const sameMeridiem = time.slice(-2) === end.slice(-2);
  return sameMeridiem ? `${time.slice(0, -3)} – ${end}` : `${time} – ${end}`;
}

/**
 * Day of an ISO date written out, e.g. "Friday, October 9".
 *
 * @param iso Date as `YYYY-MM-DD`.
 * @returns The long day.
 */
export function longDay(iso: string): string {
  return DAY_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Day of an ISO date in short form, e.g. "Fri, Oct 9".
 *
 * @param iso Date as `YYYY-MM-DD`.
 * @returns The short day.
 */
export function shortDay(iso: string): string {
  return SHORT_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Day of an ISO date with its year, e.g. "Fri, Oct 9, 2026".
 *
 * @param iso Date as `YYYY-MM-DD`.
 * @returns The day with its year.
 */
export function fullDay(iso: string): string {
  return FULL_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * Whether a vet can be booked on a day.
 *
 * @param vet Vet to check.
 * @param iso Date as `YYYY-MM-DD`.
 * @returns `off` for days the vet does not work (or that already passed; bookings start the next day), `full` when every time is taken, `open` otherwise.
 */
export function dayAvailability(vet: BookingVet, iso: string): DayAvailability {
  const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();
  if (vet.unavailable || iso <= BOOKING_TODAY || !vet.weekdays.includes(weekday)) return "off";
  return FULL_DAYS.includes(iso) ? "full" : "open";
}

/**
 * State of a slot from the number of places left: 0 is full and a negative number is blocked by the clinic.
 *
 * @param left Places left, or a negative number for a blocked time.
 * @returns The state of the slot.
 */
function slotState(left: number): SlotState {
  if (left < 0) return "blocked";
  return left === 0 ? "full" : "open";
}

/**
 * ISO date of a day of the booking month.
 *
 * @param day Day of the month, from 1.
 * @returns The date as `YYYY-MM-DD`.
 */
function monthDay(day: number): string {
  return `${BOOKING_MONTH}-${String(day).padStart(2, "0")}`;
}

/**
 * Times of a vet on a day, every ten minutes, each with how many places are left.
 *
 * @param vet Vet whose agenda is shown.
 * @param iso Date as `YYYY-MM-DD`.
 * @returns The slots; empty when the vet does not work that day or the day is full.
 */
export function slotsFor(vet: BookingVet, iso: string): BookingSlot[] {
  if (dayAvailability(vet, iso) !== "open") return [];
  const count = (vet.endMinutes - vet.startMinutes) / SLOT_MINUTES;

  return Array.from({ length: count }, (_, index) => {
    const left = SLOT_LEFT_PATTERN[index % SLOT_LEFT_PATTERN.length];
    return { time: minutesToLabel(vet.startMinutes + index * SLOT_MINUTES), left: Math.max(left, 0), state: slotState(left) };
  });
}

/**
 * Label under a time: places left, "FULL · 5/5" or "Blocked".
 *
 * @param slot Slot to describe.
 * @returns The capacity label.
 */
export function capacityLabel(slot: BookingSlot): string {
  if (slot.state === "blocked") return "Blocked";
  return slot.state === "full" ? `FULL · ${SLOT_CAPACITY}/${SLOT_CAPACITY}` : `${slot.left} of ${SLOT_CAPACITY} left`;
}

/**
 * States of the calendar days of the booking month: days the vet does not work are dashed, days with few places left have a dot.
 *
 * @param vet Vet whose agenda is shown.
 * @returns The state of every day that is not plainly available.
 */
export function calendarStates(vet: BookingVet): Record<string, MonthDayState> {
  const states: Record<string, MonthDayState> = {};
  for (let day = 1; day <= DAYS_IN_MONTH; day += 1) {
    const iso = monthDay(day);
    if (iso !== BOOKING_TODAY && dayAvailability(vet, iso) === "off") states[iso] = "unavailable";
    else if (FEW_LEFT_DAYS.includes(iso)) states[iso] = "few-left";
  }
  return states;
}

/**
 * First day and time with a free place for a vet.
 *
 * @param vet Vet to look for.
 * @returns The day and time, or `undefined` when there is none this month.
 */
export function nextAvailable(vet: BookingVet): NextAvailable | undefined {
  for (let day = 1; day <= DAYS_IN_MONTH; day += 1) {
    const iso = monthDay(day);
    const slot = slotsFor(vet, iso).find((candidate) => candidate.state === "open");
    if (slot) return { iso, time: slot.time };
  }
  return undefined;
}

/**
 * First day after another one on which a vet has free places.
 *
 * @param vet Vet to look for.
 * @param iso Day to start after.
 * @returns The next open day, or `undefined` when there is none this month.
 */
export function nextOpenDay(vet: BookingVet, iso: string): string | undefined {
  for (let day = Number(iso.slice(-2)) + 1; day <= DAYS_IN_MONTH; day += 1) {
    const candidate = monthDay(day);
    if (dayAvailability(vet, candidate) === "open") return candidate;
  }
  return undefined;
}

/**
 * Vet shown for a booking: the chosen one, or the first one that works when "any available vet" was chosen.
 *
 * @param vetId Id of the chosen vet.
 * @returns The vet that agenda and slots are taken from.
 */
export function agendaVet(vetId: string): BookingVet {
  return vetId === ANY_VET_ID ? findVet("shirley") : findVet(vetId);
}

/**
 * Working hours of a vet as text, e.g. "9:00 AM – 12:00 PM".
 *
 * @param vet Vet to describe.
 * @returns The first and last time of their agenda.
 */
export function hoursLabel(vet: BookingVet): string {
  return `${minutesToLabel(vet.startMinutes)} – ${minutesToLabel(vet.endMinutes)}`;
}

/**
 * Explanation shown when a day is full for a vet.
 *
 * @param vet Vet whose day is full.
 * @param next Next day with free places, when there is one.
 * @returns The explanation, mentioning the next open day when there is one.
 */
export function fullDayMessage(vet: BookingVet, next?: string): string {
  const base = `Every ${SLOT_MINUTES}-min time from ${hoursLabel(vet)} already has ${SLOT_CAPACITY} requests.`;
  return next ? `${base} Their next free day is ${shortDay(next)} — or book any available vet.` : base;
}
