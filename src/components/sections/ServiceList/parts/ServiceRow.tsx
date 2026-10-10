import { Icon } from "@/components/ui/Icon";

import { ROW_ICON_SIZE } from "../ServiceList.constants";
import styles from "../ServiceList.module.scss";
import type { ServiceRowProps } from "../ServiceList.types";
import { ServiceRowActions } from "./ServiceRowActions";
import { ServiceRowText } from "./ServiceRowText";

/**
 * Service/Row: icon, text and actions of one service.
 *
 * @param props Props of the component, see {@link ServiceRowProps}.
 * @param props.service Service the row describes.
 * @returns The rendered element.
 */
export function ServiceRow({ service }: ServiceRowProps) {
  return (
    <article className={styles.row}>
      <span className={styles.iconWrap}>
        <Icon icon={service.icon} size={ROW_ICON_SIZE} tone="brand" />
      </span>
      <ServiceRowText service={service} />
      <ServiceRowActions service={service} />
    </article>
  );
}
