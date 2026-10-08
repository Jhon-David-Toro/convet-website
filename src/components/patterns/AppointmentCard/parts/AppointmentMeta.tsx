import { Icon } from "@/components/ui/Icon";

import styles from "../AppointmentCard.module.scss";
import type { AppointmentMetaProps } from "../AppointmentCard.types";

/**
 * List of time, pet, vet and location, each with its icon.
 *
 * @param props Props of the component, see {@link AppointmentMetaProps}.
 * @param props.items Items to render.
 * @returns The rendered element.
 */
export function AppointmentMeta({ items }: AppointmentMetaProps) {
  return (
    <ul className={styles.meta}>
      {items.map(({ icon, text }, index) => (
        // The four lines are fixed and ordered, so the index is a stable key
        <li key={index}>
          <Icon icon={icon} size="small" tone="tertiary" />
          {text}
        </li>
      ))}
    </ul>
  );
}
