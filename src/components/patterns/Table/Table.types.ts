import type { ComponentPropsWithRef } from "react";

import type { AvatarSubject } from "@/components/ui/Avatar";
import type { RowMenuItem } from "@/components/patterns/RowMenu";

export type TableAlign = "left" | "right";

export type TableHeaderCellProps = Omit<ComponentPropsWithRef<"th">, "align"> & {
  align?: TableAlign;
  sort?: "none" | "ascending" | "descending";
  onSort?: () => void;
};

export type TableCellType = "text" | "strong" | "mono" | "number" | "badge" | "avatar" | "actions";

type TableCellBase = Omit<ComponentPropsWithRef<"td">, "align" | "type">;

export type TableCellProps =
  | (TableCellBase & { type?: "text" | "strong" | "mono" | "number" | "badge" })
  | (TableCellBase & {
      type: "avatar";
      avatar: AvatarSubject;
      secondary?: string;
    })
  | (TableCellBase & {
      type: "actions";
      actionLabel: string;
      onAction?: () => void;
      items?: RowMenuItem[];
    });

export type AvatarCellProps = Extract<TableCellProps, { type: "avatar" }>;

export type ActionsCellProps = Extract<TableCellProps, { type: "actions" }>;

export type HeaderContentProps = Pick<TableHeaderCellProps, "sort" | "onSort" | "children">;

export type DefaultCellProps = Exclude<TableCellProps, { type: "avatar" | "actions" }>;
