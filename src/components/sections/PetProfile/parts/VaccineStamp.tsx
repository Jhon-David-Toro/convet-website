import { cx } from "@/lib/shared/cx";

import { STAMP_TONES } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { VaccineStampProps } from "../PetProfile.types";

/**
 * Round dashed stamp of a vaccine, coloured by its status, with the vaccine name and the date it was given.
 *
 * @param props Props of the component, see {@link VaccineStampProps}.
 * @param props.vaccine Vaccine to stamp.
 * @returns The rendered element.
 */
export function VaccineStamp({ vaccine }: VaccineStampProps) {
  return (
    <li className={cx(styles.stamp, styles[STAMP_TONES[vaccine.status]])}>
      <span className={styles.stampName}>{vaccine.stamp}</span>
      <span className={styles.stampDate}>{vaccine.stampDate}</span>
    </li>
  );
}
