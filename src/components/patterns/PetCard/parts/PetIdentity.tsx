import { Avatar } from "@/components/ui/Avatar";

import styles from "../PetCard.module.scss";
import type { PetIdentityProps } from "../PetCard.types";

/**
 * Large avatar with the pet name and description.
 *
 * @param props Props of the component, see {@link PetIdentityProps}.
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.name Name to show.
 * @param props.description Description line, e.g. "Dog · Mixed breed · 3 yrs".
 * @returns The rendered element.
 */
export function PetIdentity({ subject, name, description }: PetIdentityProps) {
  return (
    <div className={styles.identity}>
      <Avatar subject={subject} size="large" />
      <div className={styles.nameBlock}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.meta}>{description}</p>
      </div>
    </div>
  );
}
