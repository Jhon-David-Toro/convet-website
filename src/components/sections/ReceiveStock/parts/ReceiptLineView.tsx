import styles from "../ReceiveStock.module.scss";
import type { ReceiptLineViewProps } from "../ReceiveStock.types";
import { LineFields } from "./LineFields";
import { ProductMatches } from "./ProductMatches";

/**
 * A line of the receipt: the product with its similar ones, and the fields of the line.
 *
 * @param props Props of the component, see {@link ReceiptLineViewProps}.
 * @param props.line Line of the receipt.
 * @param props.error Problem with the expiry, if there is one.
 * @param props.onChange Changes values of the line.
 * @param props.onRemove Removes the line.
 * @returns The rendered element.
 */
export function ReceiptLineView({ line, error, onChange, onRemove }: ReceiptLineViewProps) {
  return (
    <li className={styles.line}>
      <ProductMatches line={line} onPick={(productId) => onChange({ productId })} />
      <LineFields line={line} error={error} onChange={onChange} onRemove={onRemove} />
    </li>
  );
}
