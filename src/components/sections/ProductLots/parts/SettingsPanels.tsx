import { Textarea } from "@/components/ui/Textarea";
import { TextInput } from "@/components/ui/TextInput";
import { Toggle } from "@/components/ui/Toggle";

import styles from "../ProductLots.module.scss";
import { DESCRIPTION_LABEL, MINIMUM_LABEL, PUBLIC_DESCRIPTION, PUBLIC_LABEL, TRACK_LOTS_DESCRIPTION, TRACK_LOTS_LABEL } from "../ProductLots.constants";
import type { ProductLotsProps } from "../ProductLots.types";

/**
 * Public page of the product: whether it is shown on the website and its description.
 *
 * @param props Props of the component, see {@link ProductLotsProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function PublicSettings({ product }: ProductLotsProps) {
  return (
    <div className={styles.card}>
      <Toggle label={PUBLIC_LABEL} description={PUBLIC_DESCRIPTION} defaultChecked />
      <Textarea label={DESCRIPTION_LABEL} defaultValue={product.description} />
    </div>
  );
}

/**
 * Settings of the product: its minimum stock and whether lots and expiry are tracked.
 *
 * @param props Props of the component, see {@link ProductLotsProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function StockSettings({ product }: ProductLotsProps) {
  return (
    <div className={styles.card}>
      <TextInput label={MINIMUM_LABEL} inputMode="numeric" defaultValue={String(product.usable.value > 0 ? 10 : 0)} />
      <Toggle label={TRACK_LOTS_LABEL} description={TRACK_LOTS_DESCRIPTION} defaultChecked />
    </div>
  );
}
