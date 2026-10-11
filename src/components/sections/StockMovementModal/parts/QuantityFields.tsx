import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";

import styles from "../StockMovementModal.module.scss";
import { ADJUSTMENT_TYPE, DIRECTION_LABEL, DIRECTION_OPTIONS, QUANTITY_LABEL } from "../StockMovementModal.constants";
import type { QuantityFieldsProps } from "../StockMovementModal.types";

/**
 * Direction (remove or add) and quantity of the movement, with the balance that would be left. Only adjustments can add stock.
 *
 * @param props Props of the component, see {@link QuantityFieldsProps}.
 * @param props.values Values of the form.
 * @param props.setValue Changes one value of the form.
 * @param props.balance Balance after the movement.
 * @param props.quantityError Problem with the quantity, if there is one.
 * @returns The rendered element.
 */
export function QuantityFields({ values, setValue, balance, quantityError }: QuantityFieldsProps) {
  return (
    <div className={styles.pair}>
      <Select
        label={DIRECTION_LABEL}
        options={DIRECTION_OPTIONS}
        value={values.direction}
        disabled={values.type !== ADJUSTMENT_TYPE}
        onValueChange={(value) => setValue("direction", value === "add" ? "add" : "remove")}
      />
      <TextInput
        label={QUANTITY_LABEL}
        inputMode="numeric"
        value={values.quantity}
        error={quantityError}
        helper={`New balance: ${balance}`}
        onChange={(event) => setValue("quantity", event.target.value)}
      />
    </div>
  );
}
