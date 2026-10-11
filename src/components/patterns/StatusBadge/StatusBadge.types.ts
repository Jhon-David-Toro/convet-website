import type { BadgeProps } from "@/components/ui/Badge";

export type StatusView = {
  tone: NonNullable<BadgeProps["tone"]>;
  icon?: BadgeProps["icon"];
  label: string;
};

export type StatusBadgeProps = Omit<BadgeProps, "tone" | "icon" | "children"> & {
  view: StatusView;
};
