import { Icon } from "@/components/ui/Icon";

import { FACT_ICON_SIZE } from "../ServiceDetail.constants";
import styles from "../ServiceDetail.module.scss";
import type { ServiceFactsProps } from "../ServiceDetail.types";

/**
 * Facts of a service in the booking card: an icon with a headline and a supporting line.
 *
 * @param props Props of the component, see {@link ServiceFactsProps}.
 * @param props.facts Facts to list.
 * @returns The rendered element.
 */
export function ServiceFacts({ facts }: ServiceFactsProps) {
  return (
    <ul className={styles.facts}>
      {facts.map(({ icon, title, detail }) => (
        <li key={title} className={styles.fact}>
          <Icon icon={icon} size={FACT_ICON_SIZE} tone="brand" />
          <div>
            <p className={styles.factTitle}>{title}</p>
            <p className={styles.factDetail}>{detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
