"use client";

import { useState } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import styles from "./PatientRecord.module.scss";
import type { PatientRecordProps, PatientTab } from "./PatientRecord.types";
import { patientCrumbs } from "./PatientRecord.utils";
import { PatientHeader } from "./parts/PatientHeader";
import { PatientPanel } from "./parts/PatientPanel";
import { PatientSide } from "./parts/PatientSide";
import { PatientTabs } from "./parts/PatientTabs";

/**
 * Patient record of the staff area: the patient card, the tabs of the clinical history, and the owner and the vaccines on the side.
 *
 * @param props Props of the component, see {@link PatientRecordProps}.
 * @param props.patient Patient of the record.
 * @returns The rendered element.
 */
export function PatientRecord({ patient }: PatientRecordProps) {
  const [tab, setTab] = useState<PatientTab>("visits");

  return (
    <div className={styles.page}>
      <Breadcrumbs items={patientCrumbs(patient)} />
      <PatientHeader patient={patient} />
      <div className={styles.layout}>
        <div className={styles.main}>
          <PatientTabs tab={tab} onChange={setTab} />
          <PatientPanel tab={tab} />
        </div>
        <PatientSide />
      </div>
    </div>
  );
}
