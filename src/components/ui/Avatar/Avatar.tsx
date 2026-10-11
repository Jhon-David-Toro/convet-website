import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./Avatar.module.scss";
import { AVATAR_GLYPHS, AVATAR_GLYPH_SIZES } from "./Avatar.constants";
import type { AvatarProps } from "./Avatar.types";

/**
 * Circular avatar with the glyph of a dog, a cat or a person. Decorative unless a `label` is given.
 *
 * @param props Props of the component, see {@link AvatarProps}.
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.size Size of the component.
 * @param props.label When omitted, the avatar is decorative and hidden from assistive technology.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Avatar({ subject, size = "medium", label, className, ...rest }: AvatarProps) {
  const accessibilityProps = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <span
      {...rest}
      {...accessibilityProps}
      className={cx(styles.avatar, styles[subject], styles[size], className)}
    >
      <Icon icon={AVATAR_GLYPHS[subject]} size={AVATAR_GLYPH_SIZES[size]} />
    </span>
  );
}
