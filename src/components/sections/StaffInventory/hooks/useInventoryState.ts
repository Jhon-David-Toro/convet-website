import { useState } from "react";

import { INITIAL_FILTERS } from "../StaffInventory.constants";
import type { InventoryFilters, InventoryState } from "../StaffInventory.types";
import { filterInventory, findInventoryProduct } from "../StaffInventory.utils";

/**
 * State of the inventory page: the filters, the page, the product open in the side panel and the adjust and dispense dialogs.
 *
 * @returns The filters with their setters, the matching products and the open panel and dialog.
 */
export function useInventoryState(): InventoryState {
  const [filters, setFilters] = useState<InventoryFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string>();
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [dispenseOpen, setDispenseOpen] = useState(false);

  return {
    filters,
    setFilter: (field, value) => {
      setFilters((current) => ({ ...current, [field]: value }));
      setPage(1);
    },
    clearFilters: () => {
      setFilters(INITIAL_FILTERS);
      setPage(1);
    },
    rows: filterInventory(filters),
    page,
    setPage,
    selected: findInventoryProduct(selectedId),
    openProduct: setSelectedId,
    closeProduct: () => setSelectedId(undefined),
    adjustOpen,
    openAdjust: () => setAdjustOpen(true),
    closeAdjust: () => setAdjustOpen(false),
    dispenseOpen,
    openDispense: () => setDispenseOpen(true),
    closeDispense: () => setDispenseOpen(false),
  };
}
