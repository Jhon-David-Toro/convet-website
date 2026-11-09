import type { Metadata } from "next";

import { MyPets } from "@/components/sections/MyPets";
import { loadData } from "@/lib/api/api.guard";
import { getMyPets } from "@/lib/api/pets.api";

import { addPetAction } from "./actions";
import type { MyPetsPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "My pets · CONVET",
};

/**
 * My pets page of the customer area; `?add=1` opens the "Add a pet" modal straight away.
 * The pets come from the backend; a failure shows an error state instead of an empty list.
 *
 * @param props Props of the page, see {@link MyPetsPageProps}.
 * @param props.searchParams Query string.
 * @returns The rendered element.
 */
export default async function MyPetsPage({ searchParams }: MyPetsPageProps) {
  const { add } = await searchParams;
  const { data: pets = [], error } = await loadData(getMyPets);

  return <MyPets pets={pets} loadError={error?.message} onAddPet={addPetAction} initialAddOpen={add === "1"} />;
}
