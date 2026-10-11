import { Badge } from "@/components/ui/Badge";
import { cx } from "@/lib/shared/cx";

import styles from "./Tab.module.scss";
import type { TabProps } from "./Tab.types";

/**
 * Navigation/Tab. Use it inside a container with `role="tablist"` and link each tab to its panel (`aria-controls`).
 *
 * @param props Props of the component, see {@link TabProps}.
 * @param props.selected Whether the item is selected.
 * @param props.count Optional counter next to the label.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Tab({ selected = false, count, type = "button", className, children, ...rest }: TabProps) {
  return (
    <button
      {...rest}
      type={type}
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cx(styles.tab, selected && styles.selected, className)}
    >
      <span>{children}</span>
      {count !== undefined && <Badge tone={selected ? "brand" : "neutral"}>{count}</Badge>}
    </button>
  );
}
