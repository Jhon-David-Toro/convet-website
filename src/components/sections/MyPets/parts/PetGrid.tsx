import { PetCard } from "@/components/patterns/PetCard";
import { petCardProps } from "@/lib/customer/customer.utils";

import styles from "../MyPets.module.scss";
import type { PetGridProps } from "../MyPets.types";

/**
 * One pet card per pet, in a grid that grows from one to two columns.
 *
 * @param props Props of the component, see {@link PetGridProps}.
 * @param props.pets Pets to show.
 * @returns The rendered element.
 */
export function PetGrid({ pets }: PetGridProps) {
  return (
    <div className={styles.grid}>
      {pets.map((pet) => (
        <PetCard key={pet.id} {...petCardProps(pet)} />
      ))}
    </div>
  );
}
