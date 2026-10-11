import type { LineFieldsProps } from "../ReceiveStock.types";
import { LineProductFields } from "./LineProductFields";
import { LineStockFields } from "./LineStockFields";
import styles from "../ReceiveStock.module.scss";

/**
 * Fields of a line: the product, the lot number, the expiry, the quantity and the remove button.
 *
 * @param props Props of the component, see {@link LineFieldsProps}.
 * @param props.line Line of the receipt.
 * @param props.error Problem with the expiry, if there is one.
 * @param props.onChange Changes values of the line.
 * @param props.onRemove Removes the line.
 * @returns The rendered element.
 */
export function LineFields({ line, error, onChange, onRemove }: LineFieldsProps) {
  return (
    <div className={styles.fields}>
      <LineProductFields line={line} onChange={onChange} />
      <LineStockFields line={line} error={error} onChange={onChange} onRemove={onRemove} />
    </div>
  );
}
