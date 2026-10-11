import { DateInput } from "@/components/ui/DateInput";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { SUPPLIER_NAMES } from "@/lib/admin/admin.constants";

import styles from "../ReceiveStock.module.scss";
import { INVOICE_LABEL, RECEIVED_ON_LABEL, SUPPLIER_LABEL } from "../ReceiveStock.constants";
import type { SupplierCardProps } from "../ReceiveStock.types";

const SUPPLIER_OPTIONS = SUPPLIER_NAMES.map((name) => ({ value: name, label: name }));

/**
 * Data of the delivery: the supplier, the invoice or delivery note, and the day it was received.
 *
 * @param props Props of the component, see {@link SupplierCardProps}.
 * @param props.header Data of the delivery.
 * @param props.setHeader Changes one value of the delivery.
 * @returns The rendered element.
 */
export function SupplierCard({ header, setHeader }: SupplierCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.triple}>
        <Select label={SUPPLIER_LABEL} options={SUPPLIER_OPTIONS} value={header.supplier} onValueChange={(value) => setHeader("supplier", value)} />
        <TextInput label={INVOICE_LABEL} optional value={header.invoice} onChange={(event) => setHeader("invoice", event.target.value)} />
        <DateInput label={RECEIVED_ON_LABEL} value={header.receivedOn} onValueChange={(value) => setHeader("receivedOn", value)} />
      </div>
    </section>
  );
}
