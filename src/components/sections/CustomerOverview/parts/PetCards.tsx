import { PetCard } from "@/components/patterns/PetCard";
import { CUSTOMER_PETS } from "@/lib/customer.constants";
import { petCardProps } from "@/lib/customer.utils";

import styles from "../CustomerOverview.module.scss";
import { AddPetTile } from "./AddPetTile";

/**
 * Compact pet rows on small screens, and from tablet the full pet cards followed by the add tile.
 *
 * @returns The rendered element.
 */
export function PetCards() {
  return (
    <>
      <div className={styles.petRows}>
        {CUSTOMER_PETS.map((pet) => (
          <PetCard key={pet.id} layout="row" {...petCardProps(pet)} />
        ))}
      </div>
      <div className={styles.petCards}>
        {CUSTOMER_PETS.map((pet) => (
          <PetCard key={pet.id} {...petCardProps(pet)} />
        ))}
        <AddPetTile />
      </div>
    </>
  );
}
