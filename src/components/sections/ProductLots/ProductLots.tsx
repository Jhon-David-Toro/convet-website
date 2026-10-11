"use client";

import { useState } from "react";

import { PageStack } from "@/components/patterns/PageStack";
import { StatGrid } from "@/components/patterns/StatGrid";
import { StockMovementModal } from "@/components/sections/StockMovementModal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import type { LotsTab, ProductLotsProps } from "./ProductLots.types";
import { productCrumbs, productStats } from "./ProductLots.utils";
import { useMovementDialog } from "./hooks/useMovementDialog";
import { LotsPanel } from "./parts/LotsPanel";
import { LotsTabs } from "./parts/LotsTabs";
import { ProductHeader } from "./parts/ProductHeader";

/**
 * Product page of the admin inventory: its identity, the usable, next to expire and blocked stock, and tabs with its lots,
 * movements, public page and settings. Adjust and Dispense open the movement dialog on one of its lots.
 *
 * @param props Props of the component, see {@link ProductLotsProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function ProductLots({ product }: ProductLotsProps) {
  const [tab, setTab] = useState<LotsTab>("lots");
  const dialog = useMovementDialog();

  return (
    <PageStack>
      <Breadcrumbs items={productCrumbs(product)} />
      <ProductHeader product={product} onAdjust={dialog.adjust} onDispense={dialog.dispense} />
      <StatGrid stats={productStats(product)} columns={3} />
      <LotsTabs tab={tab} onChange={setTab} lotCount={product.lots.length} />
      <LotsPanel tab={tab} product={product} />
      <StockMovementModal open={dialog.open} onClose={dialog.close} productName={product.name} lots={product.lots} initialType={dialog.type} />
    </PageStack>
  );
}
