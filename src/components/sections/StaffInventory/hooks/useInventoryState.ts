import { useState } from "react";

import type { MovementType } from "@/components/sections/StockMovementModal";

import { ADJUSTMENT, CLINICAL_USE, INITIAL_FILTERS } from "../StaffInventory.constants";
import type { InventoryFilters, InventoryState } from "../StaffInventory.types";
import { filterInventory, findInventoryProduct } from "../StaffInventory.utils";

/**
 * State of the inventory page: the filters, the page, the product open in the side panel and the stock adjustment dialog.
 *
 * @returns The filters with their setters, the matching products and the open panel and dialog.
 */
export function useInventoryState(): InventoryState {
  const [filters, setFilters] = useState<InventoryFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string>();
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustType, setAdjustType] = useState<MovementType>(ADJUSTMENT);

  /**
   * Opens the stock movement dialog on a type of movement.
   *
   * @param type Type of movement the dialog starts on.
   */
  const open = (type: MovementType) => {
    setAdjustType(type);
    setAdjustOpen(true);
  };

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
    adjustType,
    openAdjust: () => open(ADJUSTMENT),
    openDispense: () => open(CLINICAL_USE),
    closeAdjust: () => setAdjustOpen(false),
  };
}
