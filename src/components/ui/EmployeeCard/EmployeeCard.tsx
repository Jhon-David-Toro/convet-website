import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Stethoscope } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { cx } from "@/lib/shared/cx";

import type { EmployeeCardProps } from "./EmployeeCard.types";
import { EmployeeServices } from "./parts/EmployeeServices";
import styles from "./EmployeeCard.module.scss";

/**
 * Card/Employee: portrait, name, role, services and booking with the person.
 *
 * @param props Props of the component, see {@link EmployeeCardProps}.
 * @param props.photo Portrait of the person: image `src` and `alt`.
 * @param props.name Name to show.
 * @param props.role Description line, e.g. "Veterinarian · Small animals".
 * @param props.roleLabel Navy label with the role, e.g. "Veterinarian".
 * @param props.services Names of the services offered.
 * @param props.bookHref Link to the booking page.
 * @param props.bookLabel Label of the booking button.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function EmployeeCard({ photo, name, role, roleLabel, services = [], bookHref, bookLabel, className, ...rest }: EmployeeCardProps) {
  return (
    <article {...rest} className={cx(styles.card, className)}>
      <Photo src={photo?.src} alt={photo?.alt} ratio="314 / 300" className={styles.photo} />
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        <Badge tone="navy" icon={Stethoscope}>
          {roleLabel}
        </Badge>
        <EmployeeServices services={services} />
        <Button variant="tertiary" size="small" href={bookHref} trailingIcon={ArrowRight} className={styles.book}>
          {bookLabel}
        </Button>
      </div>
    </article>
  );
}
