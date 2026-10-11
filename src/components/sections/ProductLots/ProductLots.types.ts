import type { MovementType } from "@/components/sections/StockMovementModal";
import type { ProductDetail, ProductLot, StockMovement } from "@/lib/admin.types";

export type LotsTab = "lots" | "movements" | "public" | "settings";

export type ProductLotsProps = {
  product: ProductDetail;
};

export type MovementDialogState = {
  open: boolean;
  type: MovementType;
  adjust: () => void;
  dispense: () => void;
  close: () => void;
};

export type ProductHeaderProps = ProductLotsProps & {
  onAdjust: () => void;
  onDispense: () => void;
};

export type LotsTabsProps = {
  tab: LotsTab;
  onChange: (tab: LotsTab) => void;
  lotCount: number;
};

export type LotsPanelProps = ProductLotsProps & {
  tab: LotsTab;
};

export type TabViewProps = ProductLotsProps;

export type ProductActionsProps = Pick<ProductHeaderProps, "onAdjust" | "onDispense">;

export type LotCellsProps = LotRowProps;

export type LotRowProps = {
  lot: ProductLot;
};

export type LotsTableProps = {
  lots: ProductLot[];
};

export type MovementsCardProps = {
  movements: StockMovement[];
  title: string;
  showLedgerLink: boolean;
};

export type MovementItemProps = {
  movement: StockMovement;
};
