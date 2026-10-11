import { TextInput } from "@/components/ui/TextInput";

import { HEART_RATE_LABEL, REASON_LABEL, TEMPERATURE_LABEL, WEIGHT_LABEL } from "../VisitRecord.constants";
import type { VitalsFieldsProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Reason for the visit and the three measurements: weight (with the last one as a reference), temperature and heart rate.
 *
 * @param props Props of the component, see {@link VitalsFieldsProps}.
 * @param props.bind Gives the value and change handler of a field.
 * @param props.lastWeight Reference of the previous weight.
 * @returns The rendered element.
 */
export function VitalsFields({ bind, lastWeight }: VitalsFieldsProps) {
  return (
    <>
      <TextInput label={REASON_LABEL} {...bind("reason")} />
      <div className={styles.vitals}>
        <TextInput label={WEIGHT_LABEL} inputMode="decimal" helper={lastWeight} {...bind("weight")} />
        <TextInput label={TEMPERATURE_LABEL} inputMode="decimal" {...bind("temperature")} />
        <TextInput label={HEART_RATE_LABEL} optional inputMode="numeric" placeholder="—" {...bind("heartRate")} />
      </div>
    </>
  );
}
