import styles from "./Icon.module.scss";
import { IconProps } from "./Icon.types";

export function Icon({ icon: IconComponent, size = "medium", tone = "inherit", label, className }: IconProps) {
  const classes = [styles.icon, styles[size], styles[tone], className]
    .filter(Boolean)
    .join(" ");

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
      strokeWidth={1.75}
      focusable="false"
      {...accessibilityProps}
    />
  );
}