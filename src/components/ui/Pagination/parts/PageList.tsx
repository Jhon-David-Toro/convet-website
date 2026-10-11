import { PageItem } from "../PageItem";
import { ELLIPSIS_TOKEN } from "../Pagination.constants";
import type { PageListProps } from "../Pagination.types";
import { pageTokens } from "../pages";
import styles from "../Pagination.module.scss";

/**
 * Numbered pages with ellipses for the skipped ranges.
 *
 * @param props Props of the component, see {@link PageListProps}.
 * @param props.page Current page (1-based).
 * @param props.pageCount Total number of pages.
 * @param props.hrefForPage Builds the link of a page; makes pages links instead of buttons.
 * @param props.onPageChange Called with the chosen page; makes pages buttons instead of links.
 * @returns The rendered element.
 */
export function PageList({ page, pageCount, hrefForPage, onPageChange }: PageListProps) {
  return pageTokens(page, pageCount).map((token, index) =>
    token === ELLIPSIS_TOKEN ? (
      <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
        …
      </span>
    ) : (
      <PageItem
        key={token}
        page={token}
        current={token === page}
        href={hrefForPage?.(token)}
        onClick={onPageChange ? () => onPageChange(token) : undefined}
      />
    ),
  );
}
