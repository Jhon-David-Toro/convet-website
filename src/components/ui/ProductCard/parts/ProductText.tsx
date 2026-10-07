import styles from "../ProductCard.module.scss";
import type { ProductTextProps } from "../ProductCard.types";

/**
 * Category, name and description of the product.
 *
 * @param props Props of the component, see {@link ProductTextProps}.
 * @param props.category Category of the product.
 * @param props.name Name to show.
 * @param props.description Description text under the title.
 * @returns The rendered element.
 */
export function ProductText({ category, name, description }: ProductTextProps) {
  return (
    <>
      <p className={styles.category}>{category}</p>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </>
  );
}
