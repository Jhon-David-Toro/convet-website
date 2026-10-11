import { AlertTriangle, Icon } from "@/components/ui/Icon";

import type { AllergyNoteProps } from "../PetProfile.types";
import styles from "../PetProfile.module.scss";

/**
 * Medical alert of a pet, e.g. an allergy, on a red background.
 *
 * @param props Props of the component, see {@link AllergyNoteProps}.
 * @param props.text Text of the alert.
 * @returns The rendered element.
 */
export function AllergyNote({ text }: AllergyNoteProps) {
  return (
    <p className={styles.allergy}>
      <Icon icon={AlertTriangle} tone="error" />
      {text}
    </p>
  );
}
