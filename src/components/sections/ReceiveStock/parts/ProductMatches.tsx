import { SIMILAR_NOTE } from "../ReceiveStock.constants";
import type { ProductMatchesProps } from "../ReceiveStock.types";
import { findCatalogProduct, similarProducts } from "../ReceiveStock.utils";
import { ProductChoice } from "./ProductChoice";
import styles from "../ReceiveStock.module.scss";

/**
 * The product of a line as a card. When the catalog has similar products (other strengths of the same medication) they are listed with it,
 * with a note to check strength and pack before choosing.
 *
 * @param props Props of the component, see {@link ProductMatchesProps}.
 * @param props.line Line of the receipt.
 * @param props.onPick Called with the id of the product the user picked.
 * @returns The rendered element.
 */
export function ProductMatches({ line, onPick }: ProductMatchesProps) {
  const matches = similarProducts(line.productId);
  const chosen = findCatalogProduct(line.productId);
  const showAll = matches.length > 1;

  return (
    <div className={styles.matches}>
      {showAll && <p className={styles.similarNote}>{`${matches.length} ${SIMILAR_NOTE}`}</p>}
      {(showAll ? matches : [chosen]).map((product) => (
        <ProductChoice key={product.id} product={product} name={line.id} checked={product.id === chosen.id} onPick={onPick} />
      ))}
    </div>
  );
}
