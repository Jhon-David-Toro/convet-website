import { CLINICAL_FIELDS } from "../PatientRecord.constants";
import type { ClinicalFieldsProps } from "../PatientRecord.types";
import { ClinicalField } from "./ClinicalField";

/**
 * Findings, diagnosis and plan of a visit.
 *
 * @param props Props of the component, see {@link ClinicalFieldsProps}.
 * @param props.visit Visit to show.
 * @returns The rendered element.
 */
export function ClinicalFields({ visit }: ClinicalFieldsProps) {
  return (
    <>
      {CLINICAL_FIELDS.map(({ key, label }) => (
        <ClinicalField key={key} label={label} text={visit[key]} />
      ))}
    </>
  );
}
