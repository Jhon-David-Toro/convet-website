import type { SelectOption } from "@/components/ui/Select";

import type { Direction, MovementType } from "./StockMovementModal.types";

export const MODAL_TITLE = "Record stock movement";

export const TYPE_LABEL = "Type";

export const TYPE_OPTIONS: { value: MovementType; label: string }[] = [
  { value: "clinical-use", label: "Clinical use" },
  { value: "waste", label: "Waste" },
  { value: "expired", label: "Expired" },
  { value: "adjustment", label: "Adjustment" },
];

export const LOT_LABEL = "Lot";

export const DIRECTION_LABEL = "Direction";

export const DIRECTION_OPTIONS: SelectOption[] = [
  { value: "remove", label: "Remove (−)" },
  { value: "add", label: "Add (+)" },
];

export const QUANTITY_LABEL = "Quantity";

export const REASON_LABEL = "Reason (required for adjustments)";

export const REASON_HELPER = "Saved in the audit log with your name.";

export const CANCEL_LABEL = "Cancel";

export const SUBMIT_LABELS: Record<MovementType, string> = {
  "clinical-use": "Record use",
  waste: "Record waste",
  expired: "Record expired",
  adjustment: "Record adjustment",
};

export const RECORDED_MESSAGE = "Stock movement recorded.";

export const ADJUSTMENT_TYPE: MovementType = "adjustment";

export const REMOVE_DIRECTION: Direction = "remove";

export const REASON_REQUIRED = "Add a reason for the adjustment.";
