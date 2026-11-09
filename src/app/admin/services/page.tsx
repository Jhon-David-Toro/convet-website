import type { Metadata } from "next";

import { AdminServices } from "@/components/sections/AdminServices";
import { getAdminServicesData } from "@/lib/api/admin-services.api";
import { loadData } from "@/lib/api/api.guard";

import { createServiceAction, saveServiceRulesAction } from "./actions";

export const metadata: Metadata = {
  title: "Services · CONVET admin",
};

/**
 * Services page of the admin area. The services of the main branch, their price and the vets come from the backend.
 *
 * @returns The rendered element.
 */
export default async function AdminServicesPage() {
  const { data, error } = await loadData(getAdminServicesData);

  return (
    <AdminServices
      rows={data?.rows ?? []}
      loadError={error?.message}
      categories={data?.categories}
      vetNames={data?.vetNames}
      actions={{ saveRules: saveServiceRulesAction, createService: createServiceAction }}
    />
  );
}
