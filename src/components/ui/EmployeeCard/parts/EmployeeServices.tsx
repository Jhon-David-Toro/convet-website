import { Badge } from "@/components/ui/Badge";

import styles from "../EmployeeCard.module.scss";
import type { EmployeeServicesProps } from "../EmployeeCard.types";

/**
 * Service badges; renders nothing when the list is empty.
 *
 * @param props Props of the component, see {@link EmployeeServicesProps}.
 * @param props.services Names of the services offered.
 * @returns The rendered element.
 */
export function EmployeeServices({ services }: EmployeeServicesProps) {
  if (services.length === 0) return null;

  return (
    <ul className={styles.services}>
      {services.map((service) => (
        <li key={service}>
          <Badge tone="brand">{service}</Badge>
        </li>
      ))}
    </ul>
  );
}
