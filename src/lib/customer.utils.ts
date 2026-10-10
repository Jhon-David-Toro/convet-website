import type { PetCardProps } from "@/components/patterns/PetCard";

import { CUSTOMER_APPOINTMENTS, CUSTOMER_EVENTS, CUSTOMER_PETS, CUSTOMER_VACCINES, PET_STATUS_BADGES, RECENT_ACTIVITY_IDS, WEIGHT_HISTORY } from "./customer.constants";
import { CUSTOMER_PETS_HREF } from "./customer.paths.constants";
import type { CustomerAppointment, PetEvent, PetItem, PetVaccine, WeightPoint } from "./customer.types";

/**
 * Finds a pet by its URL segment.
 *
 * @param id URL segment of the pet.
 * @returns The pet, or `undefined` when there is none.
 */
export function findPet(id: string): PetItem | undefined {
  return CUSTOMER_PETS.find((pet) => pet.id === id);
}

/**
 * Link of the profile of a pet, optionally on one of its tabs.
 *
 * @param pet Pet to open.
 * @param tab Tab of the profile; the first tab when omitted.
 * @returns The profile link.
 */
export function petHref(pet: PetItem, tab?: string): string {
  return tab ? `${CUSTOMER_PETS_HREF}/${pet.id}/${tab}` : `${CUSTOMER_PETS_HREF}/${pet.id}`;
}

/**
 * Vaccines of a pet, in the order of its vaccination card.
 *
 * @param petId Pet the vaccines belong to.
 * @returns The vaccines of that pet.
 */
export function vaccinesOf(petId: string): PetVaccine[] {
  return CUSTOMER_VACCINES.filter((vaccine) => vaccine.petId === petId);
}

/**
 * Timeline events of a pet, newest first.
 *
 * @param petId Pet the events belong to.
 * @returns The events of that pet.
 */
export function eventsOf(petId: string): PetEvent[] {
  return CUSTOMER_EVENTS.filter((event) => event.petId === petId);
}

/**
 * Events shown in the recent activity of the overview.
 *
 * @returns The recent events, newest first.
 */
export function recentEvents(): PetEvent[] {
  return RECENT_ACTIVITY_IDS.map((id) => CUSTOMER_EVENTS.find((event) => event.id === id)).filter((event) => event !== undefined);
}

/**
 * Props of the pet card of a pet: identity, allergy, facts and vaccine status.
 *
 * @param pet Pet to show.
 * @returns The props of the card, without its layout.
 */
export function petCardProps(pet: PetItem): Omit<PetCardProps, "layout"> {
  const facts = [
    { label: "Microchip", value: pet.microchip, mono: true },
    { label: "Weight", value: pet.weight },
    ...(pet.nextVisit ? [{ label: "Next visit", value: pet.nextVisit }] : []),
  ];

  return {
    subject: pet.subject,
    name: pet.name,
    description: pet.summary,
    alert: pet.allergy,
    facts,
    vaccineStatus: { ...PET_STATUS_BADGES[pet.vaccineStatus], label: pet.vaccineBadge },
    href: petHref(pet),
  };
}

/**
 * Title of an event with the name of its pet, e.g. "Luna · Carprofen 50 mg".
 *
 * @param event Event to title.
 * @returns The title with the pet name in front.
 */
export function eventTitle(event: PetEvent): string {
  return `${findPet(event.petId)?.name} · ${event.title}`;
}

/**
 * Weights recorded for a pet, oldest first.
 *
 * @param petId Pet the weights belong to.
 * @returns The weight points, or an empty list when none were recorded.
 */
export function weightsOf(petId: string): WeightPoint[] {
  return WEIGHT_HISTORY[petId] ?? [];
}

/**
 * Next appointment of a pet.
 *
 * @param pet Pet the appointment is for.
 * @returns The appointment, or `undefined` when the pet has none.
 */
export function nextAppointmentOf(pet: PetItem): CustomerAppointment | undefined {
  return CUSTOMER_APPOINTMENTS.find((appointment) => appointment.pet === pet.name);
}

/**
 * Props of the appointment card that come from the appointment.
 *
 * @param appointment Appointment to show.
 * @returns The status, the date, the service, the time, the pet, the vet and the place.
 */
export function cardProps({ status, month, day, weekday, service, time, pet, vet, location }: CustomerAppointment) {
  return { status, month, day, weekday, service, time, pet, vet, location };
}
