import { Textarea } from "@/components/ui/Textarea";

import { DIAGNOSIS_LABEL, FINDINGS_LABEL, PLAN_LABEL } from "../VisitRecord.constants";
import type { VisitFieldsProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Clinical text of the visit: the exam findings, the diagnosis and the plan.
 *
 * @param props Props of the component, see {@link VisitFieldsProps}.
 * @param props.bind Gives the value and change handler of a field.
 * @returns The rendered element.
 */
export function ExamFields({ bind }: VisitFieldsProps) {
  return (
    <>
      <Textarea label={FINDINGS_LABEL} {...bind("findings")} />
      <div className={styles.pair}>
        <Textarea label={DIAGNOSIS_LABEL} {...bind("diagnosis")} />
        <Textarea label={PLAN_LABEL} {...bind("plan")} />
      </div>
    </>
  );
}
