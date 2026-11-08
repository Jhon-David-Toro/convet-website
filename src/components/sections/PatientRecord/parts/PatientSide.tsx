import { STAFF_OWNER } from "@/lib/staff/staff.constants";

import type { PatientSideProps } from "../PatientRecord.types";
import { OwnerCard } from "./OwnerCard";
import { VaccinesCard } from "./VaccinesCard";
import styles from "../PatientRecord.module.scss";

/**
 * Side column of the record: the owner and the vaccines. The backend does not give the clinic either of them yet, so a record that
 * comes from the backend leaves them out instead of showing sample data.
 *
 * @param props Props of the component, see {@link PatientSideProps}.
 * @param props.connected Whether the record comes from the backend.
 * @returns The rendered element, or nothing for a backend record.
 */
export function PatientSide({ connected = false }: PatientSideProps) {
  if (connected) return null;
  return (
    <aside className={styles.side}>
      <OwnerCard owner={STAFF_OWNER} />
      <VaccinesCard />
    </aside>
  );
}
