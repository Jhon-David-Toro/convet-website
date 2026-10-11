import { Badge } from "@/components/ui/Badge";
import { PET_STATUS_BADGES } from "@/lib/customer.constants";

import styles from "../PetProfile.module.scss";
import type { PetProps } from "../PetProfile.types";
import { AllergyNote } from "./AllergyNote";

/**
 * Name with the vaccine status, the description line and the allergy of a pet.
 *
 * @param props Props of the component, see {@link PetProps}.
 * @param props.pet Pet to describe.
 * @returns The rendered element.
 */
export function PetIdentity({ pet }: PetProps) {
  const { tone, icon } = PET_STATUS_BADGES[pet.vaccineStatus];

  return (
    <div className={styles.identity}>
      <div className={styles.nameRow}>
        <h1 className={styles.name}>{pet.name}</h1>
        <Badge tone={tone} icon={icon}>
          {pet.vaccineBadge}
        </Badge>
      </div>
      <p className={styles.meta}>{pet.profileLine}</p>
      {pet.allergy && <AllergyNote text={pet.allergy} />}
    </div>
  );
}
