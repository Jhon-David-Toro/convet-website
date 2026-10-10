import type { LucideIcon } from "lucide-react";

export type IconSize = "badge" | "small" | "medium" | "large";

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

export type IconProps = {
    icon: LucideIcon;
    size?: IconSize | number;
    tone?: IconTone;
    label?: string;
    className?: string;
};