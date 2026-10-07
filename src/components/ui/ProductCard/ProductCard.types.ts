import type { ComponentPropsWithRef } from "react";

/** Props of the `ProductCard` component. */
export type ProductCardProps = ComponentPropsWithRef<"article"> & {
  /** Product photo; without it the illustration is shown. */
  image?: { src: string; alt: string };
  /** Category of the product. */
  category: string;
  /** Name to show. */
  name: string;
  /** Description text under the title. */
  description: string;
  /** Shows the "Prescription only" label. */
  prescription?: boolean;
  /** Link of the availability inquiry. */
  askHref: string;
  /** Label of the availability inquiry button. */
  askLabel?: string;
};

/** Props of the category, name and description block. */
export type ProductTextProps = Pick<ProductCardProps, "category" | "name" | "description">;
