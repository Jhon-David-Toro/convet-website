import type { ServiceFilter, ServiceItem } from "@/lib/services.types";

export type ServiceRowProps = {
  service: ServiceItem;
};

export type ServiceHighlightsProps = {
  highlights: string[];
};

export type ServiceFilterValue = ServiceFilter["value"];

export type ServiceCounts = Record<ServiceFilterValue, number>;

export type ServiceFiltersProps = {
  filter: ServiceFilterValue;
  counts: ServiceCounts;
  onChange: (filter: ServiceFilterValue) => void;
};

export type UseServiceFilterParams = {
  services: ServiceItem[];
};

export type ServiceFilterState = {
  filter: ServiceFilterValue;
  setFilter: (filter: ServiceFilterValue) => void;
  visible: ServiceItem[];
  counts: ServiceCounts;
};

