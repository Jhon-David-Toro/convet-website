import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VisitRecord } from "@/components/sections/VisitRecord";
import { STAFF_PATIENT, STAFF_VISIT } from "@/lib/staff/staff.constants";

import type { VisitPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Visit record · CONVET staff",
};

/**
 * Visit record page of the staff area.
 *
 * @param props Props of the page, see {@link VisitPageProps}.
 * @param props.params Route parameters.
 * @returns The rendered element.
 */
export default async function VisitPage({ params }: VisitPageProps) {
  const { visitId } = await params;
  if (visitId !== STAFF_VISIT.id) notFound();

  return <VisitRecord visit={STAFF_VISIT} patient={STAFF_PATIENT} />;
}
