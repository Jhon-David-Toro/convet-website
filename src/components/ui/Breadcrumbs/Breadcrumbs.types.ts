import type { ComponentPropsWithRef } from "react";

/** One step of the breadcrumb path; the last one is the current page. */
export type BreadcrumbItem = {
  /** Visible text of the step. */
  label: string;
  /** Link destination; without it the step is plain text. */
  href?: string;
};

/** Props of the `Breadcrumbs` component. */
export type BreadcrumbsProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  /** The last item is the current page (no link). */
  items: BreadcrumbItem[];
};

/** Props of one breadcrumb item. */
export type BreadcrumbEntryProps = {
  /** Item to render. */
  item: BreadcrumbItem;
  /** Whether the item is the current page (the last one). */
  current: boolean;
};
