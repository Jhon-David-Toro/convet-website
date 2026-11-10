import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClientDetail } from "@/components/sections/ClientDetail";
import { Alert } from "@/components/ui/Alert";
import { isUuid } from "@/lib/api/api.contract";
import { loadData } from "@/lib/api/api.guard";
import { getStaffClientRecord } from "@/lib/api/users.api";
import { STAFF_CLIENT } from "@/lib/staff/staff.constants";

import { LOAD_ERROR_TITLE } from "./page.constants";
import type { ClientPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Client · CONVET staff",
};

/**
 * Client page of the staff area. The client and their pets come from the backend; the sample client keeps its demo record
 * (the backend has no endpoint yet to list or search clients, so there is no page that could link to a real one).
 *
 * @param props Props of the page, see {@link ClientPageProps}.
 * @param props.params Route parameters with the client (user) id.
 * @returns The rendered element.
 */
export default async function ClientPage({ params }: ClientPageProps) {
  const { clientId } = await params;
  if (clientId === STAFF_CLIENT.id) return <ClientDetail client={STAFF_CLIENT} />;
  if (!isUuid(clientId)) notFound();

  const { data, error } = await loadData(() => getStaffClientRecord(clientId));
  if (error) {
    return (
      <Alert tone="error" title={LOAD_ERROR_TITLE}>
        {error.message}
      </Alert>
    );
  }
  if (!data) notFound();

  return <ClientDetail client={data.client} />;
}
