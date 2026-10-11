import { Button } from "@/components/ui/Button";
import { vaccinesOf } from "@/lib/customer/customer.utils";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_BOOSTER_LABEL } from "../PetProfile.constants";
import type { PetProps } from "../PetProfile.types";
import { NextStepCard } from "./NextStepCard";
import { UpcomingCard } from "./UpcomingCard";
import { VaccinationCard } from "./VaccinationCard";
import styles from "../PetProfile.module.scss";

/**
 * Vaccines tab: the vaccination card and, on desktop, the next step and the upcoming appointment at its side.
 * On mobile the booster is booked with a full-width button under the card.
 *
 * @param props Props of the component, see {@link PetProps}.
 * @param props.pet Pet whose vaccines are shown.
 * @returns The rendered element.
 */
export function VaccinesTab({ pet }: PetProps) {
  return (
    <>
      <div className={styles.columns}>
        <VaccinationCard vaccines={vaccinesOf(pet.id)} />
        <div className={styles.side}>
          <NextStepCard pet={pet} />
          <UpcomingCard pet={pet} />
        </div>
      </div>
      <Button variant="accent" href={BOOKING_HREF} className={styles.mobileBook}>
        {BOOK_BOOSTER_LABEL}
      </Button>
    </>
  );
}
