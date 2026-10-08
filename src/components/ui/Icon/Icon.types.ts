import { LucideIcon } from "lucide-react";

export type IconSize = "badge" | "small" | "medium" | "large";

export type IconTone =
    | "inherit"
    | "primary"
    | "secondary"
    | "brand"
    | "accent"
    | "inverse"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "disabled";

export type IconProps = {
    icon: LucideIcon;
    size?: IconSize;
    tone?: IconTone;
    label?: string;
    className?: string;
};