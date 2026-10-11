import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";

import { ADD_PET_HREF, ADD_PET_LABEL, PETS_TITLE } from "../CustomerOverview.constants";
import styles from "../CustomerOverview.module.scss";
import { PetCards } from "./PetCards";

/**
 * "Your pets": the heading with the add button (not on mobile) and the pet cards.
 *
 * @returns The rendered element.
 */
export function OverviewPets() {
  return (
    <section className={styles.pets} aria-labelledby="overview-pets">
      <div className={styles.petsHeader}>
        <h2 id="overview-pets" className={styles.blockTitle}>
          {PETS_TITLE}
        </h2>
        <Button variant="secondary" size="small" href={ADD_PET_HREF} leadingIcon={Plus} className={styles.addButton}>
          {ADD_PET_LABEL}
        </Button>
      </div>
      <PetCards />
    </section>
  );
}
