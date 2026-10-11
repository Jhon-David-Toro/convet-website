import type { ServiceFact, ServiceItem, ServiceStep, ServiceTable as ServiceTableData } from "@/lib/catalog/services.types";

export type ServiceDetailProps = {
  service: ServiceItem;
};

export type ServiceIntroProps = {
  service: ServiceItem;
};

export type ServiceMainProps = {
  service: ServiceItem;
};

export type ServiceStepItemProps = {
  position: number;
  step: ServiceStep;
};

export type ServiceStepsProps = {
  steps: ServiceStep[];
};

export type ServiceTableProps = {
  table: ServiceTableData;
};

export type ServiceTableHeadProps = {
  columns: string[];
};

export type ServiceTableRowProps = {
  row: string[];
};

export type ServiceFactsProps = {
  facts: ServiceFact[];
};

export type BookingPanelProps = {
  service: ServiceItem;
};

export type RelatedServicesProps = {
  services: ServiceItem[];
};

export type ServiceMobileBarProps = {
  service: ServiceItem;
};
