import { Badge } from "@/components/ui/Badge";

import { STATUS_BADGES } from "../StaffInventory.constants";
import type { InventoryStatusBadgeProps } from "../StaffInventory.types";

/**
 * Badge with the stock status of a product: its icon and text, never color alone.
 *
 * @param props Props of the component, see {@link InventoryStatusBadgeProps}.
 * @param props.status Stock status.
 * @param props.statusLabel Text of the badge.
 * @returns The rendered element.
 */
export function InventoryStatusBadge({ status, statusLabel }: InventoryStatusBadgeProps) {
  const { tone, icon } = STATUS_BADGES[status];

  return (
    <Badge tone={tone} icon={icon}>
      {statusLabel}
    </Badge>
  );
}
