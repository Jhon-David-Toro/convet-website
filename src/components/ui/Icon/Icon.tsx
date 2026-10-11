import { cx } from "@/lib/shared/cx";

import { ICON_PIXEL_SIZES, ICON_STROKE_WIDTH } from "./Icon.constants";
import type { IconProps } from "./Icon.types";
import styles from "./Icon.module.scss";

/**
 * Draws an icon from the icon set at a named or custom size. Decorative unless a `label` is given.
 *
 * @param props Props of the component, see {@link IconProps}.
 * @param props.icon Icon component to draw.
 * @param props.size System size or, for one-off cases (avatar, loading), pixels.
 * @param props.tone Color tone.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.className Extra class name for the root element.
 * @returns The rendered element.
 */
export function Icon({ icon: IconComponent, size = "medium", tone = "inherit", label, className }: IconProps) {
  const classes = cx(styles.icon, styles[tone], className);

  const accessibilityProps = label
    ? {
      role: "img",
      "aria-label": label,
    }
    : {
      "aria-hidden": true,
    };

  return (
    <IconComponent
      className={classes}
      size={typeof size === "number" ? size : ICON_PIXEL_SIZES[size]}
      strokeWidth={ICON_STROKE_WIDTH}
      nonScalingStroke
      focusable="false"
      {...accessibilityProps}
    />
  );
}
