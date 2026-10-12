import { ModalButton } from "@/components/sections/ModalButton";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Plus, Search, X } from "@/components/ui/Icon";

import { EMPTY_ADD_LABEL, EMPTY_CLEAR_LABEL, EMPTY_MESSAGE } from "../StaffPatients.constants";
import type { PatientsEmptyProps } from "../StaffPatients.types";
import styles from "../StaffPatients.module.scss";

/**
 * Empty state when no patient matches the filters: what was searched, a button to add a pet and one to clear the filters.
 *
 * @param props Props of the component, see {@link PatientsEmptyProps}.
 * @param props.query Text typed in the search.
 * @param props.onClear Clears every filter.
 * @returns The rendered element.
 */
export function PatientsEmpty({ query, onClear }: PatientsEmptyProps) {
  const title = query.trim() ? `No patients match “${query.trim()}”` : "No patients match these filters";

  return (
    <EmptyState
      icon={Search}
      title={title}
      message={EMPTY_MESSAGE}
      action={
        <div className={styles.emptyActions}>
          <ModalButton modal="patient" leadingIcon={Plus}>
            {EMPTY_ADD_LABEL}
          </ModalButton>
          <Button type="button" variant="secondary" leadingIcon={X} onClick={onClear}>
            {EMPTY_CLEAR_LABEL}
          </Button>
        </div>
      }
    />
  );
}
