import type { Metadata } from "next";

import { HealthRecords } from "@/components/sections/HealthRecords";
import { loadData } from "@/lib/api/api.guard";
import { getCustomerHealthRecords } from "@/lib/api/medical-records.api";

export const metadata: Metadata = {
  title: "Health records · CONVET",
};

/**
 * Health records page of the customer area. The pets and their medical records come from the backend.
 *
 * @returns The rendered element.
 */
export default async function HealthRecordsPage() {
  const { data, error } = await loadData(getCustomerHealthRecords);

  return <HealthRecords pets={data?.pets ?? []} records={data?.records ?? []} loadError={error?.message} />;
}
