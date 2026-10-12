"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { StatGrid } from "@/components/patterns/StatGrid";
import { StockMovementModal } from "@/components/sections/StockMovementModal";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon, Plus, Search, Shield, Sliders, X } from "@/components/ui/Icon";
import { Pagination } from "@/components/ui/Pagination";
import { ADMIN_RECEIVE_HREF } from "@/lib/admin/admin.paths.constants";

import {
  ADJUST_LABEL,
  ATTENTION_HINT,
  ATTENTION_NOTE,
  EMPTY_CLEAR_LABEL,
  EMPTY_MESSAGE,
  EMPTY_TITLE,
  PAGE_COUNT,
  PAGE_SIZE,
  RECEIVE_LABEL,
  ROLE_NOTE,
  STATS,
  SUBTITLE,
  TITLE,
  TOTAL,
} from "./StaffInventory.constants";
import { movementLots } from "./StaffInventory.utils";
import { useInventoryState } from "./hooks/useInventoryState";
import { InventoryFilters } from "./parts/InventoryFilters";
import { InventoryList } from "./parts/InventoryList";
import { ProductDrawer } from "./parts/ProductDrawer";
import styles from "./StaffInventory.module.scss";

/**
 * Inventory page of the staff area: the figures of the stock, filters, the products with what is on hand, and a side panel with the detail of a product.
 * Adjust and Dispense open the stock movement dialog.
 *
 * @returns The rendered element.
 */
export function StaffInventory() {
  const state = useInventoryState();
  const lotsOwner = state.selected ?? state.rows[0];

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        compactHidden
        actions={
          <>
            <Button type="button" variant="secondary" leadingIcon={Sliders} onClick={state.openAdjust}>
              {ADJUST_LABEL}
            </Button>
            <Button href={ADMIN_RECEIVE_HREF} leadingIcon={Plus}>
              {RECEIVE_LABEL}
            </Button>
          </>
        }
      />
      <p className={styles.role}>
        <Icon icon={Shield} size="small" tone="tertiary" />
        {ROLE_NOTE}
      </p>
      <StatGrid stats={STATS} mobileHidden />
      <InventoryFilters filters={state.filters} setFilter={state.setFilter} />
      <div className={styles.attention}>
        <Alert tone="warning" title={ATTENTION_NOTE}>
          {ATTENTION_HINT}
        </Alert>
      </div>
      {state.rows.length === 0 ? (
        <EmptyState
          icon={Search}
          title={EMPTY_TITLE}
          message={EMPTY_MESSAGE}
          action={
            <Button type="button" variant="secondary" leadingIcon={X} onClick={state.clearFilters}>
              {EMPTY_CLEAR_LABEL}
            </Button>
          }
        />
      ) : (
        <>
          <InventoryList rows={state.rows} onOpen={state.openProduct} />
          <Pagination page={state.page} pageCount={PAGE_COUNT} total={TOTAL} pageSize={PAGE_SIZE} onPageChange={state.setPage} />
        </>
      )}
      <ProductDrawer product={state.selected} onClose={state.closeProduct} onAdjust={state.openAdjust} onDispense={state.openDispense} />
      {lotsOwner && (
        <StockMovementModal
          open={state.adjustOpen}
          onClose={state.closeAdjust}
          productName={lotsOwner.name}
          lots={movementLots(lotsOwner)}
          initialType={state.adjustType}
        />
      )}
    </PageStack>
  );
}
