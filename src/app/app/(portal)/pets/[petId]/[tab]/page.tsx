import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PetProfile } from "@/components/sections/PetProfile";
import { CUSTOMER_PETS } from "@/lib/customer.constants";
import { PET_TABS } from "@/lib/customer.paths.constants";
import { findPet } from "@/lib/customer.utils";

import type { PetTabPageProps } from "./page.types";

/**
 * Pre-renders every tab of every pet profile.
 *
 * @returns The `petId` and `tab` of every combination.
 */
export function generateStaticParams() {
  return CUSTOMER_PETS.flatMap(({ id }) => PET_TABS.map((tab) => ({ petId: id, tab })));
}

/**
 * Title of a pet profile page.
 *
 * @param props Props of the page, see {@link PetTabPageProps}.
 * @param props.params Route parameters with the `petId`.
 * @returns The metadata of the page, or an empty object for an unknown pet.
 */
export async function generateMetadata({ params }: PetTabPageProps): Promise<Metadata> {
  const pet = findPet((await params).petId);
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
  const pet = findPet(petId);
  const known = PET_TABS.find((candidate) => candidate === tab);
  if (!pet || !known) notFound();

  return <PetProfile pet={pet} tab={known} />;
}
