import type { ServiceRow } from "@/lib/admin.types";

export type ServiceTab = "public" | "rules" | "vets";

export type ServiceNameCellProps = Pick<ServiceRowViewProps, "service" | "onSelect">;

export type ServiceRowViewProps = {
  service: ServiceRow;
  selected: boolean;
  onSelect: (id: string) => void;
};

export type ServicesTableProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export type DraftFieldsProps = Pick<ServiceDraftState, "draft" | "setField">;

export type ServicePanelProps = {
  service: ServiceRow;
};

export type ServiceDraft = {
  duration: string;
  buffer: string;
  online: boolean;
  species: string[];
  price: string;
};

export type ServiceDraftState = {
  draft: ServiceDraft;
  setField: <Field extends keyof ServiceDraft>(field: Field, value: ServiceDraft[Field]) => void;
  toggleSpecies: (species: string) => void;
  discard: () => void;
  publish: () => void;
};

export type ServiceTabsProps = {
  tab: ServiceTab;
  onChange: (tab: ServiceTab) => void;
};

export type BookingRulesPanelProps = Pick<ServicePanelProps, "service">;

export type SpeciesChipsProps = Pick<ServiceDraftState, "toggleSpecies"> & {
  selected: string[];
};

export type RulesActionsProps = Pick<ServiceDraftState, "discard" | "publish">;

export type PublicPanelProps = Pick<ServicePanelProps, "service">;

export type VetsPanelProps = Pick<ServicePanelProps, "service">;
