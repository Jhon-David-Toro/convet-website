import { Radio } from "@/components/ui/Radio";

import { SEX_OPTIONS } from "../MyPets.constants";
import type { SexFieldProps } from "../MyPets.types";
import styles from "../MyPets.module.scss";

/**
 * Sex of the pet as a group of radio buttons.
 *
 * @param props Props of the component, see {@link SexFieldProps}.
 * @param props.values Current values.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SexField({ values, setValue }: SexFieldProps) {
  return (
    <fieldset className={styles.sex}>
      <legend className={styles.legend}>Sex</legend>
      <div className={styles.options}>
        {SEX_OPTIONS.map(({ value, label }) => (
          <Radio key={value} name="sex" label={label} checked={values.sex === value} onChange={() => setValue("sex", value)} />
        ))}
      </div>
    </fieldset>
  );
}
