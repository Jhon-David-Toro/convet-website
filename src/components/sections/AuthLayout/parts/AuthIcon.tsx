import { Icon } from "@/components/ui/Icon";

import { AUTH_ICON_SIZE } from "../AuthLayout.constants";
import type { AuthIconProps } from "../AuthLayout.types";
import styles from "../AuthLayout.module.scss";

/**
 * Round badge with an icon at the top of the verification pages.
 *
 * @param props Props of the component, see {@link AuthIconProps}.
 * @param props.icon Icon to draw.
 * @returns The rendered element.
 */
export function AuthIcon({ icon }: AuthIconProps) {
  return (
    <span className={styles.badge}>
      <Icon icon={icon} size={AUTH_ICON_SIZE} tone="brand" />
    </span>
  );
}
