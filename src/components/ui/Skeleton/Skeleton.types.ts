import type { ComponentPropsWithRef } from "react";

/** Skeleton type: `card`, `list-row`. */
export type SkeletonType = "card" | "list-row";

/** Props of the `Skeleton` component. */
export type SkeletonProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Variant of the element (button type or cell type). */
  type: SkeletonType;
};

/** Props of a single placeholder bar. */
export type BoneProps = {
  /** Stylesheet class that sizes and positions the bar. */
  shape: string;
};
