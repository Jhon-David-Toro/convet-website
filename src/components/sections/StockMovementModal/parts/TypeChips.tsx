import { Chip } from "@/components/ui/Chip";

import styles from "../StockMovementModal.module.scss";
import { TYPE_LABEL, TYPE_OPTIONS } from "../StockMovementModal.constants";
import type { TypeChipsProps } from "../StockMovementModal.types";

/**
 * Chips that pick the type of movement: clinical use, waste, expired or adjustment.
 *
 * @param props Props of the component, see {@link TypeChipsProps}.
 * @param props.values Values of the form.
 * @param props.setValue Changes one value of the form.
 * @returns The rendered element.
 */
export function TypeChips({ values, setValue }: TypeChipsProps) {
  return (
    <div className={styles.group}>
      <p className={styles.label}>{TYPE_LABEL}</p>
      <div role="group" aria-label={TYPE_LABEL} className={styles.chips}>
        {TYPE_OPTIONS.map(({ value, label }) => (
          <Chip key={value} selected={values.type === value} onClick={() => setValue("type", value)}>
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
