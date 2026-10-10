import type { ComponentPropsWithRef } from "react";

export type ProductIdentityProps = Omit<ComponentPropsWithRef<"button">, "children" | "name" | "type"> & {
  name: string;
  kind: string;
  presentation: string;
  sku: string;
  uuid: string;
  stock: string;
  selected?: boolean;
};

export type ProductTextProps = Pick<ProductIdentityProps, "name" | "kind" | "presentation" | "sku" | "uuid">;
