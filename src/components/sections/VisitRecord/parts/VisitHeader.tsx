import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Stethoscope } from "@/components/ui/Icon";

import { IN_PROGRESS_LABEL, TITLE_PREFIX } from "../VisitRecord.constants";
import type { VisitHeaderProps } from "../VisitRecord.types";
import { visitTitle } from "../VisitRecord.utils";
import styles from "../VisitRecord.module.scss";

/**
 * Top of the visit form: the kind of visit, the time and the vet, the title with the patient, its status, and the allergy alert.
 *
 * @param props Props of the component, see {@link VisitHeaderProps}.
 * @param props.visit Visit of the record.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function VisitHeader({ visit, patient }: VisitHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.overline}>{visit.headline}</p>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{visitTitle(TITLE_PREFIX, patient.name)}</h1>
        <Badge tone="info" icon={Stethoscope}>
          {IN_PROGRESS_LABEL}
        </Badge>
      </div>
      <Alert tone="error" title={patient.allergy} />
    </header>
  );
}
