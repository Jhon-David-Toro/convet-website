import { Modal } from "@/components/ui/Modal";

import { MODAL_TITLE } from "./StockMovementModal.constants";
import type { StockMovementModalProps } from "./StockMovementModal.types";
import { MovementForm } from "./parts/MovementForm";

/**
 * Stock/Movement Modal: records a change of stock (clinical use, waste, expired or adjustment) on one lot of a product.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link StockMovementModalProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the movement is recorded.
 * @param props.productName Name of the product, shown under the title.
 * @param props.lots Lots of the product the movement can be recorded on.
 * @param props.initialType Type of movement selected when the dialog opens.
 * @returns The rendered element.
 */
export function StockMovementModal({ open, onClose, productName, lots, initialType }: StockMovementModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={MODAL_TITLE} description={productName}>
      <MovementForm lots={lots} initialType={initialType} onClose={onClose} />
    </Modal>
  );
}
