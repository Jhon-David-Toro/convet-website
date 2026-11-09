import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PetProfile } from "@/components/sections/PetProfile";
import { loadData } from "@/lib/api/api.guard";
import { getPetHistory } from "@/lib/api/medical-records.api";
import { getPet } from "@/lib/api/pets.api";
import { PET_TABS } from "@/lib/customer/customer.paths.constants";

import { archivePetAction, updatePetAction } from "../../actions";
import type { PetTabPageProps } from "./page.types";

/**
 * Title of a pet profile page.
 *
 * @param props Props of the page, see {@link PetTabPageProps}.
 * @param props.params Route parameters with the `petId`.
 * @returns The metadata of the page, or an empty object for an unknown pet.
 */
export async function generateMetadata({ params }: PetTabPageProps): Promise<Metadata> {
  const { data: pet } = await loadData(async () => getPet((await params).petId));
  return pet ? { title: `${pet.name} · CONVET` } : {};
}

/**
 * One tab of a pet profile; unknown pets or tabs show the 404 page.
 *
 * @param props Props of the page, see {@link PetTabPageProps}.
 * @param props.params Route parameters with the `petId` and the `tab`.
 * @returns The rendered element.
 */
export default async function PetTabPage({ params }: PetTabPageProps) {
  const { petId, tab } = await params;
  const { data: pet } = await loadData(() => getPet(petId));
  const known = PET_TABS.find((candidate) => candidate === tab);
  if (!pet || !known) notFound();

  // Only the History tab needs the medical records, so the other tabs do not call the backend for them.
  const history = known === "history" ? await loadData(() => getPetHistory(pet.id)) : undefined;

  return (
    <PetProfile
      pet={pet}
      tab={known}
      history={{ events: history?.data ?? [], error: history?.error?.message }}
      onSave={updatePetAction}
      onArchive={archivePetAction}
    />
  );
}
