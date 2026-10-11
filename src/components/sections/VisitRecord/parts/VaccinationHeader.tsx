import { Button } from "@/components/ui/Button";
import { Icon, Syringe, Trash } from "@/components/ui/Icon";

import { REMOVE_LABEL, VACCINATION_TITLE } from "../VisitRecord.constants";
import type { VaccinationHeaderProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Title of the vaccination card and the button that removes the vaccination from the visit.
 *
 * @param props Props of the component, see {@link VaccinationHeaderProps}.
 * @param props.removeVaccine Removes the vaccination from the visit.
 * @returns The rendered element.
 */
export function VaccinationHeader({ removeVaccine }: VaccinationHeaderProps) {
  return (
    <header className={styles.vaccinationHeader}>
      <h2 id="visit-vaccination" className={styles.vaccinationTitle}>
        <Icon icon={Syringe} tone="brand" />
        {VACCINATION_TITLE}
      </h2>
      <Button type="button" variant="tertiary" size="small" leadingIcon={Trash} onClick={removeVaccine}>
        {REMOVE_LABEL}
      </Button>
    </header>
  );
}
