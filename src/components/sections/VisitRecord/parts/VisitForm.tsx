import type { VisitFormProps } from "../VisitRecord.types";
import { preventSubmit } from "../VisitRecord.utils";
import { ExamFields } from "./ExamFields";
import { NotesFields } from "./NotesFields";
import { VaccinationCard } from "./VaccinationCard";
import { VisitExtras } from "./VisitExtras";
import { VisitHeader } from "./VisitHeader";
import { VitalsFields } from "./VitalsFields";
import styles from "../VisitRecord.module.scss";

/**
 * Form of the visit: header, reason and measurements, exam, the vaccination given, the buttons that add more, and the notes.
 *
 * @param props Props of the component, see {@link VisitFormProps}.
 * @param props.form State of the form.
 * @param props.visit Visit of the record.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function VisitForm({ form, visit, patient }: VisitFormProps) {
  return (
    <form className={styles.form} onSubmit={preventSubmit}>
      <VisitHeader visit={visit} patient={patient} />
      <VitalsFields bind={form.bind} lastWeight={visit.lastWeight} />
      <ExamFields bind={form.bind} />
      {form.vaccinating && <VaccinationCard values={form.values} setValue={form.setValue} removeVaccine={form.removeVaccine} lot={visit.lot} />}
      <VisitExtras vaccinating={form.vaccinating} onAddVaccine={form.addVaccine} />
      <NotesFields bind={form.bind} />
    </form>
  );
}
