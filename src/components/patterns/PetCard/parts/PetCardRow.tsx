import { Avatar } from "@/components/ui/Avatar";
import { AlertTriangle, ChevronRight, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { PET_ALERT_ICON_SIZE } from "../PetCard.constants";
import type { PetCardLayoutProps } from "../PetCard.types";
import { PetRowName } from "./PetRowName";
import { PetVaccineBadge } from "./PetVaccineBadge";
import styles from "../PetCard.module.scss";

/**
 * Compact row of a list: the whole row is the link to the profile.
 *
 * @param props Props of the component, see {@link PetCardLayoutProps}.
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.name Name to show.
 * @param props.description Description line, e.g. "Dog · Mixed breed · 3 yrs".
 * @param props.alert Visible medical alert (allergies, medication).
 * @param props.vaccineStatus Vaccination status shown as a badge.
 * @param props.href Link to the profile: in `row` the whole row is the link.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PetCardRow({ subject, name, description, alert, vaccineStatus, href, className, ...rest }: PetCardLayoutProps) {
  return (
    <article {...rest} className={cx(styles.pet, styles.row, className)}>
      <Avatar subject={subject} size="medium" />
      <PetRowName name={name} description={description} href={href} />
      {alert && <Icon icon={AlertTriangle} size={PET_ALERT_ICON_SIZE} tone="error" label={alert} />}
      {vaccineStatus && <PetVaccineBadge status={vaccineStatus} />}
      <Icon icon={ChevronRight} size="medium" tone="tertiary" />
    </article>
  );
}
