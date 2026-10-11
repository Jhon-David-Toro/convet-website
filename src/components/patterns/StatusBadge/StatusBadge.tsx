import { Badge } from "@/components/ui/Badge";

import type { StatusBadgeProps } from "./StatusBadge.types";

/**
 * Status/Badge: the state of a record (stock, account, role…) as a badge with its icon and label, never color alone.
 *
 * @param props Props of the component, see {@link StatusBadgeProps}.
 * @param props.view Tone, icon and label of the state.
 * @param props.rest Remaining properties, forwarded to the badge.
 * @returns The rendered element.
 */
export function StatusBadge({ view, ...rest }: StatusBadgeProps) {
  return (
    <Badge {...rest} tone={view.tone} icon={view.icon}>
      {view.label}
    </Badge>
  );
}
