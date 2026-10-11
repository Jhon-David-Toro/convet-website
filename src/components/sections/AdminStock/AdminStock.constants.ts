import type { StatGridItem } from "@/components/patterns/StatGrid";
import { STOCK_STATS } from "@/lib/admin.constants";
import { ADMIN_RECEIVE_HREF } from "@/lib/admin.paths.constants";

import type { SortDirection } from "./AdminStock.types";

export const TITLE = "Stock";

export const SUBTITLE = "Main clinic · 148 products · updated from movements in real time";

export const STATS: StatGridItem[] = STOCK_STATS.map((stat, index) => ({ ...stat, desktopOnly: index === 0 || index === 3 }));

export const ADJUST_LABEL = "Adjust";

export const DISPENSE_LABEL = "Dispense";

export const RECEIVE_LABEL = "Receive stock";

export const RECEIVE_SHORT_LABEL = "Receive";

export const RECEIVE_HREF = ADMIN_RECEIVE_HREF;

export const SEARCH_LABEL = "Search product, SKU or lot";

export const SEARCH_SHORTCUT = "Ctrl K";

export const FILTERS_LABEL = "Kind of product";

export const FILTER_OPTIONS = [
  { value: "all", label: "All", count: 148 },
  { value: "medications", label: "Medications", count: 96 },
  { value: "veterinary", label: "Veterinary products", count: 52 },
  { value: "attention", label: "Needs attention", count: 8 },
];

export const ALL_FILTER = "all";

export const TABLE_LABEL = "Stock by product";

export const COMPACT_TABLE_LABEL = "Stock by product, short";

export const COLUMNS_BEFORE_SORT = ["Product", "SKU", "Type"];

export const COLUMNS_AFTER_SORT = ["Minimum", "Next expiry", "Status"];

export const ON_HAND_LABEL = "On hand";

export const COMPACT_COLUMNS = ["Product", "On hand", "Status"];

export const NEXT_SORT: Record<SortDirection, SortDirection> = { none: "descending", descending: "ascending", ascending: "descending" };

export const TOTAL = 148;

export const PAGE_SIZE = 7;

export const PAGE_COUNT = 22;

export const CARDS_LABEL = "Products";
