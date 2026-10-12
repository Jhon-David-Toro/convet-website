import type { Metadata } from "next";

import { HealthRecords } from "@/components/sections/HealthRecords";

export const metadata: Metadata = {
  title: "Health records · CONVET",
};

/**
 * Health records page of the customer area: visits, vaccines, treatments and vet notes of each pet.
 *
 * @returns The rendered element.
 */
export default function HealthRecordsPage() {
  return <HealthRecords />;
}
