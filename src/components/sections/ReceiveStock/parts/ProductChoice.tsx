import { OptionCard } from "@/components/patterns/OptionCard";
import { Pill } from "@/components/ui/Icon";

import type { ProductChoiceProps } from "../ReceiveStock.types";
import { stockLabel } from "../ReceiveStock.utils";

/**
 * A product of the catalog as a card the user can pick: name, description and how much is in stock.
 *
 * @param props Props of the component, see {@link ProductChoiceProps}.
 * @param props.product Product of the catalog.
 * @param props.name Name of the group of radios the card belongs to.
 * @param props.checked Whether the product is the chosen one.
 * @param props.onPick Called with the id of the product the user picked.
 * @returns The rendered element.
 */
export function ProductChoice({ product, name, checked, onPick }: ProductChoiceProps) {
  return (
    <OptionCard
      name={name}
      icon={Pill}
      title={product.name}
      subtitle={`${product.description} · SKU ${product.sku}`}
      meta={stockLabel(product)}
      checked={checked}
      onChange={() => onPick(product.id)}
    />
  );
}
