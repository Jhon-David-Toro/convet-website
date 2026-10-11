import type { StatusView } from "@/components/patterns/StatusBadge";
import type { StockMovementType } from "@/lib/admin/admin.types";

import type { LotsTab } from "./ProductLots.types";

export const TABS: { value: LotsTab; label: string }[] = [
  { value: "lots", label: "Lots" },
  { value: "movements", label: "Movements" },
  { value: "public", label: "Public page" },
  { value: "settings", label: "Settings" },
];

export const TABS_LABEL = "Product sections";

export const PANEL_ID = "product-panel";

export const ADJUST_LABEL = "Adjust";

export const DISPENSE_LABEL = "Dispense";

export const RECEIVE_LABEL = "Receive stock";

export const LOT_COLUMNS = [
  "Lot",
  { label: "Expiry", sort: "ascending" as const },
  "Supplier",
  "Received",
  { label: "On hand", align: "right" as const },
  "Status",
];

export const LOTS_TABLE_LABEL = "Lots";

export const MOVEMENTS_TITLE = "Recent movements";

export const FULL_LEDGER_LABEL = "Full ledger";

export const NOTE_TITLE = "Stock can't be edited directly";

export const NOTE_TEXT = "Every change is a movement (receipt, clinical use, waste, adjustment) so the history always adds up.";

export const MOVEMENT_VIEWS: Record<StockMovementType, StatusView> = {
  "clinical-use": { tone: "neutral", label: "Clinical use" },
  receipt: { tone: "success", label: "Receipt" },
  adjustment: { tone: "warning", label: "Adjustment" },
};

export const PUBLIC_LABEL = "Show on the website";

export const PUBLIC_DESCRIPTION = "Clients see the product name and description, never the stock.";

export const MINIMUM_LABEL = "Minimum stock";

export const TRACK_LOTS_LABEL = "Track lots and expiry";

export const TRACK_LOTS_DESCRIPTION = "Every receipt needs a lot number and an expiry date.";

export const BREADCRUMB_STOCK = "Stock";

export const DESCRIPTION_LABEL = "Description";
