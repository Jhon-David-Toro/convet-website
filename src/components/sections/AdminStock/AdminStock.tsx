"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { StatGrid } from "@/components/patterns/StatGrid";
import { StockMovementModal } from "@/components/sections/StockMovementModal";
import { PRODUCT_DETAIL } from "@/lib/admin/admin.constants";

import { STATS, SUBTITLE, TITLE } from "./AdminStock.constants";
import { useMovementModal } from "./hooks/useMovementModal";
import { useStockTable } from "./hooks/useStockTable";
import { CompactActions } from "./parts/CompactActions";
import { MobileBar } from "./parts/MobileBar";
import { StockActions } from "./parts/StockActions";
import { StockBody } from "./parts/StockBody";
import styles from "./AdminStock.module.scss";

/**
 * Stock page of the admin inventory: the figures of the stock, filters, and the products with what is on hand and their status.
 * Desktop shows the full table, tablet a short one, mobile cards with a bar fixed to the bottom. Adjust and Dispense open the movement dialog.
 *
 * @returns The rendered element.
 */
export function AdminStock() {
  const table = useStockTable();
  const modal = useMovementModal();

  return (
    <PageStack className={styles.page}>
      <PageHeader title={TITLE} subtitle={SUBTITLE} actions={<StockActions onAdjust={modal.adjust} onDispense={modal.dispense} />} compactHidden />
      <StatGrid stats={STATS} columns={5} mobileHidden />
      <CompactActions onDispense={modal.dispense} />
      <StockBody table={table} />
      <MobileBar onDispense={modal.dispense} />
      <StockMovementModal open={modal.open} onClose={modal.close} productName={PRODUCT_DETAIL.name} lots={PRODUCT_DETAIL.lots} initialType={modal.type} />
    </PageStack>
  );
}
