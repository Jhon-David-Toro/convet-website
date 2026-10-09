import type { ComponentPropsWithRef } from "react";

import type { AvatarSubject } from "@/components/ui/Avatar";

/** Table align: `left`, `right`. */
export type TableAlign = "left" | "right";

/** Props of the `TableHeaderCell` component. */
export type TableHeaderCellProps = Omit<ComponentPropsWithRef<"th">, "align"> & {
  /** Horizontal alignment of the column. */
  align?: TableAlign;
  /** Shows the sort icon and exposes `aria-sort`. */
  sort?: "none" | "ascending" | "descending";
  /** When given, the header is a button that sorts the column. */
  onSort?: () => void;
};

/** Table cell type: `text`, `strong`, `mono`, `number`, `badge`, `avatar`, `actions`. */
export type TableCellType = "text" | "strong" | "mono" | "number" | "badge" | "avatar" | "actions";

/** Properties shared by every table cell variant. */
type TableCellBase = Omit<ComponentPropsWithRef<"td">, "align" | "type">;

/** Props of the `TableCell` component. */
export type TableCellProps =
  | (TableCellBase & { type?: "text" | "strong" | "mono" | "number" | "badge" })
  | (TableCellBase & {
      type: "avatar";
      avatar: AvatarSubject;
      /** Secondary line below the value (e.g. the owner). */
      secondary?: string;
    })
  | (TableCellBase & {
      type: "actions";
      /** Accessible name of the actions button. */
      actionLabel: string;
      onAction?: () => void;
    });

/** Props of the avatar cell variant. */
export type AvatarCellProps = Extract<TableCellProps, { type: "avatar" }>;

/** Props of the actions cell variant. */
export type ActionsCellProps = Extract<TableCellProps, { type: "actions" }>;

/** Props of the content of a header cell. */
export type HeaderContentProps = Pick<TableHeaderCellProps, "sort" | "onSort" | "children">;

/** Props of the plain data cell variant. */
export type DefaultCellProps = Exclude<TableCellProps, { type: "avatar" | "actions" }>;
