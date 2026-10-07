import { DEFAULT_PAGE_SIZE } from "./Pagination.constants";
import type {  } from "./Pagination.constants";
import type { PageRangeParams, StepActionParams } from "./Pagination.types";

/**
 * First and last item numbers of the current page ("Showing 11–20 of 248").
 *
 * @param params Options, see {@link PageRangeParams}.
 * @param params.page Current page (1-based).
 * @param params.pageSize Items per page.
 * @param params.total With `total`, shows "Showing 1–10 of 248".
 * @returns The numbers of the first and last item of the page.
 */
export function getPageRange({ page, pageSize = DEFAULT_PAGE_SIZE, total }: PageRangeParams) {
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total ?? page * pageSize);
  return { first, last };
}

/**
 * Props that make a previous / next button inert, a link or a button depending on how pages are navigated.
 *
 * @param params Options, see {@link StepActionParams}.
 * @param params.target Page the button goes to.
 * @param params.disabled Whether the control is disabled.
 * @param params.hrefForPage Builds the link of a page; makes pages links instead of buttons.
 * @param params.onPageChange Called with the chosen page; makes pages buttons instead of links.
 * @returns The props to spread on the button: `disabled`, an `href` or an `onClick`.
 */
export function getStepAction({ target, disabled, hrefForPage, onPageChange }: StepActionParams) {
  if (disabled) return { disabled: true } as const;
  if (hrefForPage) return { href: hrefForPage(target) };
  return { onClick: () => onPageChange?.(target) };
}
