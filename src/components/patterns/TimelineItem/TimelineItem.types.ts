import type { ComponentPropsWithRef } from "react";

/** Timeline type: `visit`, `vaccine`, `treatment`, `document`. */
export type TimelineType = "visit" | "vaccine" | "treatment" | "document";

/** Props of the `TimelineItem` component. */
export type TimelineItemProps = Omit<ComponentPropsWithRef<"li">, "title"> & {
  /** Variant of the element (button type or cell type). */
  type: TimelineType;
  /** Title text. */
  title: string;
  /** Date and author, e.g. "Sep 12, 2026 · Dr. Shirley". */
  meta: string;
  /** Short summary of the entry. */
  summary?: string;
  /** The last item does not draw the line going down. */
  last?: boolean;
};

/** Props of the rail (icon dot and connecting line). */
export type TimelineRailProps = Pick<TimelineItemProps, "type" | "last">;
