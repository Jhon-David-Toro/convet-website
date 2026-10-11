import { Alert } from "@/components/ui/Alert";

import { MOVEMENTS_TITLE, NOTE_TEXT, NOTE_TITLE } from "../ProductLots.constants";
import type { TabViewProps } from "../ProductLots.types";
import { LotsTable } from "./LotsTable";
import { MovementsCard } from "./MovementsCard";

/**
 * Lots tab: the lots table, the recent movements and the note that stock can only change through movements.
 *
 * @param props Props of the component, see {@link TabViewProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function LotsView({ product }: TabViewProps) {
  return (
    <>
      <LotsTable lots={product.lots} />
      <MovementsCard movements={product.movements} title={MOVEMENTS_TITLE} showLedgerLink />
      <Alert tone="info" title={NOTE_TITLE}>
        {NOTE_TEXT}
      </Alert>
    </>
  );
}

/**
 * Movements tab: every recent movement of the product.
 *
 * @param props Props of the component, see {@link TabViewProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function MovementsView({ product }: TabViewProps) {
  return <MovementsCard movements={product.movements} title={MOVEMENTS_TITLE} showLedgerLink={false} />;
}
