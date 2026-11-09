import { Chip } from "@/components/ui/Chip";
import { Icon, Lock } from "@/components/ui/Icon";

import { PET_TAB_LABELS, SWITCH_LABEL, SWITCH_NOTE } from "../HealthRecords.constants";
import type { PetSwitchProps } from "../HealthRecords.types";
import styles from "../HealthRecords.module.scss";

/**
 * Chips that switch the pet whose records are shown, and a note that only pets of the account appear.
 *
 * @param props Props of the component, see {@link PetSwitchProps}.
 * @param props.pets Pets to choose from.
 * @param props.selectedId Id of the pet on screen.
 * @param props.onSelect Called with the id of the pet the customer picked.
 * @returns The rendered element.
 */
export function PetSwitch({ pets, selectedId, onSelect }: PetSwitchProps) {
  return (
    <div role="group" aria-label={SWITCH_LABEL} className={styles.switch}>
      <span className={styles.switchLabel}>{SWITCH_LABEL}</span>
      {pets.map((pet) => (
        <Chip key={pet.id} selected={selectedId === pet.id} onClick={() => onSelect(pet.id)}>
          {PET_TAB_LABELS[pet.id] ?? pet.name}
        </Chip>
      ))}
      <span className={styles.switchNote}>
        <Icon icon={Lock} size="small" tone="tertiary" />
        {SWITCH_NOTE}
      </span>
    </div>
  );
}
