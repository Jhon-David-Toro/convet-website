import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar, Clipboard, Plus, WhatsApp } from "@/components/ui/Icon";
import { CUSTOMER_APPOINTMENTS_HREF } from "@/lib/customer/customer.paths.constants";
import { WHATSAPP_HREF } from "@/lib/site/site.constants";

import { ADD_PET_LABEL, EMPTY_TITLE, PAPER_RECORDS_LABEL, VIEW_APPOINTMENT_LABEL } from "../HealthRecords.constants";
import type { RecordProps } from "../HealthRecords.types";
import styles from "../HealthRecords.module.scss";

/**
 * What a pet without records shows: when its first visit is, a button to add a pet and links to its appointment and to ask about paper records.
 *
 * @param props Props of the component, see {@link RecordProps}.
 * @param props.record Health record of the pet, with the text about its first visit.
 * @returns The rendered element.
 */
export function EmptyRecords({ record }: Pick<RecordProps, "record">) {
  return (
    <section className={styles.emptyCard}>
      <EmptyState
        icon={Clipboard}
        title={EMPTY_TITLE}
        message={record.firstVisit}
        action={
          <Button type="button" leadingIcon={Plus}>
            {ADD_PET_LABEL}
          </Button>
        }
      />
      <div className={styles.emptyActions}>
        <Button href={CUSTOMER_APPOINTMENTS_HREF} variant="accent" leadingIcon={Calendar}>
          {VIEW_APPOINTMENT_LABEL}
        </Button>
        <Button href={WHATSAPP_HREF} variant="secondary" leadingIcon={WhatsApp}>
          {PAPER_RECORDS_LABEL}
        </Button>
      </div>
    </section>
  );
}
