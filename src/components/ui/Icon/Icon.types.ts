import type { LucideIcon } from "lucide-react";

/** Icon size: `badge`, `small`, `medium`, `large`. */
export type IconSize = "badge" | "small" | "medium" | "large";

/** Icon tone: `inherit`, `primary`, `secondary`, `tertiary`, `brand`, `accent`, `inverse`, `success`, `warning`, `error`, `info`, `whatsapp`, `disabled`. */
export type IconTone =
    | "inherit"
    | "primary"
    | "secondary"
    | "tertiary"
    | "brand"
    | "accent"
    | "inverse"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "whatsapp"
    | "disabled";

/** Props of the `Icon` component. */
export type IconProps = {
    /** Icon component to draw. */
    icon: LucideIcon;
    /** System size or, for one-off cases (avatar, loading), pixels. */
    size?: IconSize | number;
    /** Color tone. */
    tone?: IconTone;
    /** Visible text. For icons it becomes the accessible name. */
    label?: string;
    /** Extra class name for the root element. */
    className?: string;
};