import { Button } from "@/components/ui/Button";
import { File } from "@/components/ui/Icon";

import { CERTIFICATE_LABEL } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { VaccinationCardProps } from "../PetProfile.types";
import { overdueCount } from "../PetProfile.utils";
import { VaccinationHeader } from "./VaccinationHeader";
import { VaccineList } from "./VaccineList";
import { VaccineStamps } from "./VaccineStamps";

/**
 * Vaccination card: the stamps, one row per vaccine with its status and the (not yet available) certificate download.
 *
 * @param props Props of the component, see {@link VaccinationCardProps}.
 * @param props.vaccines Vaccines of the pet.
 * @returns The rendered element.
 */
export function VaccinationCard({ vaccines }: VaccinationCardProps) {
  return (
    <section className={styles.card} aria-labelledby="vaccination-card">
      <VaccinationHeader overdue={overdueCount(vaccines)} />
      <VaccineStamps vaccines={vaccines} />
      <VaccineList vaccines={vaccines} />
      <Button variant="secondary" size="small" leadingIcon={File} disabled className={styles.certificate}>
        {CERTIFICATE_LABEL}
      </Button>
    </section>
  );
}
