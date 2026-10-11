import { Badge } from "@/components/ui/Badge";
import { Clock } from "@/components/ui/Icon";

import type { ServiceRowProps } from "../ServiceList.types";
import { ServiceHighlights } from "./ServiceHighlights";
import styles from "../ServiceList.module.scss";

/**
 * Text of a row: the name with its duration, the description and the highlights.
 *
 * @param props Props of the component, see {@link ServiceRowProps}.
 * @param props.service Service the row describes.
 * @returns The rendered element.
 */
export function ServiceRowText({ service }: ServiceRowProps) {
  return (
    <div className={styles.text}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{service.title}</h2>
        <Badge icon={Clock}>{service.duration}</Badge>
      </div>
      <p className={styles.description}>{service.summary}</p>
      <ServiceHighlights highlights={service.highlights} />
    </div>
  );
}
