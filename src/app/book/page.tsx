import type { Metadata } from "next";

import { BookingFlow } from "@/components/sections/BookingFlow";
import { findBookingService } from "@/lib/booking/booking.utils";
import { NO_INDEX } from "@/lib/site/seo.constants";

import type { BookPageProps } from "./page.types";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Book a visit · CONVET",
  description: "Choose your pet, the service, the vet and a day and time. No payment is needed.",
};

/**
 * Booking page: `?service=` starts the booking with that service already chosen.
 *
 * @param props Props of the page, see {@link BookPageProps}.
 * @param props.searchParams Query string.
 * @returns The rendered element.
 */
export default async function BookPage({ searchParams }: BookPageProps) {
  const { service } = await searchParams;

  return <BookingFlow initialServiceId={service && findBookingService(service) ? service : undefined} />;
}
