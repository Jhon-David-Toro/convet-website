import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock } from "@/components/ui/Icon";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_BOOSTER_LABEL, DUE_BADGE, NEXT_STEP_TEXT } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { NextStepCardProps } from "../PetProfile.types";

/**
 * Peach card that points to the next step for the pet: book the booster that is about to be due.
 *
 * @param props Props of the component, see {@link NextStepCardProps}.
 * @param props.pet Pet whose booster is due.
 * @returns The rendered element.
 */
export function NextStepCard({ pet }: NextStepCardProps) {
  return (
    <section className={styles.nextStep}>
      <Badge tone="warning" icon={Clock}>
        {DUE_BADGE}
      </Badge>
      <h2 className={styles.nextTitle}>{`${pet.name}'s rabies booster is due on Oct 20`}</h2>
      <p className={styles.nextText}>{NEXT_STEP_TEXT}</p>
      <Button variant="accent" href={BOOKING_HREF}>
        {BOOK_BOOSTER_LABEL}
      </Button>
    </section>
  );
}
