import type { SelectOption } from "@/components/ui/Select";
import type { ServiceValues } from "@/components/sections/ServiceModal/ServiceModal.types";
import type { ServiceRow } from "@/lib/admin/admin.types";
import type { FormModalSaveResult } from "@/lib/shared/useFormModal.types";
import type { ServerAction } from "@/lib/shared/useActionToast.types";

export type ServiceRulesChange = {
  online?: boolean;
  amount?: number;
};

export type ServiceActions = {
  saveRules?: ServerAction<[branchId: string, idBranchService: string, change: ServiceRulesChange], void>;
  createService?: (values: ServiceValues) => Promise<FormModalSaveResult<ServiceValues>>;
};

export type AdminServicesProps = {
  rows?: ServiceRow[];
  loadError?: string;
  categories?: SelectOption[];
  vetNames?: string[];
  actions?: ServiceActions;
};

export type ServiceTab = "public" | "rules" | "vets";

export type ServiceNameCellProps = Pick<ServiceRowViewProps, "service" | "onSelect">;

export type ServiceRowViewProps = {
  service: ServiceRow;
  selected: boolean;
  onSelect: (id: string) => void;
};

export type ServicesTableProps = {
  rows: ServiceRow[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export type DraftFieldsProps = Pick<ServiceDraftState, "draft" | "setField" | "priceError">;

export type ServicePanelProps = {
  service: ServiceRow;
  saveRules?: ServiceActions["saveRules"];
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
  pending?: boolean;
  priceError?: string;
};

export type ServiceTabsProps = {
  tab: ServiceTab;
  onChange: (tab: ServiceTab) => void;
};

export type BookingRulesPanelProps = ServicePanelProps;

export type SpeciesChipsProps = Pick<ServiceDraftState, "toggleSpecies"> & {
  selected: string[];
};

export type RulesActionsProps = Pick<ServiceDraftState, "discard" | "publish" | "pending">;

export type PublicPanelProps = Pick<ServicePanelProps, "service">;

export type VetsPanelProps = Pick<ServicePanelProps, "service">;

export type ServicesContentProps = {
  rows: ServiceRow[];
  loadError?: string;
  saveRules?: ServiceActions["saveRules"];
};
