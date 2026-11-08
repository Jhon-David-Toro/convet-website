"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { RECORDS_ERROR_TITLE } from "./PatientRecord.constants";
import type { PatientRecordProps, PatientTab } from "./PatientRecord.types";
import { patientCrumbs } from "./PatientRecord.utils";
import { PatientHeader } from "./parts/PatientHeader";
import { PatientPanel } from "./parts/PatientPanel";
import { PatientSide } from "./parts/PatientSide";
import { PatientTabs } from "./parts/PatientTabs";
import styles from "./PatientRecord.module.scss";

/**
 * Patient record of the staff area: the patient card, the tabs of the clinical history, and the owner and the vaccines on the side.
 *
 * @param props Props of the component, see {@link PatientRecordProps}.
 * @param props.patient Patient of the record.
 * @param props.record Visits and history from the backend; without it the sample record is shown.
 * @returns The rendered element.
 */
export function PatientRecord({ patient, record }: PatientRecordProps) {
  const [tab, setTab] = useState<PatientTab>("visits");

  return (
    <div className={styles.page}>
      <Breadcrumbs items={patientCrumbs(patient, !record)} />
      <PatientHeader patient={patient} />
      <div className={styles.layout}>
        <div className={styles.main}>
          <PatientTabs tab={tab} onChange={setTab} />
          {record?.recordsError && (
            <Alert tone="error" title={RECORDS_ERROR_TITLE}>
              {record.recordsError}
            </Alert>
          )}
          <PatientPanel tab={tab} record={record} />
        </div>
        <PatientSide connected={Boolean(record)} />
      </div>
    </div>
  );
}
