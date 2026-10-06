import type { ComponentPropsWithRef } from "react";

/** Props of the `CarouselControls` component. */
export type CarouselControlsProps = ComponentPropsWithRef<"div"> & {
  /** Number of slides. */
  count: number;
  /** Current slide (0-based). */
  index: number;
  /** Called when the user goes to the previous item. */
  onPrevious: () => void;
  /** Called when the user goes to the next item. */
  onNext: () => void;
};

/** Props of the row of indicators. */
export type CarouselIndicatorsProps = Pick<CarouselControlsProps, "count" | "index">;

/** Props of the previous / next arrows. */
export type CarouselArrowsProps = Pick<CarouselControlsProps, "count" | "index" | "onPrevious" | "onNext">;
