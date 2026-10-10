import { Alert } from "@/components/ui/Alert";

import { GENERAL_NOTICE, NOTICE_TITLE, PRESCRIPTION_NOTICE } from "../ProductDetail.constants";
import type { ProductNoticeProps } from "../ProductDetail.types";

/**
 * Notice that products are not sold online; a warning for prescription medications, informational otherwise.
 *
 * @param props Props of the component, see {@link ProductNoticeProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductNotice({ product }: ProductNoticeProps) {
  return (
    <Alert tone={product.prescription ? "warning" : "info"} title={NOTICE_TITLE}>
      {product.prescription ? PRESCRIPTION_NOTICE : GENERAL_NOTICE}
    </Alert>
  );
}
