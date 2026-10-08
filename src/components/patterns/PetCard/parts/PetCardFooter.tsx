import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

import styles from "../PetCard.module.scss";
import type { PetCardFooterProps } from "../PetCard.types";
import { PetVaccineBadge } from "./PetVaccineBadge";

/**
 * Footer of the full card: vaccination badge and the profile link.
 *
 * @param props Props of the component, see {@link PetCardFooterProps}.
 * @param props.vaccineStatus Vaccination status shown as a badge.
 * @param props.href Link to the profile: in `row` the whole row is the link.
 * @param props.viewLabel Label of the link to the profile.
 * @returns The rendered element.
 */
export function PetCardFooter({ vaccineStatus, href, viewLabel }: PetCardFooterProps) {
  return (
    <div className={styles.footer}>
      {vaccineStatus ? <PetVaccineBadge status={vaccineStatus} /> : <span />}
      <Button variant="tertiary" size="small" href={href} trailingIcon={ArrowRight}>
        {viewLabel}
      </Button>
    </div>
  );
}
