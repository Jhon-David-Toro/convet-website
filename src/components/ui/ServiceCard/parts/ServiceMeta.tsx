import { Badge } from "@/components/ui/Badge";
import { Clock, Paw } from "@/components/ui/Icon";

import type { ServiceMetaProps } from "../ServiceCard.types";
import styles from "../ServiceCard.module.scss";

/**
 * Duration and species badges; renders nothing when neither is given.
 *
 * @param props Props of the component, see {@link ServiceMetaProps}.
 * @param props.duration Duration, e.g. "15 min".
 * @param props.species Species, e.g. "Dogs · Cats".
 * @returns The rendered element.
 */
export function ServiceMeta({ duration, species }: ServiceMetaProps) {
  if (!duration && !species) return null;

  return (
    <div className={styles.meta}>
      {duration && <Badge icon={Clock}>{duration}</Badge>}
      {species && <Badge icon={Paw}>{species}</Badge>}
    </div>
  );
}
