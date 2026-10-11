import { Button } from "@/components/ui/Button";

import { CHANGE_LOT_LABEL, FEFO_NOTE, LOT_LABEL } from "../VisitRecord.constants";
import type { LotPickerProps } from "../VisitRecord.types";
import { expiredLotMessage, lotDetail, lotLine } from "../VisitRecord.utils";
import { LotNote } from "./LotNote";
import styles from "../VisitRecord.module.scss";

/**
 * Lot of the vaccine: the suggested one (the one that expires first), a button to change it, and why an expired lot cannot be used.
 *
 * @param props Props of the component, see {@link LotPickerProps}.
 * @param props.lot Suggested lot.
 * @param props.expiredLot Code of a lot that is expired.
 * @returns The rendered element.
 */
export function LotPicker({ lot, expiredLot }: LotPickerProps) {
  return (
    <div className={styles.lotField}>
      <p className={styles.lotLabel}>{LOT_LABEL}</p>
      <div className={styles.lot}>
        <div>
          <p className={styles.lotCode}>{lotLine(lot)}</p>
          <p className={styles.lotDetail}>{lotDetail(lot, FEFO_NOTE)}</p>
        </div>
        <Button type="button" variant="tertiary" size="small">
          {CHANGE_LOT_LABEL}
        </Button>
      </div>
      <LotNote text={expiredLotMessage(expiredLot)} />
    </div>
  );
}
