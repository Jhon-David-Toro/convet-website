import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Paw, Plus } from "@/components/ui/Icon";

import { ADD_LABEL, EMPTY_TEXT, EMPTY_TITLE } from "../MyPets.constants";
import type { EmptyPetsProps } from "../MyPets.types";
import styles from "../MyPets.module.scss";

/**
 * Dashed card shown when the customer has no pets yet, with the button that adds the first one.
 *
 * @param props Props of the component, see {@link EmptyPetsProps}.
 * @param props.onAdd Opens the "Add a pet" modal.
 * @returns The rendered element.
 */
export function EmptyPets({ onAdd }: EmptyPetsProps) {
  return (
    <EmptyState
      icon={Paw}
      title={EMPTY_TITLE}
      message={EMPTY_TEXT}
      className={styles.empty}
      action={
        <Button onClick={onAdd} leadingIcon={Plus}>
          {ADD_LABEL}
        </Button>
      }
    />
  );
}
