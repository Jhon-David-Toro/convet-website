import type { MovementType } from "@/components/sections/StockMovementModal";
import type { StockProduct } from "@/lib/admin/admin.types";

export type SortDirection = "none" | "ascending" | "descending";

export type StockTableState = {
  filter: string;
  query: string;
  sort: SortDirection;
  page: number;
  rows: StockProduct[];
  setFilter: (filter: string) => void;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  toggleSort: () => void;
};

export type MovementModalState = {
  open: boolean;
  type: MovementType;
  adjust: () => void;
  dispense: () => void;
  close: () => void;
};

export type StockBodyProps = StockFiltersProps;

export type StockActionsProps = {
  onAdjust: () => void;
  onDispense: () => void;
};

export type CompactActionsProps = Pick<StockActionsProps, "onDispense">;

export type MobileBarProps = Pick<StockActionsProps, "onDispense">;

export type StockFiltersProps = {
  table: StockTableState;
};

export type StockTableProps = Pick<StockTableState, "rows" | "sort"> & {
  onSort: () => void;
};

export type StockCompactTableProps = Pick<StockTableState, "rows">;

export type StockCardsProps = Pick<StockTableState, "rows">;

export type StockCardProps = StockRowProps;

export type StockCardTopProps = StockRowProps;

export type StockCellsProps = StockRowProps;

export type StockRowProps = {
  product: StockProduct;
};
