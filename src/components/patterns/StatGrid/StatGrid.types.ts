import type { ComponentPropsWithRef, CSSProperties } from "react";

import type { StatCardProps } from "@/components/ui/StatCard";

export type StatGridItem = Pick<StatCardProps, "label" | "value" | "caption" | "icon" | "tone"> & {
  desktopOnly?: boolean;
};

export type StatGridStyle = CSSProperties & { "--stat-columns": number };

export type StatGridProps = Omit<ComponentPropsWithRef<"div">, "children" | "style"> & {
  stats: StatGridItem[];
  columns?: number;
  mobileHidden?: boolean;
  style?: CSSProperties;
};
