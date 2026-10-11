import { DateInput } from "@/components/ui/DateInput";
import { Clock, Icon } from "@/components/ui/Icon";

import { AGE_LABEL, AGE_NOTE, BIRTH_HELPER } from "../MyPets.constants";
import styles from "../MyPets.module.scss";
import type { BirthFieldsProps } from "../MyPets.types";

/**
 * Date of birth and the age that is worked out from it, side by side.
 *
 * @param props Props of the component, see {@link BirthFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @param props.age Age worked out from the date of birth.
 * @returns The rendered element.
 */
export function BirthFields({ values, errors, setValue, age }: BirthFieldsProps) {
  return (
    <div className={styles.birth}>
      <DateInput label="Date of birth" helper={BIRTH_HELPER} value={values.birthDate} error={errors.birthDate} onValueChange={(birthDate) => setValue("birthDate", birthDate)} />
      <div className={styles.age}>
        <span className={styles.ageLabel}>{AGE_LABEL}</span>
        <p className={styles.ageValue}>
          <Icon icon={Clock} tone="secondary" />
          {age}
        </p>
        <span className={styles.ageNote}>{AGE_NOTE}</span>
      </div>
    </div>
  );
}
