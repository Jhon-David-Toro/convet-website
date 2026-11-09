import { Alert } from "@/components/ui/Alert";

import { INFO_TEXT, INFO_TITLE } from "../HealthRecords.constants";
import type { RecordProps } from "../HealthRecords.types";
import { EmptyRecords } from "./EmptyRecords";
import { RecordDiagnoses } from "./RecordDiagnoses";
import { RecordHistory } from "./RecordHistory";
import { RecordMedications } from "./RecordMedications";
import { RecordStats } from "./RecordStats";
import { RecordSummary } from "./RecordSummary";
import styles from "../HealthRecords.module.scss";

/**
 * Record of the selected pet: its summary and, when it has visits, the stats, the history and the side cards; otherwise the empty state.
 *
 * @param props Props of the component, see {@link RecordProps}.
 * @param props.pet Selected pet.
 * @param props.record Its health record.
 * @returns The rendered element.
 */
export function RecordBody({ pet, record }: RecordProps) {
  return (
    <>
      <RecordSummary pet={pet} record={record} />
      {record.events.length > 0 ? (
        <>
          <RecordStats record={record} />
          <div className={styles.columns}>
            <RecordHistory key={pet.id} events={record.events} />
            <div className={styles.side}>
              <RecordMedications record={record} />
              <RecordDiagnoses record={record} />
              <Alert tone="info" title={INFO_TITLE}>
                {INFO_TEXT}
              </Alert>
            </div>
          </div>
        </>
      ) : (
        <EmptyRecords record={record} />
      )}
    </>
  );
}
