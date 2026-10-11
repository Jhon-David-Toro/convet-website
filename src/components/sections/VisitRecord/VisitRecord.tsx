"use client";

import type { VisitRecordProps } from "./VisitRecord.types";
import { useVisitForm } from "./hooks/useVisitForm";
import { VisitFooter } from "./parts/VisitFooter";
import { VisitForm } from "./parts/VisitForm";
import { VisitSide } from "./parts/VisitSide";
import styles from "./VisitRecord.module.scss";

/**
 * Visit record of the staff area: the form the vet fills in during the visit, the patient next to it on desktop,
 * and a bar fixed to the bottom to save a draft or sign.
 *
 * @param props Props of the component, see {@link VisitRecordProps}.
 * @param props.visit Visit of the record.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function VisitRecord({ visit, patient }: VisitRecordProps) {
  const form = useVisitForm({ visit });

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <VisitForm form={form} visit={visit} patient={patient} />
        <VisitSide visit={visit} patient={patient} />
      </div>
      <VisitFooter draftSaved={visit.draftSaved} saveDraft={form.saveDraft} finish={form.finish} />
    </div>
  );
}
