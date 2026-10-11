import { Select } from "@/components/ui/Select";

import { STATUS_FILTER_LABEL, STATUS_OPTIONS, VET_FILTER_LABEL, VET_OPTIONS } from "../StaffAppointments.constants";
import type { VetStatusSelectsProps } from "../StaffAppointments.types";
import styles from "../StaffAppointments.module.scss";

/**
 * Lists that filter the table by vet and by status; their labels are only read by screen readers.
 *
 * @param props Props of the component, see {@link VetStatusSelectsProps}.
 * @param props.filters Current filters.
 * @param props.setFilter Changes one filter.
 * @returns The rendered element.
 */
export function VetStatusSelects({ filters, setFilter }: VetStatusSelectsProps) {
  return (
    <>
      <Select label={<span className={styles.srOnly}>{VET_FILTER_LABEL}</span>} options={VET_OPTIONS} value={filters.vet} onValueChange={(value) => setFilter("vet", value)} />
      <Select label={<span className={styles.srOnly}>{STATUS_FILTER_LABEL}</span>} options={STATUS_OPTIONS} value={filters.status} onValueChange={(value) => setFilter("status", value)} />
    </>
  );
}
