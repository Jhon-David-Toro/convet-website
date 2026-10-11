import { Icon, Syringe } from "@/components/ui/Icon";

import type { ProductHeaderProps } from "../ProductLots.types";
import { ProductActions } from "./ProductActions";
import styles from "../ProductLots.module.scss";

/**
 * Top of the product page: its icon, the line with category, SKU and UUID, the name, what it is, and the adjust, dispense and receive buttons.
 *
 * @param props Props of the component, see {@link ProductHeaderProps}.
 * @param props.product Product shown.
 * @param props.onAdjust Opens the movement dialog as an adjustment.
 * @param props.onDispense Opens the movement dialog as a clinical use.
 * @returns The rendered element.
 */
export function ProductHeader({ product, onAdjust, onDispense }: ProductHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.icon}>
        <Icon icon={Syringe} size="large" />
      </span>
      <div className={styles.identity}>
        <p className={styles.overline}>{product.overline}</p>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
      </div>
      <ProductActions onAdjust={onAdjust} onDispense={onDispense} />
    </header>
  );
}
