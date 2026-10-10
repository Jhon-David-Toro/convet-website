import { Check, Icon } from "@/components/ui/Icon";

import { HIGHLIGHT_ICON_SIZE } from "../ServiceList.constants";
import styles from "../ServiceList.module.scss";
import type { ServiceHighlightsProps } from "../ServiceList.types";

/**
 * Short selling points of a service, each with a check icon.
 *
 * @param props Props of the component, see {@link ServiceHighlightsProps}.
 * @param props.highlights Short selling points of the service.
 * @returns The rendered element.
 */
export function ServiceHighlights({ highlights }: ServiceHighlightsProps) {
  return (
    <ul className={styles.highlights}>
      {highlights.map((highlight) => (
        <li key={highlight} className={styles.highlight}>
          <Icon icon={Check} size={HIGHLIGHT_ICON_SIZE} tone="success" />
          {highlight}
        </li>
      ))}
    </ul>
  );
}
