import { DateInput } from "@/components/ui/DateInput";
import { Trash } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { TextInput } from "@/components/ui/TextInput";

import { EXPIRY_LABEL, QUANTITY_LABEL, REMOVE_LINE_LABEL } from "../ReceiveStock.constants";
import type { LineStockFieldsProps } from "../ReceiveStock.types";
import styles from "../ReceiveStock.module.scss";

/**
 * Expiry (with the error when it already passed), quantity and the remove button of a line.
 *
 * @param props Props of the component, see {@link LineStockFieldsProps}.
 * @param props.line Line of the receipt.
 * @param props.error Problem with the expiry, if there is one.
 * @param props.onChange Changes values of the line.
 * @param props.onRemove Removes the line.
 * @returns The rendered element.
 */
export function LineStockFields({ line, error, onChange, onRemove }: LineStockFieldsProps) {
  return (
    <>
      <DateInput label={EXPIRY_LABEL} value={line.expiry} error={error} onValueChange={(expiry) => onChange({ expiry })} />
      <TextInput label={QUANTITY_LABEL} value={line.quantity} onChange={(event) => onChange({ quantity: event.target.value })} />
      <IconButton variant="ghost" icon={Trash} label={REMOVE_LINE_LABEL} onClick={onRemove} className={styles.remove} />
    </>
  );
}
