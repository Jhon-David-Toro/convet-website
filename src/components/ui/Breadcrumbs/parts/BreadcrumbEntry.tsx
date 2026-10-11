import { ChevronRight, Icon } from "@/components/ui/Icon";

import { BREADCRUMBS_SEPARATOR_SIZE } from "../Breadcrumbs.constants";
import type { BreadcrumbEntryProps } from "../Breadcrumbs.types";
import { BreadcrumbLabel } from "./BreadcrumbLabel";
import styles from "../Breadcrumbs.module.scss";

/**
 * One item with the chevron that separates it from the next (not drawn after the current page).
 *
 * @param props Props of the component, see {@link BreadcrumbEntryProps}.
 * @param props.item Item to render.
 * @param props.current Whether the item is the current page (the last one).
 * @returns The rendered element.
 */
export function BreadcrumbEntry({ item, current }: BreadcrumbEntryProps) {
  return (
    <li className={styles.item}>
      <BreadcrumbLabel item={item} current={current} />
      {!current && <Icon icon={ChevronRight} size={BREADCRUMBS_SEPARATOR_SIZE} className={styles.separator} />}
    </li>
  );
}
