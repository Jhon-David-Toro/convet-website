import { Button } from "@/components/ui/Button";
import { Pill, Syringe, Upload } from "@/components/ui/Icon";

import { ADD_TREATMENT_LABEL, ADD_VACCINE_LABEL, ATTACH_FILE_LABEL } from "../VisitRecord.constants";
import styles from "../VisitRecord.module.scss";
import type { ExtrasProps } from "../VisitRecord.types";

/**
 * Buttons that add more to the visit: a vaccination (once it was removed), a treatment and a file.
 *
 * @param props Props of the component, see {@link ExtrasProps}.
 * @param props.vaccinating Whether a vaccination is already part of the visit.
 * @param props.onAddVaccine Adds a vaccination to the visit.
 * @returns The rendered element.
 */
export function VisitExtras({ vaccinating, onAddVaccine }: ExtrasProps) {
  return (
    <div className={styles.extras}>
      {!vaccinating && (
        <Button type="button" variant="secondary" size="small" leadingIcon={Syringe} onClick={onAddVaccine}>
          {ADD_VACCINE_LABEL}
        </Button>
      )}
      <Button type="button" variant="secondary" size="small" leadingIcon={Pill}>
        {ADD_TREATMENT_LABEL}
      </Button>
      <Button type="button" variant="secondary" size="small" leadingIcon={Upload}>
        {ATTACH_FILE_LABEL}
      </Button>
    </div>
  );
}
