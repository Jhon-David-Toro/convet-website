import { cx } from "@/lib/shared/cx";

import type { PetCardLayoutProps } from "../PetCard.types";
import { PetAlert } from "./PetAlert";
import { PetCardFooter } from "./PetCardFooter";
import { PetFacts } from "./PetFacts";
import { PetIdentity } from "./PetIdentity";
import styles from "../PetCard.module.scss";

/**
 * Full card: identity, alert, key facts and footer.
 *
 * @param props Props of the component, see {@link PetCardLayoutProps}.
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.name Name to show.
 * @param props.description Description line, e.g. "Dog · Mixed breed · 3 yrs".
 * @param props.alert Visible medical alert (allergies, medication).
 * @param props.facts Key facts (only in `card`).
 * @param props.vaccineStatus Vaccination status shown as a badge.
 * @param props.href Link to the profile: in `row` the whole row is the link.
 * @param props.viewLabel Label of the link to the profile.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PetCardFull({ subject, name, description, alert, facts = [], vaccineStatus, href, viewLabel = "View profile", className, ...rest }: PetCardLayoutProps) {
  return (
    <article {...rest} className={cx(styles.pet, styles.card, className)}>
      <PetIdentity subject={subject} name={name} description={description} />
      {alert && <PetAlert text={alert} />}
      {facts.length > 0 && <PetFacts facts={facts} />}
      <PetCardFooter vaccineStatus={vaccineStatus} href={href} viewLabel={viewLabel} />
    </article>
  );
}
