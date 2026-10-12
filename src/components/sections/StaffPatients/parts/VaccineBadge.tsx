import { Badge } from "@/components/ui/Badge";

import { VACCINE_BADGES } from "../StaffPatients.constants";
import type { VaccineBadgeProps } from "../StaffPatients.types";

/**
 * Badge with the vaccination status of a patient: its text and, when it asks for attention, an icon, never color alone.
 *
 * @param props Props of the component, see {@link VaccineBadgeProps}.
 * @param props.vaccine Vaccination status.
 * @param props.vaccineLabel Text of the badge.
 * @returns The rendered element.
 */
export function VaccineBadge({ vaccine, vaccineLabel }: VaccineBadgeProps) {
  const { tone, icon } = VACCINE_BADGES[vaccine];

  return (
    <Badge tone={tone} icon={icon}>
      {vaccineLabel}
    </Badge>
  );
}
