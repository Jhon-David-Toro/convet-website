import type { ComponentPropsWithRef } from "react";

export type TimelineType = "visit" | "vaccine" | "treatment" | "document";

export type TimelineItemProps = Omit<ComponentPropsWithRef<"li">, "title"> & {
  type: TimelineType;
  title: string;
  meta: string;
  summary?: string;
  last?: boolean;
};

export type TimelineRailProps = Pick<TimelineItemProps, "type" | "last">;
