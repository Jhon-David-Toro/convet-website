import Link from "next/link";

import { ArrowRight, Icon } from "@/components/ui/Icon";

import { FULL_LEDGER_LABEL } from "../ProductLots.constants";
import styles from "../ProductLots.module.scss";

/**
 * Link to the full ledger of movements of the product.
 *
 * @returns The rendered element.
 */
export function LedgerLink() {
  return (
    <Link href="#ledger" className={styles.ledger}>
      {FULL_LEDGER_LABEL}
      <Icon icon={ArrowRight} size="small" />
    </Link>
  );
}
