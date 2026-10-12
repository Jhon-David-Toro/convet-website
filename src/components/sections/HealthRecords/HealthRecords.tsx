"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { Icon, Info } from "@/components/ui/Icon";

import { INFO_TEXT, INFO_TITLE, SAMPLE_NOTE, SUBTITLE, TITLE } from "./HealthRecords.constants";
import { useHealthRecords } from "./hooks/useHealthRecords";
import { EmptyRecords } from "./parts/EmptyRecords";
import { PetSwitch } from "./parts/PetSwitch";
import { RecordDiagnoses } from "./parts/RecordDiagnoses";
import { RecordHistory } from "./parts/RecordHistory";
import { RecordMedications } from "./parts/RecordMedications";
import { RecordStats } from "./parts/RecordStats";
import { RecordSummary } from "./parts/RecordSummary";
import styles from "./HealthRecords.module.scss";

/**
 * Health records page of the customer area: the pet switch, the summary of the pet and, when it has records, its figures, clinical history,
 * medications and diagnoses; a pet without records shows what to expect.
 *
 * @returns The rendered element.
 */
export function HealthRecords() {
  const { pet, record, selectPet } = useHealthRecords();
  const hasRecords = record.events.length > 0;

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      <PetSwitch selectedId={pet.id} onSelect={selectPet} />
      <p className={styles.sample}>
        <Icon icon={Info} size="small" tone="tertiary" />
        {SAMPLE_NOTE}
      </p>
      <RecordSummary pet={pet} record={record} />
      {hasRecords ? (
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
    </PageStack>
  );
}
