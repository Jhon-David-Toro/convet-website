"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { CRUMBS, SUBTITLE, TITLE } from "./ReceiveStock.constants";
import { useReceipt } from "./hooks/useReceipt";
import { ProductsCard } from "./parts/ProductsCard";
import { ReceiptFooter } from "./parts/ReceiptFooter";
import { SupplierCard } from "./parts/SupplierCard";

/**
 * Receive stock page of the admin inventory: who delivered, and the products received with their lot, expiry and quantity.
 * Expired stock cannot be received, so the receipt cannot be saved until every line is fixed.
 *
 * @returns The rendered element.
 */
export function ReceiveStock() {
  const receipt = useReceipt();

  return (
    <PageStack>
      <Breadcrumbs items={CRUMBS} />
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      <SupplierCard header={receipt.header} setHeader={receipt.setHeader} />
      <ProductsCard receipt={receipt} />
      <ReceiptFooter errorCount={receipt.errorCount} onSave={receipt.save} />
    </PageStack>
  );
}
