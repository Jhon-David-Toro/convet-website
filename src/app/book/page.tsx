import type { Metadata } from "next";

import { BookingFlow } from "@/components/sections/BookingFlow";
import { loadData } from "@/lib/api/api.guard";
import { getMyPets } from "@/lib/api/pets.api";
import { findBookingService } from "@/lib/booking/booking.utils";
import { NO_INDEX } from "@/lib/site/seo.constants";
import { addPetAction } from "@/app/app/(portal)/pets/actions";
import type { BookPageProps } from "./page.types";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Book a visit · CONVET",
  description:
    "Choose your pet, the service, the vet and a day and time. No payment is needed.",
};

/**
 * Booking page: ?service= starts the booking with that service already chosen.
 */
export default async function BookPage({ searchParams }: BookPageProps) {
  const [{ service }, petsResult] = await Promise.all([
    searchParams,
    loadData(getMyPets),
  ]);

  // Do not render a booking with fake or incomplete pet data.
  if ("error" in petsResult) {
    throw petsResult.error;
  }

  return (
    <BookingFlow
      pets={petsResult.data}
      onAddPet={addPetAction}
      initialServiceId={
        service && findBookingService(service) ? service : undefined
      }
    />
  );
}