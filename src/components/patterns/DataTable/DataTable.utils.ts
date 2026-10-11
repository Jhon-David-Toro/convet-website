import type { DataTableColumn } from "./DataTable.types";

/**
 * Column in its full form: a plain string is a column with only a label.
 *
 * @param column Column as given to the table.
 * @returns The column with its label and options.
 */
export function toColumn(column: string | DataTableColumn): DataTableColumn {
  return typeof column === "string" ? { label: column } : column;
}
