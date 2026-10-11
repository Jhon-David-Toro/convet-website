import Link from "next/link";

import { Icon, Plus } from "@/components/ui/Icon";

import { ADD_ANOTHER_LABEL, ADD_ICON_SIZE, ADD_PET_HREF } from "../CustomerOverview.constants";
import styles from "../CustomerOverview.module.scss";

/**
 * Dashed tile that invites the customer to add another pet.
 *
 * @returns The rendered element.
 */
export function AddPetTile() {
  return (
    <Link href={ADD_PET_HREF} className={styles.addTile}>
      <span className={styles.addIcon}>
        <Icon icon={Plus} size={ADD_ICON_SIZE} tone="brand" />
      </span>
      {ADD_ANOTHER_LABEL}
    </Link>
  );
}
