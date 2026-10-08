import { Badge } from "@/components/ui/Badge";

import type { PetVaccineBadgeProps } from "../PetCard.types";

/**
 * Badge with the vaccination status of the pet.
 *
 * @param props Props of the component, see {@link PetVaccineBadgeProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @returns The rendered element.
 */
export function PetVaccineBadge({ status }: PetVaccineBadgeProps) {
  return (
    <Badge tone={status.tone} icon={status.icon}>
      {status.label}
    </Badge>
  );
}
