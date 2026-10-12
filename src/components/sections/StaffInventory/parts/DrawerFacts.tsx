import { UUID_LABEL } from "../StaffInventory.constants";
import type { DrawerProductProps } from "../StaffInventory.types";
import styles from "../StaffInventory.module.scss";

/**
 * Facts of a product in the side panel: unit, minimum, prescription and storage, and the internal id.
 *
 * @param props Props of the component, see {@link DrawerProductProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function DrawerFacts({ product }: DrawerProductProps) {
  const facts = [
    { label: "Unit", value: product.unitName },
    { label: "Minimum", value: product.minimum },
    { label: "Prescription", value: product.prescription },
    { label: "Storage", value: product.storage },
  ];

  return (
    <div className={styles.facts}>
      <dl className={styles.factList}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.fact}>
        <p className={styles.factLabel}>{UUID_LABEL}</p>
        <p className={styles.uuid}>{product.uuid}</p>
      </div>
    </div>
  );
}
