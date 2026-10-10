import type { ComponentPropsWithRef, HTMLAttributes } from "react";

type PaginationBaseProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  page: number;
  pageCount: number;
  total?: number;
  pageSize?: number;
};

export type PaginationAsLinksProps = PaginationBaseProps & {
  hrefForPage: (page: number) => string;
  onPageChange?: never;
};

export type PaginationAsButtonsProps = PaginationBaseProps & {
  onPageChange: (page: number) => void;
  hrefForPage?: never;
};

export type PaginationProps = PaginationAsLinksProps | PaginationAsButtonsProps;

export type PageItemProps = Omit<HTMLAttributes<HTMLElement>, "onClick" | "children"> & {
  page: number;
  current?: boolean;
  href?: string;
  onClick?: () => void;
};

export type PaginationStepProps = {
  direction: "previous" | "next";
  target: number;
  disabled: boolean;
} & Pick<PaginationProps, "hrefForPage" | "onPageChange">;

export type PageToken = number | "ellipsis";

export type PaginationSummaryProps = {
  first: number;
  last: number;
  total: number;
};

export type PageListProps = Pick<PaginationProps, "page" | "pageCount" | "hrefForPage" | "onPageChange">;

export type StepActionParams = Pick<PaginationStepProps, "target" | "disabled" | "hrefForPage" | "onPageChange">;

export type PageRangeParams = Pick<PaginationProps, "page" | "pageSize" | "total">;
