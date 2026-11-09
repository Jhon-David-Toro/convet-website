import { PetCard } from "@/components/patterns/PetCard";
import { petCardProps } from "@/lib/customer/customer.utils";

import type { PetGridProps } from "@/components/sections/MyPets/MyPets.types";
import { AddPetTile } from "./AddPetTile";
import styles from "../CustomerOverview.module.scss";

/**
 * Compact pet rows on small screens, and from tablet the full pet cards followed by the add tile.
 *
 * @param props Props of the component.
 * @param props.pets Pets to show.
 * @returns The rendered element.
 */
export function PetCards({ pets }: PetGridProps) {
  return (
    <>
      <div className={styles.petRows}>
        {pets.map((pet) => (
          <PetCard key={pet.id} layout="row" {...petCardProps(pet)} />
        ))}
      </div>
      <div className={styles.petCards}>
        {pets.map((pet) => (
          <PetCard key={pet.id} {...petCardProps(pet)} />
        ))}
        <AddPetTile />
      </div>
    </>
  );
}
