import { Button } from "@/components/ui/Button";
import { ArrowDownCircle, ArrowUpCircle, Sliders } from "@/components/ui/Icon";

import { ADJUST_LABEL, DISPENSE_LABEL, RECEIVE_HREF, RECEIVE_LABEL } from "../AdminStock.constants";
import type { StockActionsProps } from "../AdminStock.types";

/**
 * Buttons of the stock page header (desktop): adjust, dispense and receive stock.
 *
 * @param props Props of the component, see {@link StockActionsProps}.
 * @param props.onAdjust Opens the movement dialog as an adjustment.
 * @param props.onDispense Opens the movement dialog as a clinical use.
 * @returns The rendered element.
 */
export function StockActions({ onAdjust, onDispense }: StockActionsProps) {
  return (
    <>
      <Button type="button" variant="secondary" leadingIcon={Sliders} onClick={onAdjust}>
        {ADJUST_LABEL}
      </Button>
      <Button type="button" variant="secondary" leadingIcon={ArrowUpCircle} onClick={onDispense}>
        {DISPENSE_LABEL}
      </Button>
      <Button href={RECEIVE_HREF} leadingIcon={ArrowDownCircle}>
        {RECEIVE_LABEL}
      </Button>
    </>
  );
}
