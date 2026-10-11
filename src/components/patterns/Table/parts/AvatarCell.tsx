import { Avatar } from "@/components/ui/Avatar";
import { cx } from "@/lib/shared/cx";

import type { AvatarCellProps } from "../Table.types";
import styles from "../Table.module.scss";

/**
 * Cell with an avatar, the value and an optional secondary line.
 *
 * @param props Props of the component, see {@link AvatarCellProps}.
 * @param props.avatar Avatar subject drawn next to the value.
 * @param props.secondary Secondary line below the value (e.g. the owner).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function AvatarCell({ avatar, secondary, className, children, type, ...rest }: AvatarCellProps) {
  return (
    <td {...rest} className={cx(styles.cell, styles[type], className)}>
      <Avatar subject={avatar} size="small" />
      <span className={styles.textGroup}>
        <span className={styles.value}>{children}</span>
        {secondary && <span className={styles.secondary}>{secondary}</span>}
      </span>
    </td>
  );
}
