import { Chip } from "@/components/ui/Chip";

import styles from "../AdminServices.module.scss";
import { SPECIES_LABEL, SPECIES_OPTIONS } from "../AdminServices.constants";
import type { SpeciesChipsProps } from "../AdminServices.types";

/**
 * Chips that pick the species the service is shown for in the booking flow.
 *
 * @param props Props of the component, see {@link SpeciesChipsProps}.
 * @param props.selected Species selected now.
 * @param props.toggleSpecies Adds or removes a species.
 * @returns The rendered element.
 */
export function SpeciesChips({ selected, toggleSpecies }: SpeciesChipsProps) {
  return (
    <div className={styles.speciesGroup}>
      <p className={styles.speciesLabel}>{SPECIES_LABEL}</p>
      <div role="group" aria-label={SPECIES_LABEL} className={styles.chips}>
        {SPECIES_OPTIONS.map((species) => (
          <Chip key={species} selected={selected.includes(species)} onClick={() => toggleSpecies(species)}>
            {species}
          </Chip>
        ))}
      </div>
    </div>
  );
}
