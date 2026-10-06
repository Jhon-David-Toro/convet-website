import { Check, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./Chip.module.scss";
import type { ChipProps } from "./Chip.types";

/**
 * Selectable filter chip with an optional count. The parent controls the selected state.
 *
 * @param props Props of the component, see {@link ChipProps}.
 * @param props.selected Selection state. The parent controls the value and updates it in onClick.
 * @param props.count Optional count shown after the label.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Chip({ selected = false, count, type = "button", className, children, ...rest }: ChipProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-pressed={selected}
      className={cx(styles.chip, selected && styles.selected, className)}
    >
      {selected && <Icon icon={Check} size="small" />}
      <span className={styles.label}>{children}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
}
