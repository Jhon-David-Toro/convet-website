import { ELLIPSIS_TOKEN } from "./Pagination.constants";
import type { PageToken } from "./Pagination.types";

/**
 * Pages that must appear: first, last, the current page and its neighbors; near an edge the window widens to 3 pages.
 *
 * @param page Page number (1-based).
 * @param pageCount Total number of pages.
 * @returns The sorted page numbers that must appear.
 */
function wantedPages(page: number, pageCount: number): number[] {
  const wanted = new Set([1, pageCount, page - 1, page, page + 1]);
  if (page <= 2) wanted.add(3);
  if (page >= pageCount - 1) wanted.add(pageCount - 2);
  return [...wanted].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
}

/**
 * What goes between two consecutive pages: nothing, the single missing page, or an ellipsis.
 *
 * @param previous Previous page number, if any.
 * @param current Current page number.
 * @returns The tokens to insert between the two pages: none, the missing page, or an ellipsis.
 */
function gapBetween(previous: number | undefined, current: number): PageToken[] {
  if (previous === undefined || current - previous === 1) return [];
  return current - previous === 2 ? [previous + 1] : [ELLIPSIS_TOKEN];
}

/**
 * Pages to show: the first, the last and the neighbors of the current one. Near the edges the window widens
 * to 3 pages (page 1 of 25: 1 2 3 … 25, as in Figma). If only one page is missing
 * between two pages, that page is shown instead of the ellipsis.
 *
 * @param page Page number (1-based).
 * @param pageCount Total number of pages.
 * @returns The page numbers and ellipses to render, in order.
 */
export function pageTokens(page: number, pageCount: number): PageToken[] {
  const pages = wantedPages(page, pageCount);
  return pages.flatMap((n, index) => [...gapBetween(pages[index - 1], n), n]);
}
