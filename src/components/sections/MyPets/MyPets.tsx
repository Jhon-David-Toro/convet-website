"use client";

import { CUSTOMER_PETS } from "@/lib/customer.constants";
import { useDisclosure } from "@/lib/useDisclosure";

import styles from "./MyPets.module.scss";
import type { MyPetsProps } from "./MyPets.types";
import { AddPetModal } from "./parts/AddPetModal";
import { EmptyPets } from "./parts/EmptyPets";
import { MyPetsHeader } from "./parts/MyPetsHeader";
import { PetGrid } from "./parts/PetGrid";

/**
 * My pets page: title with the pet count, the pet cards (or an empty state) and the "Add a pet" modal.
 *
 * @param props Props of the component, see {@link MyPetsProps}.
 * @param props.pets Pets to show; by default the ones of the customer.
 * @param props.initialAddOpen Opens the "Add a pet" modal at the start (the links that say "Add a pet" use it).
 * @returns The rendered element.
 */
export function MyPets({ pets = CUSTOMER_PETS, initialAddOpen = false }: MyPetsProps) {
  const adding = useDisclosure(initialAddOpen);

  return (
    <div className={styles.page}>
      <MyPetsHeader count={pets.length} onAdd={adding.show} />
      {pets.length > 0 ? <PetGrid pets={pets} /> : <EmptyPets onAdd={adding.show} />}
      <AddPetModal open={adding.open} onClose={adding.hide} />
    </div>
  );
}
