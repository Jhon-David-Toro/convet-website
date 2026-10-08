import type { ComponentPropsWithRef } from "react";

/** Props of the `ProductIdentity` component. */
export type ProductIdentityProps = Omit<ComponentPropsWithRef<"button">, "children" | "name" | "type"> & {
  /** Name to show. */
  name: string;
  /** Product type, e.g. "Medication". */
  kind: string;
  /** Presentation, e.g. "Tablets · 50 mg · box of 14 · Pain & inflammation". */
  presentation: string;
  /** Stock keeping unit of the product. */
  sku: string;
  /** Short identifier, e.g. "2c8e…91fa". */
  uuid: string;
  /** Stock level, e.g. "In stock · 42". */
  stock: string;
  /** Whether the item is selected. */
  selected?: boolean;
};

/** Props of the text block (name, presentation and identifiers). */
export type ProductTextProps = Pick<ProductIdentityProps, "name" | "kind" | "presentation" | "sku" | "uuid">;
