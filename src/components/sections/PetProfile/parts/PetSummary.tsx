import { PetCard } from "@/components/patterns/PetCard";
import { petCardProps } from "@/lib/customer/customer.utils";

import type { PetProps } from "../PetProfile.types";
import styles from "../PetProfile.module.scss";

/**
 * Summary card of the pet that replaces the header below desktop.
 *
 * @param props Props of the component, see {@link PetProps}.
 * @param props.pet Pet to describe.
 * @returns The rendered element.
 */
export function PetSummary({ pet }: PetProps) {
  return <PetCard {...petCardProps(pet)} className={styles.summary} />;
}
