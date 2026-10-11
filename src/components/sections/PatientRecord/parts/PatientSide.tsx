import { STAFF_OWNER } from "@/lib/staff/staff.constants";

import { OwnerCard } from "./OwnerCard";
import { VaccinesCard } from "./VaccinesCard";
import styles from "../PatientRecord.module.scss";

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
