import type { StatGridItem } from "@/components/patterns/StatGrid";
import type { BadgeProps } from "@/components/ui/Badge";
import { AlertTriangle, Box, Calendar, Check, Clock, Lock, XCircle } from "@/components/ui/Icon";
import type { SelectOption } from "@/components/ui/Select";
import type { InventoryLotStatus, InventoryStatus } from "@/lib/staff/staff.types";

import type { InventoryFilters } from "./StaffInventory.types";

export const TITLE = "Inventory";

export const ADJUSTMENT = "adjustment";

export const CLINICAL_USE = "clinical-use";

export const SUBTITLE = "Medications, supplements and veterinary products at Main clinic.";

export const ADJUST_LABEL = "Adjust stock";

export const RECEIVE_LABEL = "Receive stock";

export const DISPENSE_LABEL = "Dispense";

export const ROLE_NOTE = "Signed in as Dr. Shirley (Veterinarian): view, dispense, receive and adjust stock. Editing product details is admin-only.";

export const SEARCH_LABEL = "Search product, SKU or lot";

export const SEARCH_SHORTCUT = "Ctrl K";

export const TABLE_LABEL = "Inventory";

export const COLUMNS = ["Product", "SKU", "Type", "On hand", "Next lot · expiry", "Status"];

export const CHIPS_LABEL = "Kind of product";

export const TYPE_LABEL = "Type";

export const AVAILABILITY_LABEL = "Availability";

export const LOTS_LABEL = "Status";

export const ALL_VALUE = "all";

export const BLOCKED_VALUE = "blocked";

export const ATTENTION_STATUSES: InventoryStatus[] = ["low", "out", "blocked"];

export const INITIAL_FILTERS: InventoryFilters = { query: "", chip: ALL_VALUE, type: ALL_VALUE, availability: ALL_VALUE, lots: "active" };

export const CHIP_OPTIONS = [
  { value: ALL_VALUE, label: "All", count: 48 },
  { value: "Medication", label: "Medications", count: 27 },
  { value: "Supplement", label: "Supplements", count: 11 },
  { value: "Vet product", label: "Veterinary products", count: 10 },
];

export const TYPE_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "All types" },
  { value: "Medication", label: "Medication" },
  { value: "Supplement", label: "Supplement" },
  { value: "Vet product", label: "Vet product" },
];

export const AVAILABILITY_OPTIONS: SelectOption[] = [
  { value: ALL_VALUE, label: "All" },
  { value: "in-stock", label: "In stock" },
  { value: "low", label: "Low stock" },
  { value: "out", label: "Out of stock" },
];

export const LOTS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active lots" },
  { value: BLOCKED_VALUE, label: "Expired · blocked" },
];

export const STATS: StatGridItem[] = [
  { label: "Products", value: 48, caption: "27 medications · 11 supplements · 10 other", icon: Calendar, tone: "default" },
  { label: "Low or out of stock", value: 3, caption: "Below minimum — reorder", icon: Box, tone: "warning" },
  { label: "Expiring ≤ 60 days", value: 2, caption: "Use first (FEFO)", icon: Box, tone: "warning" },
  { label: "Expired · blocked", value: 1, caption: "Cannot be dispensed", icon: AlertTriangle, tone: "critical" },
];

export const TOTAL = 48;

export const PAGE_SIZE = 7;

export const PAGE_COUNT = 7;

export const STATUS_BADGES: Record<InventoryStatus, { tone: NonNullable<BadgeProps["tone"]>; icon: BadgeProps["icon"] }> = {
  "in-stock": { tone: "success", icon: Check },
  expires: { tone: "warning", icon: Clock },
  low: { tone: "warning", icon: AlertTriangle },
  out: { tone: "error", icon: XCircle },
  blocked: { tone: "error", icon: Lock },
};

export const LOT_BADGES: Record<InventoryLotStatus, { tone: NonNullable<BadgeProps["tone"]>; icon?: BadgeProps["icon"]; label: string }> = {
  "use-first": { tone: "warning", icon: Clock, label: "Use first" },
  ok: { tone: "success", label: "OK" },
};

export const ATTENTION_NOTE = "3 low · 2 expiring · 1 expired";

export const ATTENTION_HINT = "Tap a product to see lots and act.";

export const EMPTY_TITLE = "No products match these filters";

export const EMPTY_MESSAGE = "Check the spelling, search by SKU or lot, or clear filters.";

export const EMPTY_CLEAR_LABEL = "Clear filters";

export const ACTIONS_LABEL_PREFIX = "Actions for";

export const OPEN_LABEL_PREFIX = "Open";

export const DRAWER_TITLE = "Product detail";

export const DRAWER_LOTS_TITLE = "Lots on hand · used first-expiring first (FEFO)";

export const DRAWER_MOVEMENTS_TITLE = "Recent movements";

export const LOT_COLUMNS = ["Lot", "Expiry", "Qty", "Status"];

export const EDIT_LABEL = "Edit product · admin only";

export const UUID_LABEL = "UUID · internal ID (not the SKU)";
