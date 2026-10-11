import type { FilterChipsProps } from "@/components/patterns/FilterChips";
import type { AdminClient } from "@/lib/admin.types";

export type ClientsTableProps = {
  rows: AdminClient[];
};

export type ClientRowProps = {
  client: AdminClient;
};

export type ClientFiltersProps = Pick<FilterChipsProps, "label" | "options" | "value" | "onChange"> & {
  query: string;
  onQuery: (query: string) => void;
};
