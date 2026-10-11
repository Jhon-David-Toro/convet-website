import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "@/components/ui/Icon";

import { OVERDUE_BADGE, VACCINATION_TITLE } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { VaccinationHeaderProps } from "../PetProfile.types";

/**
 * Title of the vaccination card with a badge that counts the overdue vaccines (hidden on mobile).
 *
 * @param props Props of the component, see {@link VaccinationHeaderProps}.
 * @param props.overdue Number of overdue vaccines.
 * @returns The rendered element.
 */
export function VaccinationHeader({ overdue }: VaccinationHeaderProps) {
  return (
    <div className={styles.cardHeader}>
      <h2 id="vaccination-card" className={styles.cardTitle}>
        {VACCINATION_TITLE}
      </h2>
      {overdue > 0 && (
        <Badge tone="error" icon={AlertTriangle}>
          {`${overdue} ${OVERDUE_BADGE}`}
        </Badge>
      )}
    </div>
  );
}
