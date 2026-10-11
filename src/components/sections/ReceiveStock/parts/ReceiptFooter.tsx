import { Button } from "@/components/ui/Button";
import { ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";

import styles from "../ReceiveStock.module.scss";
import { CANCEL_LABEL, FOOTER_NOTE } from "../ReceiveStock.constants";
import type { ReceiptFooterProps } from "../ReceiveStock.types";
import { saveLabel } from "../ReceiveStock.utils";

/**
 * Footer of the page: the note that stock only changes on save, a cancel link and the save button, which waits until every error is fixed.
 *
 * @param props Props of the component, see {@link ReceiptFooterProps}.
 * @param props.errorCount Number of lines with a problem.
 * @param props.onSave Saves the receipt.
 * @returns The rendered element.
 */
export function ReceiptFooter({ errorCount, onSave }: ReceiptFooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerNote}>{FOOTER_NOTE}</p>
      <div className={styles.footerActions}>
        <Button href={ADMIN_NAV_HREFS.stock} variant="tertiary">
          {CANCEL_LABEL}
        </Button>
        <Button type="button" disabled={errorCount > 0} onClick={onSave}>
          {saveLabel(errorCount)}
        </Button>
      </div>
    </footer>
  );
}
