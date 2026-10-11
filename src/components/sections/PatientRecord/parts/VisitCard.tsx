import { Badge } from "@/components/ui/Badge";
import { Lock } from "@/components/ui/Icon";

import { SIGNED_LABEL } from "../PatientRecord.constants";
import styles from "../PatientRecord.module.scss";
import type { VisitCardProps } from "../PatientRecord.types";
import { ClinicalFields } from "./ClinicalFields";
import { VisitNotes } from "./VisitNotes";
import { Vitals } from "./Vitals";

/**
 * A signed visit: title, measurements, findings, diagnosis and plan, the internal notes and the summary the owner sees.
 *
 * @param props Props of the component, see {@link VisitCardProps}.
 * @param props.visit Visit to show.
 * @returns The rendered element.
 */
export function VisitCard({ visit }: VisitCardProps) {
  return (
    <article className={styles.visit}>
      <header className={styles.visitHeader}>
        <h2 className={styles.visitTitle}>{visit.title}</h2>
        <Badge tone="success" icon={Lock}>
          {SIGNED_LABEL}
        </Badge>
      </header>
      <p className={styles.visitMeta}>{visit.meta}</p>
      <Vitals vitals={visit.vitals} />
      <ClinicalFields visit={visit} />
      <VisitNotes visit={visit} />
    </article>
  );
}
