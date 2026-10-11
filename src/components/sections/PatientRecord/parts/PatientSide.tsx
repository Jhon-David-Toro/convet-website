import { STAFF_OWNER } from "@/lib/staff/staff.constants";

import styles from "../PatientRecord.module.scss";
import { OwnerCard } from "./OwnerCard";
import { VaccinesCard } from "./VaccinesCard";

/**
 * Column next to the history: the owner and the vaccines of the patient.
 *
 * @returns The rendered element.
 */
export function PatientSide() {
  return (
    <aside className={styles.side}>
      <OwnerCard owner={STAFF_OWNER} />
      <VaccinesCard />
    </aside>
  );
}
