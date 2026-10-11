import type { ComponentPropsWithRef, ReactNode } from "react";

import type { TableHeaderCellProps } from "@/components/patterns/Table";

export type DataTableColumn = Pick<TableHeaderCellProps, "align" | "sort" | "onSort"> & {
  label: string;
};

export type DataTableHeadProps = {
  columns: (string | DataTableColumn)[];
  actions: boolean;
};

export type DataTableProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  label: string;
  columns: (string | DataTableColumn)[];
  actions?: boolean;
  minWidth?: string;
  children: ReactNode;
};
