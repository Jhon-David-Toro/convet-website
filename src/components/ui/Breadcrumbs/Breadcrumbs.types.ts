import type { ComponentPropsWithRef } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  items: BreadcrumbItem[];
};

export type BreadcrumbEntryProps = {
  item: BreadcrumbItem;
  current: boolean;
};
