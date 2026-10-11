import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";

import { ADD_LABEL, TITLE } from "../MyPets.constants";
import styles from "../MyPets.module.scss";
import type { MyPetsHeaderProps } from "../MyPets.types";

/**
 * Title of the page with how many pets there are and the button that opens the "Add a pet" modal (not on mobile).
 *
 * @param props Props of the component, see {@link MyPetsHeaderProps}.
 * @param props.count Number of pets.
 * @param props.onAdd Opens the modal.
 * @returns The rendered element.
 */
export function MyPetsHeader({ count, onAdd }: MyPetsHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.count}>{`${count} ${count === 1 ? "pet" : "pets"}`}</p>
      </div>
      <Button onClick={onAdd} leadingIcon={Plus} className={styles.add}>
        {ADD_LABEL}
      </Button>
    </header>
  );
}
