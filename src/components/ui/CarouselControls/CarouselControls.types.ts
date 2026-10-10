import type { ComponentPropsWithRef } from "react";

export type CarouselControlsProps = ComponentPropsWithRef<"div"> & {
  count: number;
  index: number;
  onPrevious: () => void;
  onNext: () => void;
};

export type CarouselIndicatorsProps = Pick<CarouselControlsProps, "count" | "index">;

export type CarouselArrowsProps = Pick<CarouselControlsProps, "count" | "index" | "onPrevious" | "onNext">;
