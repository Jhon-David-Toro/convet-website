import type { MovementType } from "@/components/sections/StockMovementModal";
import type { StaffInventoryRow } from "@/lib/staff/staff.types";

export type InventoryFilters = {
  query: string;
  chip: string;
  type: string;
  availability: string;
  lots: string;
};

export type SetInventoryFilter = <Field extends keyof InventoryFilters>(field: Field, value: InventoryFilters[Field]) => void;

export type InventoryFiltersProps = {
  filters: InventoryFilters;
  setFilter: SetInventoryFilter;
};

export type InventoryState = {
  filters: InventoryFilters;
  setFilter: SetInventoryFilter;
  clearFilters: () => void;
  rows: StaffInventoryRow[];
  page: number;
  setPage: (page: number) => void;
  selected: StaffInventoryRow | undefined;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  adjustOpen: boolean;
  adjustType: MovementType;
  openAdjust: () => void;
  openDispense: () => void;
  closeAdjust: () => void;
};

export type InventoryRowsProps = {
  rows: StaffInventoryRow[];
  onOpen: (id: string) => void;
};

export type InventoryRowProps = {
  product: StaffInventoryRow;
  onOpen: (id: string) => void;
};

export type InventoryStatusBadgeProps = Pick<StaffInventoryRow, "status" | "statusLabel">;

export type ProductDrawerProps = {
  product: StaffInventoryRow | undefined;
  onClose: () => void;
  onAdjust: () => void;
  onDispense: () => void;
};

export type DrawerProductProps = {
  product: StaffInventoryRow;
};
