import { ChevronDown, Icon } from "@/components/ui/Icon";

import { ASCENDING_SORT, TABLE_SORT_ICON_SIZE } from "../Table.constants";
import type { HeaderContentProps } from "../Table.types";
import styles from "../Table.module.scss";

/**
 * Column label with the sort chevron; becomes a button when `onSort` is given.
 *
 * @param props Props of the component, see {@link HeaderContentProps}.
 * @param props.sort Shows the sort icon and exposes `aria-sort`.
 * @param props.onSort When given, the header is a button that sorts the column.
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
export function HeaderContent({ sort, onSort, children }: HeaderContentProps) {
  const content = (
    <>
      <span>{children}</span>
      {sort && <Icon icon={ChevronDown} size={TABLE_SORT_ICON_SIZE} className={sort === ASCENDING_SORT ? styles.flipped : undefined} />}
    </>
  );

  return onSort ? (
    <button type="button" onClick={onSort} className={styles.sortButton}>
      {content}
    </button>
  ) : (
    <span className={styles.headerContent}>{content}</span>
  );
}
