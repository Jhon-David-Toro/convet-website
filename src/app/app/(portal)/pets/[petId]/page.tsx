import { notFound, redirect } from "next/navigation";

import { getPet } from "@/lib/api/pets.api";
import { loadData } from "@/lib/api/api.guard";
import { DEFAULT_PET_TAB } from "@/lib/customer/customer.paths.constants";
import { petHref } from "@/lib/customer/customer.utils";

import type { PetPageProps } from "./page.types";

/**
 * Pet profile without a tab: opens the default tab; unknown pets show the 404 page.
 *
 * @param props Props of the page, see {@link PetPageProps}.
 * @param props.params Route parameters with the `petId`.
 */
export default async function PetPage({ params }: PetPageProps) {
  const { data: pet } = await loadData(async () => getPet((await params).petId));
  if (!pet) notFound();
  redirect(petHref(pet, DEFAULT_PET_TAB));
}
