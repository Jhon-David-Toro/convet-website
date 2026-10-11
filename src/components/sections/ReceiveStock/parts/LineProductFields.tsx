import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { CATALOG_PRODUCTS } from "@/lib/admin/admin.constants";

import { LOT_LABEL, PRODUCT_LABEL } from "../ReceiveStock.constants";
import type { LineProductFieldsProps } from "../ReceiveStock.types";

const PRODUCT_OPTIONS = CATALOG_PRODUCTS.map((product) => ({ value: product.id, label: product.name }));

/**
 * Product and lot number of a line.
 *
 * @param props Props of the component, see {@link LineProductFieldsProps}.
 * @param props.line Line of the receipt.
 * @param props.onChange Changes values of the line.
 * @returns The rendered element.
 */
export function LineProductFields({ line, onChange }: LineProductFieldsProps) {
  return (
    <>
      <Select label={PRODUCT_LABEL} options={PRODUCT_OPTIONS} value={line.productId} onValueChange={(productId) => onChange({ productId })} />
      <TextInput label={LOT_LABEL} value={line.lot} onChange={(event) => onChange({ lot: event.target.value })} />
    </>
  );
}
