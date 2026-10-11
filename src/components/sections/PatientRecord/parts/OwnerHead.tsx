import { Avatar } from "@/components/ui/Avatar";

import type { OwnerHeadProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Avatar, name and client-since line of the owner.
 *
 * @param props Props of the component, see {@link OwnerHeadProps}.
 * @param props.owner Owner to show.
 * @returns The rendered element.
 */
export function OwnerHead({ owner }: OwnerHeadProps) {
  return (
    <div className={styles.ownerHead}>
      <Avatar subject="person" size="medium" />
      <div>
        <p className={styles.ownerName}>{owner.name}</p>
        <p className={styles.ownerSince}>{owner.since}</p>
      </div>
    </div>
  );
}
