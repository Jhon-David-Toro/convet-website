import type { ComponentPropsWithRef } from "react";

export type SkeletonType = "card" | "list-row";

export type SkeletonProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  type: SkeletonType;
};

export type BoneProps = {
  shape: string;
};
