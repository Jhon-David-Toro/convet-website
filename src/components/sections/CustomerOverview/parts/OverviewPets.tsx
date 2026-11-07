import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { Alert } from "@/components/ui/Alert";
import { ADD_PET_HREF, ADD_PET_LABEL, PETS_TITLE } from "../CustomerOverview.constants";
import type { OverviewPetsProps } from "../CustomerOverview.types";
import { PetCards } from "./PetCards";
import styles from "../CustomerOverview.module.scss";

/**
 * "Your pets": the heading with the add button (not on mobile) and the pet cards.
 *
 * @param props Props of the component, see {@link OverviewPetsProps}.
 * @param props.pets Pets of the customer.
 * @param props.loadError Message shown instead of the cards when the pets could not be loaded.
 * @returns The rendered element.
 */
export function OverviewPets({ pets, loadError }: OverviewPetsProps) {
  return (
    <section className={styles.pets} aria-labelledby="overview-pets">
      <div className={styles.petsHeader}>
        <h2 id="overview-pets" className={cx(styles.blockTitle, styles.petsTitle)}>
          {PETS_TITLE}
        </h2>
        <Button variant="secondary" size="small" href={ADD_PET_HREF} leadingIcon={Plus} className={styles.addButton}>
          {ADD_PET_LABEL}
        </Button>
      </div>
      {loadError ? (
        <Alert tone="error" title="We could not load your pets">
          {loadError}
        </Alert>
      ) : (
        <PetCards pets={pets} />
      )}
    </section>
  );
}
