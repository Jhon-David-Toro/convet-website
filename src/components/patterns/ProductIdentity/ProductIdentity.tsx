import { Badge } from "@/components/ui/Badge";
import { Check, CheckCircle, Icon, Pill } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./ProductIdentity.module.scss";
import { ProductText } from "./parts/ProductText";
import { PRODUCT_SELECTED_ICON_SIZE, PRODUCT_THUMB_ICON_SIZE } from "./ProductIdentity.constants";
import type { ProductIdentityProps } from "./ProductIdentity.types";

/**
 * Inventory/Product Identity: product identified by name, SKU and UUID. Chosen like a selection button.
 *
 * @param props Props of the component, see {@link ProductIdentityProps}.
 * @param props.name Name to show.
 * @param props.kind Product type, e.g. "Medication".
 * @param props.presentation Presentation, e.g. "Tablets · 50 mg · box of 14 · Pain & inflammation".
 * @param props.sku Stock keeping unit of the product.
 * @param props.uuid Short identifier, e.g. "2c8e…91fa".
 * @param props.stock Stock level, e.g. "In stock · 42".
 * @param props.selected Whether the item is selected.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ProductIdentity({ name, kind, presentation, sku, uuid, stock, selected = false, className, ...rest }: ProductIdentityProps) {
  return (
    <button type="button" aria-pressed={selected} {...rest} className={cx(styles.card, selected && styles.selected, className)}>
      <span className={styles.thumb} aria-hidden="true">
        <Icon icon={Pill} size={PRODUCT_THUMB_ICON_SIZE} tone="brand" />
      </span>
      <ProductText name={name} kind={kind} presentation={presentation} sku={sku} uuid={uuid} />
      <Badge tone="success" icon={Check} iconTone="primary">
        {stock}
      </Badge>
      {selected && <Icon icon={CheckCircle} size={PRODUCT_SELECTED_ICON_SIZE} tone="brand" />}
    </button>
  );
}
