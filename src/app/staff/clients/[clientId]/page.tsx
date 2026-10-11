import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClientDetail } from "@/components/sections/ClientDetail";
import { STAFF_CLIENT } from "@/lib/staff.constants";

import type { ClientPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Client · CONVET staff",
};

/**
 * Client page of the staff area.
 *
 * @param props Props of the page, see {@link ClientPageProps}.
 * @param props.params Route parameters.
 * @returns The rendered element.
 */
export default async function ClientPage({ params }: ClientPageProps) {
  const { clientId } = await params;
  if (clientId !== STAFF_CLIENT.id) notFound();

  return <ClientDetail client={STAFF_CLIENT} />;
}
