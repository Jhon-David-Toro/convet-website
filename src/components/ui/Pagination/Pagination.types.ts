import type { ComponentPropsWithRef, HTMLAttributes } from "react";

/** Props of the `PaginationBase` component. */
type PaginationBaseProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** With `total`, shows "Showing 1–10 of 248". */
  total?: number;
  /** Items per page. */
  pageSize?: number;
};

/** Pages as links (recommended: every page has its own URL). */
export type PaginationAsLinksProps = PaginationBaseProps & {
  /** Builds the link of a page; makes pages links instead of buttons. */
  hrefForPage: (page: number) => string;
  /** Called with the chosen page; makes pages buttons instead of links. */
  onPageChange?: never;
};

/** Pages as buttons, for client-side state. */
export type PaginationAsButtonsProps = PaginationBaseProps & {
  /** Called with the chosen page; makes pages buttons instead of links. */
  onPageChange: (page: number) => void;
  /** Builds the link of a page; makes pages links instead of buttons. */
  hrefForPage?: never;
};

/** Props of the `Pagination` component. */
export type PaginationProps = PaginationAsLinksProps | PaginationAsButtonsProps;

/** Props of the `PageItem` component. */
export type PageItemProps = Omit<HTMLAttributes<HTMLElement>, "onClick" | "children"> & {
  /** Current page (1-based). */
  page: number;
  /** Currently selected value. */
  current?: boolean;
  /** With `href` it is a link; without it, a button. */
  href?: string;
  /** Called when the element is clicked. */
  onClick?: () => void;
};

/** Props of the `PaginationStep` component. */
export type PaginationStepProps = {
  /** Direction of the button: `"previous"` or `"next"`. */
  direction: "previous" | "next";
  /** Page the button goes to. */
  target: number;
  /** Whether the button is disabled (there is no page in that direction). */
  disabled: boolean;
} & Pick<PaginationProps, "hrefForPage" | "onPageChange">;

/** An entry of the pagination: a page number or an ellipsis. */
export type PageToken = number | "ellipsis";

/** Props of the "Showing 1–10 of 248" summary. */
export type PaginationSummaryProps = {
  /** Number of the first item of the page. */
  first: number;
  /** Number of the last item of the page. */
  last: number;
  /** Total number of items. */
  total: number;
};

/** Props of the list of page items between the previous / next buttons. */
export type PageListProps = Pick<PaginationProps, "page" | "pageCount" | "hrefForPage" | "onPageChange">;

/** Props needed to build the action of a previous / next button. */
export type StepActionParams = Pick<PaginationStepProps, "target" | "disabled" | "hrefForPage" | "onPageChange">;

/** What decides the range of items shown on a page. */
export type PageRangeParams = Pick<PaginationProps, "page" | "pageSize" | "total">;
