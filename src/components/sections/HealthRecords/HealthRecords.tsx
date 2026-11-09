"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, Info, Paw } from "@/components/ui/Icon";
import { CUSTOMER_PETS } from "@/lib/customer/customer.constants";
import { HEALTH_RECORDS } from "@/lib/customer/customer.records.constants";

import { DEFAULT_PET_ID, LOAD_ERROR_TITLE, NO_PETS_TEXT, NO_PETS_TITLE, SAMPLE_NOTE, SUBTITLE, TITLE } from "./HealthRecords.constants";
import type { HealthRecordsProps } from "./HealthRecords.types";
import { useHealthRecords } from "./hooks/useHealthRecords";
import { PetSwitch } from "./parts/PetSwitch";
import { RecordBody } from "./parts/RecordBody";
import styles from "./HealthRecords.module.scss";

/**
 * Health records page: the pet switch, the summary of the selected pet, its stats, history, treatments and diagnoses. Without
 * `pets` it shows the sample records of the design.
 *
 * @param props Props of the component, see {@link HealthRecordsProps}.
 * @param props.pets Pets of the customer from the backend.
 * @param props.records One health record per pet from the backend.
 * @param props.loadError Message shown when the records could not be loaded.
 * @returns The rendered element.
 */
export function HealthRecords({ pets, records, loadError }: HealthRecordsProps) {
  const sample = !pets;
  const { pet, record, selectPet } = useHealthRecords(pets ?? CUSTOMER_PETS, records ?? HEALTH_RECORDS, sample ? DEFAULT_PET_ID : undefined);

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      {loadError && (
        <Alert tone="error" title={LOAD_ERROR_TITLE}>
          {loadError}
        </Alert>
      )}
      {!loadError && !pet && <EmptyState icon={Paw} title={NO_PETS_TITLE} message={NO_PETS_TEXT} />}
      {pet && <PetSwitch pets={pets ?? CUSTOMER_PETS} selectedId={pet.id} onSelect={selectPet} />}
      {sample && (
        <p className={styles.sample}>
          <Icon icon={Info} size="small" tone="tertiary" />
          {SAMPLE_NOTE}
        </p>
      )}
      {pet && record && <RecordBody pet={pet} record={record} />}
    </PageStack>
  );
}
