import Link from "next/link";

import type { PetRowNameProps } from "../PetCard.types";
import styles from "../PetCard.module.scss";

/**
 * Name and description of the row layout; the name link stretches over the whole row.
 *
 * @param props Props of the component, see {@link PetRowNameProps}.
 * @param props.name Name to show.
 * @param props.description Description line, e.g. "Dog · Mixed breed · 3 yrs".
 * @param props.href Link to the profile: in `row` the whole row is the link.
 * @returns The rendered element.
 */
export function PetRowName({ name, description, href }: PetRowNameProps) {
  return (
    <div className={styles.nameBlock}>
      <h3 className={styles.rowName}>
        <Link href={href} className={styles.stretched}>
          {name}
        </Link>
      </h3>
      <p className={styles.meta}>{description}</p>
    </div>
  );
}
