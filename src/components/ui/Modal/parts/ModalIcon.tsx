import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "../Modal.module.scss";
import { MODAL_ICON_SIZE } from "../Modal.constants";
import type { ModalIconProps } from "../Modal.types";

/**
 * Circle with the header icon, tinted by tone; renders nothing without an icon.
 *
 * @param props Props of the component, see {@link ModalIconProps}.
 * @param props.icon Header icon (e.g. a warning in a destructive confirmation).
 * @param props.iconTone Color tone of the icon.
 * @returns The rendered element.
 */
export function ModalIcon({ icon, iconTone = "error" }: ModalIconProps) {
  if (!icon) return null;

  return (
    <span className={cx(styles.iconWrap, styles[iconTone])}>
      <Icon icon={icon} size={MODAL_ICON_SIZE} />
    </span>
  );
}
