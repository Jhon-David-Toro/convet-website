import { Icon } from "@/components/ui/Icon";

import { VITALS } from "../PatientRecord.constants";
import type { VitalsProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * The three measurements of a visit: weight, temperature and heart rate.
 *
 * @param props Props of the component, see {@link VitalsProps}.
 * @param props.vitals Measurements of the visit.
 * @returns The rendered element.
 */
export function Vitals({ vitals }: VitalsProps) {
  return (
    <dl className={styles.vitals}>
      {VITALS.map(({ key, label, icon }) => (
        <div key={key} className={styles.vital}>
          <Icon icon={icon} tone="brand" />
          <div>
            <dt>{label}</dt>
            <dd>{vitals[key]}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
