import { EmptyState } from "@/components/ui/EmptyState";

import { EMPTY_ICON, EMPTY_TEXT, EMPTY_TITLE } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";

/**
 * Empty state of the tabs that are not available yet.
 *
 * @returns The rendered element.
 */
export function TabPlaceholder() {
  return (
    <div className={styles.card}>
      <EmptyState icon={EMPTY_ICON} title={EMPTY_TITLE} message={EMPTY_TEXT} />
    </div>
  );
}
