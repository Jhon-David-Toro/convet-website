import { Pagination } from "@/components/ui/Pagination";

import styles from "../AdminStock.module.scss";
import { PAGE_COUNT, PAGE_SIZE, TOTAL } from "../AdminStock.constants";
import type { StockBodyProps } from "../AdminStock.types";
import { StockCards } from "./StockCards";
import { StockCompactTable } from "./StockCompactTable";
import { StockFilters } from "./StockFilters";
import { StockTable } from "./StockTable";

/**
 * Filters, the products (full table on desktop, short table on tablet, cards on mobile) and the pagination.
 *
 * @param props Props of the component, see {@link StockBodyProps}.
 * @param props.table State of the stock table.
 * @returns The rendered element.
 */
export function StockBody({ table }: StockBodyProps) {
  return (
    <>
      <StockFilters table={table} />
      <StockTable rows={table.rows} sort={table.sort} onSort={table.toggleSort} />
      <StockCompactTable rows={table.rows} />
      <StockCards rows={table.rows} />
      <Pagination className={styles.pagination} page={table.page} pageCount={PAGE_COUNT} total={TOTAL} pageSize={PAGE_SIZE} onPageChange={table.setPage} />
    </>
  );
}
