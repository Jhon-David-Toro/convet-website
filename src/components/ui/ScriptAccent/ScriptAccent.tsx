import { Heart, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./ScriptAccent.module.scss";
import { SCRIPT_ACCENT_HEART_SIZE } from "./ScriptAccent.constants";
import type { ScriptAccentProps } from "./ScriptAccent.types";

/**
 * Brand/Script Accent: the brand phrase in orange handwriting, with a heart. One per screen.
 *
 * @param props Props of the component, see {@link ScriptAccentProps}.
 * @param props.size `large`: Accent/Script (34/40); `small`: Accent/Script S (22/28).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ScriptAccent({ size = "large", className, children, ...rest }: ScriptAccentProps) {
  return (
    <p {...rest} className={cx(styles.accent, styles[size], className)}>
      <span>{children}</span>
      <Icon icon={Heart} size={SCRIPT_ACCENT_HEART_SIZE} tone="accent" />
    </p>
  );
}
