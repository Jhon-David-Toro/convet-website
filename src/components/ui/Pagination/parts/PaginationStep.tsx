import { ChevronLeft, ChevronRight } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { PREVIOUS_DIRECTION } from "../Pagination.constants";
import type { PaginationStepProps } from "../Pagination.types";
import { getStepAction } from "../Pagination.utils";

/**
 * Previous / next page button.
 *
 * @param props Props of the component, see {@link PaginationStepProps}.
 * @param props.direction Direction of the button: `"previous"` or `"next"`.
 * @param props.action Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PaginationStep({ direction, ...action }: PaginationStepProps) {
  const isPrevious = direction === PREVIOUS_DIRECTION;

  return (
    <IconButton
      icon={isPrevious ? ChevronLeft : ChevronRight}
      label={isPrevious ? "Previous page" : "Next page"}
      variant="outline"
      {...getStepAction(action)}
    />
  );
}
