import { DataTable } from "@/components/patterns/DataTable";

import { LOT_COLUMNS, LOTS_TABLE_LABEL } from "../ProductLots.constants";
import type { LotsTableProps } from "../ProductLots.types";
import { LotRow } from "./LotRow";

/**
 * Table of the lots of a product, with the first one to expire at the top.
 *
 * @param props Props of the component, see {@link LotsTableProps}.
 * @param props.lots Lots to list.
 * @returns The rendered element.
 */
export function LotsTable({ lots }: LotsTableProps) {
  return (
    <DataTable label={LOTS_TABLE_LABEL} columns={LOT_COLUMNS} minWidth="46rem">
      {lots.map((lot) => (
        <LotRow key={lot.code} lot={lot} />
      ))}
    </DataTable>
  );
}
