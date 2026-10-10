import type { ComponentPropsWithRef } from "react";

export type ProductCardProps = ComponentPropsWithRef<"article"> & {
  image?: { src: string; alt: string };
  category: string;
  name: string;
  href?: string;
  description: string;
  prescription?: boolean;
  askHref: string;
  askLabel?: string;
};

export type ProductTextProps = Pick<ProductCardProps, "category" | "name" | "description" | "href">;
