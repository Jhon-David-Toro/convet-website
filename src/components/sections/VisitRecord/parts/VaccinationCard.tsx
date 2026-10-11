import { DateInput } from "@/components/ui/DateInput";
import { Select } from "@/components/ui/Select";

import { NEXT_DOSE_LABEL, VACCINE_LABEL, VACCINE_OPTIONS } from "../VisitRecord.constants";
import styles from "../VisitRecord.module.scss";
import type { VaccinationCardProps } from "../VisitRecord.types";
import { LotPicker } from "./LotPicker";
import { VaccinationHeader } from "./VaccinationHeader";

/**
 * Vaccine given during the visit: which vaccine, when the next dose is due and the lot used. It can be removed from the visit.
 *
 * @param props Props of the component, see {@link VaccinationCardProps}.
 * @param props.values Current values of the form.
 * @param props.setValue Changes the value of a field.
 * @param props.removeVaccine Removes the vaccination from the visit.
 * @param props.lot Suggested lot.
 * @param props.expiredLot Code of a lot that is expired.
 * @returns The rendered element.
 */
export function VaccinationCard({ values, setValue, removeVaccine, lot, expiredLot }: VaccinationCardProps) {
  return (
    <section className={styles.vaccination} aria-labelledby="visit-vaccination">
      <VaccinationHeader removeVaccine={removeVaccine} />
      <div className={styles.pair}>
        <Select label={VACCINE_LABEL} options={VACCINE_OPTIONS} value={values.vaccine} onValueChange={(value) => setValue("vaccine", value)} />
        <DateInput label={NEXT_DOSE_LABEL} value={values.nextDose} onValueChange={(value) => setValue("nextDose", value)} />
      </div>
      <LotPicker lot={lot} expiredLot={expiredLot} />
    </section>
  );
}
