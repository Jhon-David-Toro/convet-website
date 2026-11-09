"use client";

import { useDisclosure } from "@/lib/shared/useDisclosure";

import type { MyPetsProps } from "./MyPets.types";
import { AddPetModal } from "./parts/AddPetModal";
import { EmptyPets } from "./parts/EmptyPets";
import { LoadError } from "./parts/LoadError";
import { MyPetsHeader } from "./parts/MyPetsHeader";
import { PetGrid } from "./parts/PetGrid";
import styles from "./MyPets.module.scss";

/**
 * My pets page: title with the pet count, the pet cards (or an empty state) and the "Add a pet" modal.
 *
 * @param props Props of the component, see {@link MyPetsProps}.
 * @param props.pets Pets of the customer.
 * @param props.loadError Message shown instead of the pets when they could not be loaded.
 * @param props.onAddPet Saves a new pet.
 * @param props.initialAddOpen Opens the "Add a pet" modal at the start (the links that say "Add a pet" use it).
 * @returns The rendered element.
 */
export function MyPets({ pets, loadError, onAddPet, initialAddOpen = false }: MyPetsProps) {
  const adding = useDisclosure(initialAddOpen);

  return (
    <div className={styles.page}>
      <MyPetsHeader count={pets.length} onAdd={adding.show} />
      {loadError ? <LoadError message={loadError} /> : pets.length > 0 ? <PetGrid pets={pets} /> : <EmptyPets onAdd={adding.show} />}
      <AddPetModal open={adding.open} onClose={adding.hide} onSave={onAddPet} />
    </div>
  );
}
