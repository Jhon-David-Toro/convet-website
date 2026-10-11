import type { ProductToolbarProps } from "../ProductCatalog.types";
import { productCountLabel } from "../ProductCatalog.utils";
import { KindChips } from "./KindChips";
import styles from "../ProductCatalog.module.scss";

/**
 * Kind chips on the left and the number of matching products on the right.
 *
 * @param props Props of the component, see {@link ProductToolbarProps}.
 * @param props.total Number of products that match the filters.
 * @param props.chips Selected kinds, counts and the selection handler, forwarded to the chips.
 * @returns The rendered element.
 */
export function ProductToolbar({ total, ...chips }: ProductToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <KindChips {...chips} />
      <p className={styles.count} aria-live="polite">
        {productCountLabel(total)}
      </p>
    </div>
  );
}
